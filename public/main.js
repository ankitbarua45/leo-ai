document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("error-message");
  const mainContent = document.querySelector(".container");
  const loginContainer = document.querySelector(".login-container");
  const logoutButton = document.querySelector(".logout-button");

  function checkLogin() {
    if (sessionStorage.getItem("loggedIn") === "true") {
      loginContainer.style.display = "none";
      mainContent.style.display = "block";
      logoutButton.style.display = "block";
    } else {
      loginContainer.style.display = "flex";
      mainContent.style.display = "none";
      logoutButton.style.display = "none";
    }
  }

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "admin" && password === "@123") {
      sessionStorage.setItem("loggedIn", "true");
      errorMessage.textContent = "";
      checkLogin();
    } else {
      errorMessage.textContent = "Invalid username or password. Please try again.";
    }
  });

  function logout() {
    sessionStorage.removeItem("loggedIn");
    checkLogin();
  }

  checkLogin();

  let controller = null;
  let requestId = null;

  async function askQuestion() {
    const question = document.getElementById("question").value.trim();
    const answerDiv = document.getElementById("answer");
    const loader = document.querySelector(".loader");

    if (!question) {
      answerDiv.innerText = "Please ask a question.";
      return;
    }

    answerDiv.innerText = "";
    loader.style.display = "block";

    controller = new AbortController();
    const signal = controller.signal;
    requestId = Date.now();

    try {
      const res = await fetch("/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, requestId }),
        signal
      });

      const data = await res.json().catch(() => null);

      let answer = "Sorry, I couldn't find anything.";
      if (res.ok && data) {
        if (data.answer && data.answer.trim() !== "") {
          answer = data.answer;
        } else {
          answer = "⚠️ This question is restricted and cannot be answered.";
        }
      }

      answerDiv.innerText = answer;
      speak(answer);

    } catch (err) {
      if (err.name === "AbortError") {
        answerDiv.innerText = "Request was aborted.";
      } else {
        answerDiv.innerText = "Oops! Something went wrong.";
      }
      console.error(err);
    } finally {
      loader.style.display = "none";
    }
  }

  function stopRequest() {
    const answerDiv = document.getElementById("answer");
    const loader = document.querySelector(".loader");

    if (controller) {
      controller.abort();
      controller = null;
      answerDiv.innerText = "Request stopped.";
      loader.style.display = "none";

      fetch("/stop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId })
      }).catch(err => console.error("Error stopping request:", err));
    } else {
      answerDiv.innerText = "No active request to stop.";
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  }

  function getSelectedLanguage() {
    const langSelect = document.getElementById("languageSelect");
    return langSelect ? langSelect.value : "en-US";
  }

  function speak(text) {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getSelectedLanguage();
    utterance.rate = 1;
    utterance.pitch = 1.1;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      utterance.voice = voices.find(v =>
        v.lang === getSelectedLanguage()
      ) || voices[0];
    }

    window.speechSynthesis.speak(utterance);
  }

  window.speechSynthesis.onvoiceschanged = () => {
    console.log("Voices loaded:", window.speechSynthesis.getVoices());
  };

  // --- Hotword Detection & Voice Command Recognition ---
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition, commandRec;
  let isRecognizing = false;
  let hotwordTimeout = null;

  // Function to get audio stream with noise/echo/AGC disabled
  async function getCleanAudioStream() {
    try {
      return await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });
    } catch (err) {
      console.error("Failed to get audio with disabled processing:", err);
      // fallback without constraints if error occurs
      return navigator.mediaDevices.getUserMedia({ audio: true });
    }
  }

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;

    commandRec = new SpeechRecognition();
    commandRec.continuous = false;
    commandRec.interimResults = false;

    function updateRecognitionLang() {
      recognition.lang = getSelectedLanguage();
      commandRec.lang = getSelectedLanguage();
    }

    recognition.onresult = function (event) {
      const transcript = event.results[event.results.length - 1][0].transcript;
      const normalized = transcript.replace(/[^\w\s]/gi, "").toLowerCase();
      console.log("Heard:", normalized);

      const wakeWords = ["leo", "hey leo", "okay leo", "hello leo", "ok leo", "लियो", "lo", "loe","rio","ankit"];
      if (wakeWords.some(word => normalized.includes(word)) && !hotwordTimeout) {
        console.log("Hotword detected.");
        recognition.stop();

        const listeningMsg = getSelectedLanguage() === "hi-IN"
          ? "हां अंकित"
          : "Yes Ankit";
        speak(listeningMsg);
        startCommandRecognition();

        hotwordTimeout = setTimeout(() => {
          hotwordTimeout = null;
        }, 5000); // Increased timeout
      }
    };

    recognition.onerror = function (event) {
      console.error("Recognition error:", event.error);
      recognition.stop();
      setTimeout(() => safeStartRecognition(), 1500);
    };

    recognition.onend = function () {
      if (!isRecognizing) {
        console.log("Recognition ended, restarting...");
        setTimeout(() => safeStartRecognition(), 1000);
      }
    };

    commandRec.onresult = function (event) {
      const command = event.results[0][0].transcript.trim();
      console.log("User Command:", command);
      document.getElementById("question").value = command;

      const msg = getSelectedLanguage() === "hi-IN" ? "मैं चेक कर रहा हूँ..." : "Let me check...";
      speak(msg);

      if (sessionStorage.getItem("loggedIn") === "true") {
        askQuestion();
      } else {
        speak(getSelectedLanguage() === "hi-IN"
          ? "कृपया पहले लॉग इन करें।"
          : "Please log in first.");
      }
    };

    commandRec.onstart = () => {
      isRecognizing = true;
    };

    commandRec.onend = () => {
      console.log("Voice command finished.");
      isRecognizing = false;
      setTimeout(() => {
        if (!isRecognizing) safeStartRecognition();
      }, 500);
    };

    commandRec.onerror = (e) => {
      console.error("Command recognition error:", e.error);
      isRecognizing = false;
      setTimeout(() => {
        if (!isRecognizing) safeStartRecognition();
      }, 500);
    };

    function safeStartRecognition() {
      updateRecognitionLang();
      try {
        if (!isRecognizing) {
          recognition.start();
        }
      } catch (e) {
        if (e.name !== "InvalidStateError") {
          console.warn("Recognition start error:", e.message);
        }
      }
    }

    function startCommandRecognition() {
      updateRecognitionLang();
      try {
        commandRec.start();
      } catch (e) {
        console.warn("Command recognition already running.");
      }
    }

    safeStartRecognition();

    // Fallback auto-restart
    setInterval(() => {
      if (!isRecognizing && recognition && recognition.state !== "started") {
        safeStartRecognition();
      }
    }, 10000);
  }

  window.askQuestion = askQuestion;
  window.stopRequest = stopRequest;
  window.logout = logout;
});
