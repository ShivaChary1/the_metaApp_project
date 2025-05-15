// utils/socket.js
import { io } from "socket.io-client";

let socket;

export const connectSocket = () => {
  if (socket && socket.connected) {
    console.warn("⚠️ Socket is already connected.");
    return;
  }

  try {
    socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:5000", {
      auth: {
        token: localStorage.getItem("token"),
      },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      timeout: 5000, 
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.warn("⚠️ Socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Connection error:", err.message);
      if (err.data) {
        console.error("🔍 Error data:", err.data);
      }
    });

    socket.on("connect_timeout", () => {
      console.error("⏳ Connection timed out");
    });

    socket.on("reconnect_attempt", (attempt) => {
      console.log(`🔁 Reconnect attempt #${attempt}`);
    });

    socket.on("reconnect_failed", () => {
      console.error("❗ Reconnection failed after maximum attempts");
    });
  } catch (error) {
    console.error("💥 Unexpected error while connecting socket:", error);
  }


  
  if(localStorage.getItem("token")){
    socket.connect();
  }

};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("🔌 Socket manually disconnected.");
  }
};

export const getSocket = () => socket;


export const isSocketConnected = () => socket && socket.connected;

// // utils/socket.js
// import { io } from "socket.io-client";

// let socket;

// export const connectSocket = () => {
//   socket = io(import.meta.env.VITE_BACKEND_URL, {
//     auth: {
//     token: localStorage.getItem("token"),
//     }
//   });

//   socket.on("connect", () => {
//     console.log("🔌 Connected socket:", socket.id);
//   });

//   socket.on("disconnect", () => {
//     console.log("🔌 Disconnected socket");
//   });
// };

// export const disconnectSocket = () => {
//   if (socket) {
//     socket.disconnect();
//     socket = null;
//   }
// };

// export const getSocket = () => socket;
