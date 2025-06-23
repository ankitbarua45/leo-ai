
# 🤖Leo AI Assistant

**Leo AI** is a fully voice-controlled virtual assistant built using **HTML, CSS, and JavaScript**, designed for browsers and future desktop integration. It supports real-time speech recognition, web search, voice responses, and various utility functions.

---

## 🚀 Features

- 🎙️ Voice recognition  
- 🔊 Hotword detection  
- 🗣️ Speech synthesis responses  
- 🌐 Google/Wikipedia fallback
- more work 

---

## 📁 Project Structure

```
leo-ai/
├── logs/                   # Log files (optional)
├── node_modules/           # Installed npm packages
├── public/                 # Frontend files
│   ├── index.html          # Main UI layout
│   ├── main.js             # Frontend logic (e.g. login, assistant)
│   ├── style.css           # Styling
│   └── voice1.mp4          # Media asset
├── .env                    # API keys and environment variables
├── demo.exe                # Compiled desktop app (optional)
├── package.json            # Project config and dependencies
├── package-lock.json       # Dependency lock file
└── server.js               # Node.js backend for system-level access


````

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Voice API:** Web Speech API  
- **Backend:** Node.js for system-level functionality  
- **External APIs:** Google Search, Wikipedia, Gemini (for AI responses)  

---

## 📸 Screenshots

![Screenshot (150)](https://github.com/user-attachments/assets/e29151ec-61ed-4ea4-a5af-5bb4542b51be)

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


npm install


#### 🔐 2. Create a `.env` File

In the root directory, create a file named `.env` and add your API keys. Example:


GEMINI_API_KEY=your-gemini-api-key-here


> You can include other keys like OpenAI, Google, or Firebase if you're using those services.

#### 🚀 3. Start the Server


node server.js


![Screenshot (150)](https://github.com/user-attachments/assets/08753b9a-4413-4f96-ade8-3486d996896f)

