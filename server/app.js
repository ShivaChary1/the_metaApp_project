// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const userRoutes = require('./routes/userRoutes');
// const spaceRoutes = require('./routes/spaceRoutes');
// const cors = require('cors');
// const { Server } = require('socket.io');
// const http = require('http');
// const VirtualSpace = require('./models/VirtualSpace');
// const ActiveUser = require('./models/ActiveUser');
// const jwt = require('jsonwebtoken');
// const chatRoutes = require('./routes/chatRoutes');

// dotenv.config();
// connectDB();

// const app = express();
// const server = http.createServer(app);

// // Socket.IO setup with JWT auth
// const io = new Server(server, {
//   cors: {
//     origin: function (origin, callback) {
//       const allowedOrigins = [
//         'http://localhost:5173',
//         'http://127.0.0.1:5173',
//         'http://192.168.1.6:5173',
//         'http://192.168.1.5:5173',
//       ];
//       if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://192.168.')) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//     methods: ['GET', 'POST'],
//   }
// });

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//   origin: function (origin, callback) {
//     const allowedOrigins = [
//       'http://localhost:5173',
//       'http://127.0.0.1:5173',
//       'http://192.168.1.108:5173',
//       'http://192.168.1.5:5173',
//     ];
//     if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://192.168.')) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// }));

// // Socket.IO JWT authentication
// io.use((socket, next) => {
//   const token = socket.handshake.auth.token;
//   console.log('Socket token:', token);
//   if (!token) return next(new Error("Authentication error"));

//   try {
//     const user = jwt.verify(token, process.env.JWT_SECRET || 'thetopsecret');
//     socket.user = user; 
//     // console.log('Authenticated user:', socket.user);
//     next();
//   } catch (err) {
//     console.log('JWT verification error:', err);
//     next(new Error("Invalid token"));
//   }
// });

// io.on("connect", (socket) => {
//   console.log('A user connected:', socket.id, 'User:', socket.user?._id || 'Unknown');

//   socket.on("enteredSpace", ({ spaceId }) => {
//     socket.join(spaceId);
//     console.log(`User ${socket.id} joined space ${spaceId}`);
//   });

//   socket.on("positionUpdate", (newPos) => {
//     console.log(`User ${socket.id} updated position to ${newPos.x}, ${newPos.y} in space ${newPos.spaceId}`);
    
//     socket.emit("returnPosition", newPos);
//   });

//   socket.on("leaveSpace", ({ spaceId }) => {
//     socket.leave(spaceId);
//     console.log(`User ${socket.id} left space ${spaceId}`);

//     socket.emit("leftSpace", spaceId);
//   });

//   socket.on("message-sent", ({ message, spaceId, userId, fullName }) => {
//   // console.log(`Message sent in space ${spaceId}:`, message);
//   socket.to(spaceId).emit("message-received", {
//     message,
//     userId,
//     fullName,
//   });
// });

//   socket.on("disconnect", () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// // Routes
// app.use('/users', userRoutes);
// app.use('/spaces',spaceRoutes);
// app.use('/chats',chatRoutes)

// app.get('/', (req, res) => res.send('Hello World!'));

// // Server start
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // Export if needed elsewhere
// module.exports = { app, io };



const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const spaceRoutes = require('./routes/spaceRoutes');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const VirtualSpace = require('./models/VirtualSpace');
const ActiveUser = require('./models/ActiveUser');
const User = require('./models/User');
const Chat = require('./models/Chat'); // Add Chat model
const jwt = require('jsonwebtoken');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      const allowedOrigins = [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://192.168.1.6:5173',
        'http://192.168.1.5:5173',
      ];
      if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://192.168.')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST'],
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://192.168.1.108:5173',
      'http://192.168.1.5:5173',
    ];
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://192.168.')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  console.log('Socket token:', token);
  if (!token) return next(new Error("Authentication error"));

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || 'thetopsecret');
    socket.user = user;
    next();
  } catch (err) {
    console.log('JWT verification error:', err);
    next(new Error("Invalid token"));
  }
});

io.on("connect", (socket) => {
  console.log('A user connected:', socket.id, 'User:', socket.user?._id || 'Unknown');

  socket.on("enteredSpace", ({ spaceId }) => {
    socket.join(spaceId);
    console.log(`User ${socket.user?._id || socket.id} joined space ${spaceId}`);
  });

  socket.on("positionUpdate", (newPos) => {
    console.log(`User ${socket.id} updated position to ${newPos.x}, ${newPos.y} in space ${newPos.spaceId}`);
    socket.emit("returnPosition", newPos);
  });

  socket.on("leaveSpace", ({ spaceId }) => {
    socket.leave(spaceId);
    console.log(`User ${socket.id} left space ${spaceId}`);
    socket.emit("leftSpace", spaceId);
  });

  socket.on("message-sent", async ({ message, spaceId, userId, fullName }) => {
    try {
      const user = await User.findById(userId).select('fullName');
      const userFullName = user ? user.fullName : fullName || 'Unknown User';
      
      // Save message to database
      let chat = await Chat.findOne({ spaceId });
      if (!chat) {
        chat = new Chat({ spaceId, chats: [] });
      }
      chat.chats.push({
        message,
        user: { _id: userId, fullName: userFullName }
      });
      await chat.save();
      
      io.to(spaceId).emit("message-received", {
        message,
        userId,
        fullName: userFullName,
      });
    } catch (err) {
      console.error('Error processing message:', err);
      io.to(spaceId).emit("message-received", {
        message,
        userId,
        fullName: fullName || 'Unknown User',
      });
    }
  });

  socket.on("disconnect", () => {
    console.log('User disconnected:', socket.id);
  });
});

app.use('/users', userRoutes);
app.use('/spaces', spaceRoutes);
app.use('/chats', chatRoutes);

app.get('/', (req, res) => res.send('Hello World!'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, io };