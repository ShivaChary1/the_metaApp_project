// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcrypt');

// router.get('/',(req,res)=>{
//     res.send('this is all users');
// })

// router.post('/register',async (req,res)=>{
//     try{
//         const {
//             fullName,
//             email,
//             password
//           } = req.body;
    
//         if(!fullName || !email || !password) {
//             return res.status(400).json({ message: 'Please fill all fields' });
//         }
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//           return res.status(409).json({ message: 'Email already in use' });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = await User({
//             fullName,
//             email,
//             password: hashedPassword,
//         });
//         await newUser.save();
//         res.status(201).json({ message: 'User created successfully' });

//     }catch(err){
//         console.error('Registration error:', err);
//         res.status(500).json({ message: 'Server error during registration' });
//     }
// });


// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: 'Please fill all fields' });
//         }

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // Store user ID in session
//         req.session.userId = user._id;

//         res.status(200).json({ message: 'Login successful', userId: user._id, name: user.fullName, email: user.email });

//     } catch (err) {
//         console.error('Login error:', err);
//         res.status(500).json({ message: 'Server error during login' });
//     }
// });

// router.get('/logout', (req, res) => {
//     req.session.destroy(async (err) => {
//         if (err) {
//           console.error("Error destroying session:", err);
//           return res.status(500).send("Logout failed");
//         }
      
//         // Remove session document from MongoDB manually
//         const sessionId = req.sessionID;
//         const db = req.sessionStore.client.db(); // use your connection instance
//         await db.collection('sessions').deleteOne({ _id: sessionId });
      
//         res.clearCookie('connect.sid');
//         res.send("Logged out and session removed");
//       });
      
// });




// module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { mongoStore } = require('../app'); 

// Test route
router.get('/', (req, res) => {
  res.send('this is all users');
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully',userId:newUser._id, email:newUser.email,name:newUser.fullName});
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    req.session.userId = user._id;
    console.log(req.session);  

    res.status(200).json({
      message: 'Login successful',
      userId: user._id,
      name: user.fullName,
      email: user.email
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Logout route with session removal
router.get('/logout', (req, res) => {

  req.session.destroy(async (err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Logout failed");
    }
  });

  res.send("Logged out and session removed");
});

router.put('/update', async (req, res) => {
  try {
    const { userId, fullName, password } = req.body;
    // Validate inputs
    if (!fullName) {
      return res.status(400).json({ message: 'Full name is required' });
    }

    // Prepare update data
    const updateData = { fullName };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!user) {
      console.log('Update attempt: User not found', { userId });
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User updated:', { userId, fullName });
    res.status(200).json({ message: 'User updated successfully', user: { _id: user._id, name: user.fullName, email: user.email } });
  } catch (err) {
    console.error('Update error:', err.message);
    res.status(500).json({ message: 'Server error during update' });
  }
});

module.exports = router;
