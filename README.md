# AI Doctor Chat

**AI Doctor Chat** is a cross-platform mobile app built with Expo, where users can chat with *Dr. Jenny*, an empathetic virtual doctor powered by Google Gemini. The app features a clean white-and-teal theme, smooth animations, custom chat bubbles, and sound effects for an engaging, human-like experience.

---

## ✨ Features

* Splash screen with gradient background, profile image, and intro animation
* Home screen with safe area support (works with iPhone notch / dynamic island)
* Custom chat interface with **spiky bubbles** (teal for user, white for doctor)
* Smooth animations powered by [Moti](https://moti.fyi)
* Sound effect when receiving a message from the doctor
* Integration with **Google Gemini API** for intelligent doctor-like responses

---

## 📦 Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/ai-doctor-chat.git
   cd ai-doctor-chat
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install Expo dependencies:

   ```bash
   npx expo install expo-linear-gradient moti react-native-safe-area-context expo-av
   ```

4. Add your Gemini API key in `HomeScreen.js`:

   ```javascript
   const API_KEY = "YOUR_GEMINI_API_KEY";
   ```

---

## 🚀 Running the App

Start the Expo development server:

```bash
npx expo start
```

* Press **i** to run on iOS simulator
* Press **a** to run on Android emulator
* Scan the QR code with **Expo Go** to run on your device

---

## 📂 Project Structure

```
assets/          # images, sound effects
pages/
  SplashScreen.js
  HomeScreen.js
App.js           # navigation setup
```

---

## 🖌️ Theme

* Background: **white**
* Accent: **teal (#008080)**
* User messages: teal bubbles
* Doctor messages: white bubbles

---

## 🔑 API

This project uses the [Google Gemini API](https://ai.google.dev/) to generate conversational responses.

Example request:

```
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" \
  -H 'Content-Type: application/json' \
  -H 'X-goog-api-key: GEMINI_API_KEY' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          { "text": "Explain how AI works in a few words" }
        ]
      }
    ]
  }'
```

---

## 📜 License

MIT License © 2025

