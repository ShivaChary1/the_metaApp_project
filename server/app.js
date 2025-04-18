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
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

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
app.use('/users', userRoutes);

// Basic route
app.get('/', (req, res) => res.send('Hello World!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app and mongoStore so routes can use them
module.exports = { app, mongoStore };
