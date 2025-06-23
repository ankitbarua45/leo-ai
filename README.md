# 🤖 Leo AI Assistant

**Leo AI** is a fully voice-controlled virtual assistant built using **HTML, CSS, and JavaScript**, designed for browsers and future desktop integration. It features real-time speech recognition, hotword detection, voice responses, multi-language support, and leverages Google Gemini (Gemini API) for AI-powered answers.

---

## 🚀 Features

- 🎙️ Voice recognition (Web Speech API)
- 🔊 Hotword detection (wake Leo by saying "Leo", "Hey Leo", etc.)
- 🗣️ Speech synthesis (AI reads answers aloud)
- 🌐 Google/Wikipedia fallback (via backend or frontend, extendable)
- 🔒 Simple login system
- 🏳️ Multi-language support (English & Hindi)
- ✨ Modern, responsive UI
- 📺 Animated avatar (video)
- 🧠 AI responses powered by Google Gemini API
- 🖥️ Ready for browser and desktop integration (via Electron, demo.exe provided)
- 👨‍💻 Easily extensible for system-level controls

---

## 📁 Project Structure

```
leo-ai/
├── logs/                   # Log files (optional)
├── node_modules/           # Installed npm packages
├── public/                 # Frontend files
│   ├── index.html          # Main UI layout
│   ├── main.js             # Frontend logic (login, voice, UI)
│   ├── style.css           # Styling
│   └── voice1.mp4          # Media asset (avatar animation)
├── .env                    # API keys and environment variables
├── demo.exe                # Compiled desktop app (optional)
├── package.json            # Project config and dependencies
├── package-lock.json       # Dependency lock file
└── server.js               # Node.js backend (AI, API, system access)
```

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Voice API:** Web Speech API (speech recognition & synthesis)
- **Backend:** Node.js (Express)
- **AI:** Google Gemini API (`@google/generative-ai`)
- **External APIs:** Google Search, Wikipedia (can be extended)
- **Desktop:** Electron (optional, see `demo.exe`)

---

## 📸 Screenshots

![Screenshot Example](https://github.com/user-attachments/assets/e29151ec-61ed-4ea4-a5af-5bb4542b51be)

---

## ⚡ Getting Started

### ✅ Without Backend (Frontend-only)

1. Clone the repo:

   ```bash
   git clone https://github.com/ankitbarua45/leo-ai.git
   cd leo-ai
   ```

2. Open `public/index.html` in your browser to start the assistant.

> Note: Without the backend, AI answers and some features may be disabled.

---

### ✅ With Node.js Backend (Recommended)

To enable AI answers, system-level control, and API integration, follow these steps:

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Create a `.env` File

In the root directory, add your Gemini API key (and others if needed):

```
GEMINI_API_KEY=your-gemini-api-key-here
```

#### 3. Start the Server

```bash
node server.js
```

4. Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

### 🗝️ Default Login

- **Username:** `admin`
- **Password:** `@123`

---

## 🧩 Extending & Customizing

- Add more wake words or languages in `public/main.js`.
- Integrate more APIs in `server.js`.
- Customize the avatar by replacing `voice1.mp4`.
- For desktop integration, wrap the app using [Electron](https://www.electronjs.org/).

---

## 🤝 Credits

Developed by [Ankit Barua](https://github.com/ankitbarua45).  
Powered by Google Gemini, Web Speech API, and open web technologies.

---

## 📄 License

MIT License.  
Copyright © 2024 Ankit Barua

---
