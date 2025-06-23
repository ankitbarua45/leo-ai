
# 🤖 Leo AI Assistant

**Leo AI** is a fully voice-controlled virtual assistant built using **HTML, CSS, and JavaScript**, designed for browsers and future desktop integration. It supports real-time speech recognition, web search, voice responses, and various utility functions.

---

## 🚀 Features

- 🎙️ Voice recognition  
- 🔊 Hotword detection  
- 🗣️ Speech synthesis responses  
- 🌐 Google/Wikipedia fallback  

---

## 📁 Project Structure

```

leo-ai/
├── index.html      # Main user interface
├── style.css       # Page styling
├── app.js          # Voice assistant logic
├── server.js       # (Optional) Node.js backend for system-level access
├── .env            # API keys and environment variables
└── README.md       # Project documentation

````

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Voice API:** Web Speech API  
- **Backend (Optional):** Node.js for system-level functionality  
- **External APIs:** Google Search, Wikipedia, Gemini (for AI responses)  

---

## 🧑‍💻 How to Run

### ✅ Without Backend

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/leo-ai.git
   cd leo-ai
````

2. Open `index.html` in your browser to start the assistant.

---

### ✅ With Node.js Backend

To enable system-level control, internet search, and API integration (like Gemini), follow these steps:

#### 🔧 1. Install Dependencies

```bash
npm install
```

#### 🔐 2. Create a `.env` File

In the root directory, create a file named `.env` and add your API keys. Example:

```env
GEMINI_API_KEY=your-gemini-api-key-here
```

> You can include other keys like OpenAI, Google, or Firebase if you're using those services.

#### 🚀 3. Start the Server

```bash
node server.js
```


