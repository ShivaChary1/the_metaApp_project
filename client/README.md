# Client - React + Vite

This directory contains the frontend client for the Metaverse App, built with [React](https://react.dev/) and [Vite](https://vitejs.dev/). It provides a real-time, interactive virtual office experience where users can connect, move avatars, and communicate via text, voice, and video.

---

## Features

- ⚡ Fast development with Vite
- ⚛️ Modern React (v19) with hooks
- 💬 Real-time communication using Socket.IO
- 🎥 Video & voice chat via ZEGOCLOUD and WebRTC
- 🎨 Responsive UI, animated with Framer Motion and GSAP
- 🌊 Styled with TailwindCSS
- 📈 Integrated Echarts for rich data visualization
- 🔒 JWT authentication & security enhancements (dompurify)

---

## Project Structure

```
client/
  ├── public/         # Static assets
  ├── src/            # Source code
  ├── index.html      # Main HTML file
  ├── package.json    # Project configuration and dependencies
  ├── vite.config.js  # Vite configuration
  ├── eslint.config.js# ESLint configuration
```

---

## Scripts

- `dev` - Start development server with hot module reload
- `build` - Build for production
- `preview` - Preview the production build locally
- `lint` - Run ESLint

---

## Main Dependencies

- **React** (v19), **React DOM**
- **Vite** for fast dev/build
- **TailwindCSS** for styling
- **Socket.IO client** for real-time communication
- **ZEGOCLOUD** for video/audio
- **Framer Motion**, **GSAP** for animation
- **Echarts** for charts/visualization
- **JWT Decode**, **dompurify** for authentication and security
- **React Router DOM** for routing

See [`package.json`](./package.json) for the full list.

---

## Customization & Extension

- Modify UI or add features within `src/`
- Tailwind config allows rapid styling changes
- Easily swap or extend video/audio provider via abstraction in the relevant service

---

## License

This project is licensed under the [MIT License](../LICENSE).

---

## Support

For issues, please open [an issue in the main repo](https://github.com/ShivaChary1/the_metaApp_project/issues).

---
