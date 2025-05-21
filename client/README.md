# 🖥️ Client — React + Vite

The **frontend** of the Metaverse App is a high-performance single-page application built with [React 19](https://react.dev/) and [Vite](https://vitejs.dev/).  
It renders a 2D, office-style metaverse where users can move avatars in real-time and communicate via text, voice, and video.

---

## ✨ Key Features

- ⚡ **Lightning-fast builds** with Vite
- ⚛️ Modern **React 19** with hooks and Suspense
- 💬 Real-time communication via **Socket.IO**
- 🎥 Voice and video chat using **ZEGOCLOUD** + **WebRTC**
- 🎨 Fluid UI powered by **TailwindCSS**, **Framer Motion**, and **GSAP**
- 📊 Integrated **ECharts** for live visualizations
- 🔐 Secure with **JWT authentication** and **DOMPurify** for sanitization
- 🧹 Code quality via **ESLint** + **Prettier**

---

## 🗂 Project Structure

client/
├── public/ # Static assets
├── src/ # Source code
│ ├── api/ # API and service integrations
│ ├── assets/ # Images, icons, media
│ ├── components/ # Reusable UI components
│ ├── hooks/ # Custom React hooks
│ ├── pages/ # Page-level components
│ ├── router/ # React Router configuration
│ ├── store/ # State management (e.g., Zustand)
│ ├── styles/ # Global and Tailwind styles
│ └── utils/ # Helper functions and utilities
├── index.html # Main HTML file
├── vite.config.js # Vite configuration
├── tailwind.config.cjs# Tailwind CSS configuration
├── eslint.config.js # ESLint rules
└── package.json # Project dependencies and scripts

yaml
Copy
Edit

---

## ⚙️ Available Scripts

| Command        | Description                                 |
|----------------|---------------------------------------------|
| `npm dev`     | Starts the local development server         |
| `npm build`   | Builds the app for production               |
| `npm preview` | Previews the production build locally       |
| `npm lint`    | Runs ESLint to check code style and errors |

---

## 📦 Main Dependencies

| Package               | Role                                  |
|------------------------|---------------------------------------|
| `react`, `react-dom`   | UI rendering                         |
| `vite`                 | Fast dev/build tool                  |
| `tailwindcss`          | Utility-first CSS framework          |
| `socket.io-client`     | Real-time WebSocket communication    |
| `zego-uikit-prebuilt`  | Video/audio conferencing             |
| `framer-motion`        | Declarative animations               |
| `gsap`                 | Advanced animation control           |
| `echarts`              | Interactive charting library         |
| `jwt-decode`           | Decodes JWT tokens                   |
| `dompurify`            | Prevents XSS in input fields         |
| `react-router-dom`     | SPA routing                          |

_For a full list, check the [`package.json`](./package.json)._

---

## 🛠️ Customization

- **Styling:** Tweak or extend `tailwind.config.cjs` to customize theme or spacing
- **Video/Audio:** Replace ZEGOCLOUD by abstracting your own service in `src/api/videoService.js`
- **Animations:** Use `GSAP` for timeline animations or `Framer Motion` for simpler transitions
- **State Management:** Modify or replace Zustand logic inside `src/store/`

---

## 📄 License

This project is licensed under the [MIT License](../LICENSE).

---

## 🙋 Support

- Issues and feedback: [GitHub Issues](https://github.com/ShivaChary1/the_metaApp_project/issues)
- Author: [ShivaChary1](https://github.com/ShivaChary1)

---

> If you found this project helpful, please ⭐ the repo!
