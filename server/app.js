// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const userRoutes = require('./routes/userRoutes');
// const cors = require('cors');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');

// dotenv.config(); // Load environment variables first

// connectDB(); // Connect to MongoDB

// const app = express();
// app.use(express.json()); // To parse JSON requests
// app.use(cors()); // Enable CORS for all routes
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'themetaappsession',
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
//     httpOnly: true
//   }
// }));

// // Routes
// app.use('/users', userRoutes);

// // Basic route
// app.get('/', (req, res) => res.send('Hello World!'));


// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const userRoutes = require('./routes/userRoutes');
// const spaceRoutes = require('./routes/spaceRoutes');
// const cors = require('cors');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');

// dotenv.config();
// connectDB();

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests from localhost and local network IPs
//     const allowedOrigins = [
//       'http://localhost:5173',
//       'http://127.0.0.1:5173',
//       'http://192.168.1.100:5173', // replace with your machine's local IP
//     ];

//     // Allow all local network origins (optional, dev only)
//     if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://192.168.')) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// }));

// // Create MongoStore and export it
// const mongoStore = MongoStore.create({
//   mongoUrl: process.env.MONGO_URI,
//   collectionName: 'sessions'
// });

// app.use(session({
//   secret: process.env.SESSION_SECRET || 'themetaappsession',
//   resave: false,
//   saveUninitialized: false,
//   store: mongoStore,
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
//     httpOnly: true
//   }
// }));

// // Routes
// app.use('/users', userRoutes); //Add user routes
// app.use('/spaces', spaceRoutes); // Add space routes

// // Basic route
// app.get('/', (req, res) => res.send('Hello World!'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // Export the app and mongoStore so routes can use them
// module.exports = { app, mongoStore };




const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const spaceRoutes = require('./routes/spaceRoutes');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { Server } = require('socket.io');
const http = require('http');
const VirtualSpace = require('./models/VirtualSpace');
const mongoose = require('mongoose');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://192.168.1.108:5173',
      'http://192.168.1.100:5173',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://192.168.1.108:5173',
      'http://192.168.1.100:5173',
    ];
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://192.168.')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

const mongoStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: 'sessions',
});

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'themetaappsession',
  resave: false,
  saveUninitialized: false,
  store: mongoStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'lax',
  },
});

app.use(sessionMiddleware);

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, (err) => {
    if (err) {
      console.error('Session middleware error:', err);
      return next(err);
    }
    console.log('Socket session:', socket.request.session);
    if (!socket.request.session.userId) {
      console.error('No userId in session for socket:', socket.id);
      return next(new Error('Unauthorized'));
    }
    next();
  });
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  const userId = socket.request.session.userId;
  console.log('Authenticated user:', userId);

  socket.on('joinSpace', async ({ spaceId, userId: clientUserId }) => {
    if (!spaceId || clientUserId !== userId) {
      console.error('Invalid joinSpace attempt:', { spaceId, clientUserId, userId });
      return;
    }
    try {
      const space = await VirtualSpace.findById(spaceId);
      if (!space) {
        console.error('Space not found:', spaceId);
        return;
      }
      const userExists = space.currentUsers.some(u => u.user.toString() === userId);
      if (!userExists) {
        console.error('User not in space:', { spaceId, userId });
        return;
      }
      socket.join(spaceId);
      console.log(`User ${userId} joined space ${spaceId}`);
      io.in(spaceId).allSockets().then(sockets => {
        console.log(`Sockets in room ${spaceId}:`, Array.from(sockets));
      });
    } catch (err) {
      console.error('Error joining space:', err);
    }
  });

  socket.on('updatePosition', async ({ spaceId, userId: clientUserId, position }) => {
    try {
      console.log('Received updatePosition:', { spaceId, clientUserId, position });

      if (!spaceId || clientUserId !== userId || !position || typeof position.x !== 'number' || typeof position.y !== 'number') {
        console.error('Invalid position update data:', { spaceId, clientUserId, position });
        return;
      }
      if (position.x < 0 || position.y < 0) {
        console.error('Position coordinates must be non-negative:', position);
        return;
      }

      const space = await VirtualSpace.findById(spaceId);
      if (!space) {
        console.error('Space not found:', spaceId);
        return;
      }
      const userEntry = space.currentUsers.find(u => u.user.toString() === userId);
      if (!userEntry) {
        console.error('User not in space:', { spaceId, userId });
        return;
      }
      userEntry.position = position;
      await space.save({ runValidators: true });

      console.log('Database updated:', { spaceId, userId, position });

      socket.to(spaceId).emit('positionUpdated', { userId, position });
      console.log(`Broadcasted position update to space ${spaceId}:`, { userId, position });
    } catch (err) {
      console.error('Error updating position:', err);
      if (err.name === 'ValidationError') {
        console.error('Validation error:', err.message);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

app.set('io', io);

app.use('/users', userRoutes);
app.use('/spaces', spaceRoutes);

app.get('/', (req, res) => res.send('Hello World!'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, mongoStore, io };