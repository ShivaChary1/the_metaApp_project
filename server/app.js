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


const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const spaceRoutes = require('./routes/spaceRoutes');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests from localhost and local network IPs
    const allowedOrigins = [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://192.168.1.100:5173', // replace with your machine's local IP
    ];

    // Allow all local network origins (optional, dev only)
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://192.168.')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Create MongoStore and export it
const mongoStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: 'sessions'
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'themetaappsession',
  resave: false,
  saveUninitialized: false,
  store: mongoStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    httpOnly: true
  }
}));

// Routes
app.use('/users', userRoutes); //Add user routes
app.use('/spaces', spaceRoutes); // Add space routes

// Basic route
app.get('/', (req, res) => res.send('Hello World!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app and mongoStore so routes can use them
module.exports = { app, mongoStore };
