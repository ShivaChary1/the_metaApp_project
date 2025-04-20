const express = require('express');
const router = express.Router();
const VirtualSpace = require('../models/VirtualSpace');
const User = require('../models/User')
const bcrypt = require('bcrypt');
const { formatDistanceToNow } = require('date-fns');


router.post('/create', async (req,res)=>{
    try{
        const {name, maxNoOfPeople, pass, userId} = req.body;
        if(!name || !maxNoOfPeople) {
            return res.status(400).json({ message: 'Name and maximum number of people are required' });
        }

        const hashedPass = pass ? await bcrypt.hash(pass, 10) : null;
        const newSpace = new VirtualSpace({
            name: name.trim(),
            password: hashedPass,
            maxUsers: maxNoOfPeople,
            owner: userId,
            currentUsers: [] // Initially empty
        });

        newSpace.currentUsers.push({
            user: userId,
            position: { x: 0, y: 0 } // You can randomize or customize this
        });

        await newSpace.save();

        await User.findByIdAndUpdate(userId,{
            $push: { createdSpaces: newSpace._id }
        });

        return res.status(201).json({
        message: 'Virtual space created successfully',
        space: {
            id: newSpace._id,
            name: newSpace.name,
            maxUsers: newSpace.maxUsers,
            isProtected: !!newSpace.password
        }
        });
    
    }catch(err){
        console.error('Error creating space:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/join',async(req,res)=>{
    try{
        const {id, pass,userId} = req.body;
        // const userId = req.session.userId;
        if(!id || !userId) {
            return res.status(400).json({ message: 'Space ID and user ID are required' });
        }

        const space = await VirtualSpace.findById(id);
        if(!space) {
            return res.status(404).json({ message: 'Space not found' });
        }

        if(space.password) {
            const isMatch = await bcrypt.compare(pass, space.password);
            if(!isMatch) {
                return res.status(403).json({ message: 'Incorrect password' });
            }
        }

        if(space.currentUsers.length >= space.maxUsers) {
            return res.status(403).json({ message: 'Space is full' });
        }
        const newUserEntry = {
            user: userId,
            position: { x: 0, y: 0 } // You can randomize or customize this
        };

        space.currentUsers.push(newUserEntry);
        await space.save();

        await User.findByIdAndUpdate(userId,{
            $push: { joinedSpaces: space._id }
        });

        return res.status(200).json({
            message: 'Successfully joined the space',
            space: {
                id: space._id,
                name: space.name,
                maxUsers: space.maxUsers,
                currentUsers: space.currentUsers.length
            }
        });
    }catch(err){
        console.error('Error joining space:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

const icons = [
    'fa-solid fa-map',
    'fa-solid fa-location-dot',
    'fa-solid fa-compass',
    'fa-solid fa-globe',
    'fa-solid fa-mountain-sun',
    'fa-solid fa-door-open',
    'fa-solid fa-chair',
    'fa-solid fa-couch',
    'fa-solid fa-table',
    'fa-solid fa-bed',
    'fa-solid fa-building',
    'fa-solid fa-warehouse',
    'fa-solid fa-object-group',
    'fa-solid fa-vector-square',
    'fa-solid fa-cube',
    'fa-solid fa-people-arrows',
    'fa-solid fa-handshake',
    'fa-solid fa-chalkboard',
    'fa-solid fa-diagram-project',
    'fa-solid fa-users'
  ];
const colors = [
'text-white',
'text-gray-400',
'text-blue-400',
'text-cyan-400',
'text-teal-400',
'text-emerald-400',
'text-green-400',
'text-lime-400',
'text-yellow-400',
'text-amber-400',
'text-orange-400',
'text-red-400',
'text-rose-400',
'text-pink-400',
'text-fuchsia-400',
'text-purple-400',
'text-violet-400',
'text-indigo-400',
'text-sky-400',
'text-zinc-400'
];

// const generateAvatars = async (currentUsers) => {
//     const colors = [
//       { bg: 'bg-purple-500', text: 'text-purple-400' },
//       { bg: 'bg-blue-500', text: 'text-blue-400' },
//       { bg: 'bg-green-500', text: 'text-green-400' },
//       { bg: 'bg-red-500', text: 'text-red-400' },
//       { bg: 'bg-yellow-500', text: 'text-yellow-400' },
//       { bg: 'bg-pink-500', text: 'text-pink-400' },
//       { bg: 'bg-cyan-500', text: 'text-cyan-400' },
//       { bg: 'bg-orange-500', text: 'text-orange-400' },
//       { bg: 'bg-indigo-500', text: 'text-indigo-400' },
//     ];
  
//     const avatars = [];
  
//     if (!currentUsers || currentUsers.length === 0) {
//       return avatars; // Still return empty if no users at all
//     }
  
//     const displayCount = currentUsers.length >= 2 ? 2 : 1; // Ensure at least 1 avatar is generated
  
//     for (let i = 0; i < displayCount; i++) {
//       const userId = currentUsers[i].user;
//       try {
//         const user = await User.findById(userId).select('fullName');
//         let initials = '?';
//         if (user && user.fullName) {
//           const nameParts = user.fullName.trim().split(/\s+/);
//           if (nameParts.length >= 2) {
//             initials = nameParts[0][0] + nameParts[1][0];
//           } else {
//             initials = nameParts[0][0];
//           }
//           initials = initials.toUpperCase();
//         }
//         const color = colors[Math.floor(Math.random() * colors.length)];
//         avatars.push({
//           initials,
//           bgColor: color.bg,
//           textColor: color.text,
//         });
//       } catch (err) {
//         console.error('Error fetching user for avatar:', err);
//         const color = colors[Math.floor(Math.random() * colors.length)];
//         avatars.push({
//           initials: '?',
//           bgColor: color.bg,
//           textColor: color.text,
//         });
//       }
//     }
  
//     if (currentUsers.length > 2) {
//       const color = colors[Math.floor(Math.random() * colors.length)];
//       avatars.push({
//         initials: `+${currentUsers.length - 2}`,
//         bgColor: color.bg,
//         textColor: color.text,
//       });
//     }
  
//     return avatars;
//   };
  
const generateAvatars = async (currentUsers, ownerId) => {
    const colors = [
      { bg: 'bg-purple-500', text: 'text-purple-400' },
      { bg: 'bg-blue-500', text: 'text-blue-400' },
      { bg: 'bg-green-500', text: 'text-green-400' },
      { bg: 'bg-red-500', text: 'text-red-400' },
      { bg: 'bg-yellow-500', text: 'text-yellow-400' },
      { bg: 'bg-pink-500', text: 'text-pink-400' },
      { bg: 'bg-cyan-500', text: 'text-cyan-400' },
      { bg: 'bg-orange-500', text: 'text-orange-400' },
      { bg: 'bg-indigo-500', text: 'text-indigo-400' },
    ];
  
    const avatars = [];
  
    // If currentUsers is empty, use the owner
    const usersToProcess = currentUsers && currentUsers.length > 0 
      ? currentUsers 
      : [{ user: ownerId }]; // Fallback to owner
  
    // Ensure at least one avatar is generated
    const displayCount = Math.min(usersToProcess.length, 2);
  
    for (let i = 0; i < displayCount; i++) {
      const userId = usersToProcess[i].user;
      try {
        const user = await User.findById(userId).select('fullName');
        let initials = '?';
        if (user && user.fullName) {
          const nameParts = user.fullName.trim().split(/\s+/);
          if (nameParts.length >= 2) {
            initials = nameParts[0][0] + nameParts[1][0];
          } else {
            initials = nameParts[0][0];
          }
          initials = initials.toUpperCase();
        }
        const color = colors[Math.floor(Math.random() * colors.length)];
        avatars.push({
          initials,
          bgColor: color.bg,
          textColor: color.text,
        });
      } catch (err) {
        console.error('Error fetching user for avatar:', err);
        const color = colors[Math.floor(Math.random() * colors.length)];
        avatars.push({
          initials: '?',
          bgColor: color.bg,
          textColor: color.text,
        });
      }
    }
  
    if (usersToProcess.length > 2) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      avatars.push({
        initials: `+${usersToProcess.length - 2}`,
        bgColor: color.bg,
        textColor: color.text,
      });
    }
  
    return avatars;
  };

router.get('/allspaces', async (req, res) => {
  try {
    const userId = req.query.userId; // Use session instead of query
    
    const user = await User.findById(userId)
      .populate({
        path: 'joinedSpaces',
        populate: { path: 'currentUsers.user', select: 'fullName' },
      })
      .populate({
        path: 'createdSpaces',
        populate: { path: 'currentUsers.user', select: 'fullName' },
      });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Combine both arrays
    let allSpaces = [...user.createdSpaces, ...user.joinedSpaces];

    allSpaces = await Promise.all(
      allSpaces.map(async (space) => ({
        type: user.createdSpaces.includes(space) ? 'my' : 'joined',
        title: space.name,
        createdOrJoined: user.createdSpaces.some(s => s._id.equals(space._id))
          ? `Created ${formatDistanceToNow(new Date(space.createdAt))} ago`
          : `Joined recently`, // Adjust if join date is available
        participants: space.currentUsers.length,
        iconClass: icons[Math.floor(Math.random() * icons.length)],
        iconColor: colors[Math.floor(Math.random() * colors.length)],
        avatars: await generateAvatars(space.currentUsers, space.owner),
      }))
    );

    res.status(200).json(allSpaces);

  } catch (err) {
    console.error('Error fetching all spaces:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const VirtualSpace = require('../models/VirtualSpace');
// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const {formatDistanceToNow} = require('date-fns');

// // Utility to generate avatars based on currentUsers
// const generateAvatars = async (currentUsers) => {
//   const colors = [
//     { bg: 'bg-purple-500', text: 'text-purple-400' },
//     { bg: 'bg-blue-500', text: 'text-blue-400' },
//     { bg: 'bg-green-500', text: 'text-green-400' },
//     { bg: 'bg-red-500', text: 'text-red-400' },
//     { bg: 'bg-yellow-500', text: 'text-yellow-400' },
//     { bg: 'bg-pink-500', text: 'text-pink-400' },
//     { bg: 'bg-cyan-500', text: 'text-cyan-400' },
//     { bg: 'bg-orange-500', text: 'text-orange-400' },
//     { bg: 'bg-indigo-500', text: 'text-indigo-400' },
//   ];
//   const avatars = [];

//   if (!currentUsers || currentUsers.length === 0) {
//     return avatars;
//   }

//   // Limit to 2 avatars + a "+N" avatar for additional users
//   const displayCount = Math.min(currentUsers.length, 2);

//   // Fetch user details for the first 2 users
//   for (let i = 0; i < displayCount; i++) {
//     const userId = currentUsers[i].user;
//     try {
//       const user = await User.findById(userId).select('fullName');
//       let initials = '?';
//       if (user && user.fullName) {
//         // Extract initials: e.g., "John Doe" → "JD", "Alice" → "A"
//         const nameParts = user.fullName.trim().split(/\s+/);
//         if (nameParts.length >= 2) {
//           initials = nameParts[0][0] + nameParts[1][0];
//         } else {
//           initials = nameParts[0][0];
//         }
//         initials = initials.toUpperCase();
//       }
//       const color = colors[Math.floor(Math.random() * colors.length)];
//       avatars.push({
//         initials,
//         bgColor: color.bg,
//         textColor: color.text,
//       });
//     } catch (err) {
//       console.error('Error fetching user for avatar:', err);
//       const color = colors[Math.floor(Math.random() * colors.length)];
//       avatars.push({
//         initials: '?',
//         bgColor: color.bg,
//         textColor: color.text,
//       });
//     }
//   }

//   // Add "+N" avatar for additional users
//   if (currentUsers.length > 2) {
//     const color = colors[Math.floor(Math.random() * colors.length)];
//     avatars.push({
//       initials: `+${currentUsers.length - 2}`,
//       bgColor: color.bg,
//       textColor: color.text,
//     });
//   }

//   return avatars;
// };

// // Utility to get random icon and color
    // const icons = [
    //     'fa-solid fa-map',
    //     'fa-solid fa-location-dot',
    //     'fa-solid fa-compass',
    //     'fa-solid fa-globe',
    //     'fa-solid fa-mountain-sun',
    //     'fa-solid fa-door-open',
    //     'fa-solid fa-chair',
    //     'fa-solid fa-couch',
    //     'fa-solid fa-table',
    //     'fa-solid fa-bed',
    //     'fa-solid fa-building',
    //     'fa-solid fa-warehouse',
    //     'fa-solid fa-object-group',
    //     'fa-solid fa-vector-square',
    //     'fa-solid fa-cube',
    //     'fa-solid fa-people-arrows',
    //     'fa-solid fa-handshake',
    //     'fa-solid fa-chalkboard',
    //     'fa-solid fa-diagram-project',
    //     'fa-solid fa-users'
    //   ];
    // const colors = [
    // 'text-white',
    // 'text-gray-400',
    // 'text-blue-400',
    // 'text-cyan-400',
    // 'text-teal-400',
    // 'text-emerald-400',
    // 'text-green-400',
    // 'text-lime-400',
    // 'text-yellow-400',
    // 'text-amber-400',
    // 'text-orange-400',
    // 'text-red-400',
    // 'text-rose-400',
    // 'text-pink-400',
    // 'text-fuchsia-400',
    // 'text-purple-400',
    // 'text-violet-400',
    // 'text-indigo-400',
    // 'text-sky-400',
    // 'text-zinc-400'
    // ];

// router.post('/create', async (req, res) => {
//   try {
//     const { name, maxNoOfPeople, pass, userId } = req.body;
//     const user = req.session.userId;
//     if (!user) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//     if (!name || !maxNoOfPeople) {
//       return res.status(400).json({ message: 'Name and maximum number of people are required' });
//     }

//     const hashedPass = pass ? await bcrypt.hash(pass, 10) : null;
//     const newSpace = new VirtualSpace({
//       name: name.trim(),
//       password: hashedPass,
//       maxUsers: maxNoOfPeople,
//       owner: user,
//       currentUsers: [], // Initially empty
//     });

//     await newSpace.save();

//     await User.findByIdAndUpdate(user, {
//       $push: { createdSpaces: newSpace._id },
//     });

//     return res.status(201).json({
//       message: 'Virtual space created successfully',
//       space: {
//         id: newSpace._id,
//         name: newSpace.name,
//         maxUsers: newSpace.maxUsers,
//         isProtected: !!newSpace.password,
//       },
//     });
//   } catch (err) {
//     console.error('Error creating space:', err);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// router.post('/join', async (req, res) => {
//   try {
//     const { id, pass } = req.body;
//     const user = req.session.userId;
//     if (!user) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//     if (!id || !user) {
//       return res.status(400).json({ message: 'Space ID and user ID are required' });
//     }

//     const space = await VirtualSpace.findById(id);
//     if (!space) {
//       return res.status(404).json({ message: 'Space not found' });
//     }

//     if (space.password) {
//       const isMatch = await bcrypt.compare(pass, space.password);
//       if (!isMatch) {
//         return res.status(403).json({ message: 'Incorrect password' });
//       }
//     }

//     if (space.currentUsers.length >= space.maxUsers) {
//       return res.status(403).json({ message: 'Space is full' });
//     }
//     const newUserEntry = {
//       user: user,
//       position: { x: 0, y: 0 }, // You can randomize or customize this
//     };

//     space.currentUsers.push(newUserEntry);
//     await space.save();

//     await User.findByIdAndUpdate(user, {
//       $push: { joinedSpaces: space._id },
//     });

//     return res.status(200).json({
//       message: 'Successfully joined the space',
//       space: {
//         id: space._id,
//         name: space.name,
//         maxUsers: space.maxUsers,
//         currentUsers: space.currentUsers.length,
//       },
//     });
//   } catch (err) {
//     console.error('Error joining space:', err);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// router.get('/myspaces', async (req, res) => {
//   try {
//     const userId = req.query.userId; // Assuming userId is passed as a query parameter
//     const user = await User.findById(userId).populate();
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const spaces = user.createdSpaces.map(async (space) => ({
//         type: 'my',
//         title: space.name,
//         createdOrJoined: `Created 5 ago`, // Adjust if creation date is available
//         participants: space.currentUsers.length,
//         lastActive: 'Recently active', // Adjust if last active is available
//         iconClass : icons[Math.floor(Math.random() * icons.length)],
//         iconColor : colors[Math.floor(Math.random() * colors.length)],
//       }))

//     return res.status(200).json(spaces);
//   } catch (err) {
//     console.error('Error retrieving created spaces:', err);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// router.get('/joinedspaces', async (req, res) => {
//   try {
//     const userId = req.query.userId;

//     const user = await User.findById(userId).populate();
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const spaces = user.joinedSpaces.map(async (space) => ({
//         type: 'joined',
//         title: space.name,
//         createdOrJoined: `Joined recently`, // Adjust if join date is available
//         participants: space.currentUsers.length,
//         lastActive: 'Recently active', // Adjust if last active is available
//         iconClass : icons[Math.floor(Math.random() * icons.length)],
//         iconColor : colors[Math.floor(Math.random() * colors.length)],
//         avatars: await generateAvatars(space.currentUsers),
//       }))

//     return res.status(200).json(spaces);
//   } catch (err) {
//     console.error('Error retrieving joined spaces:', err);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;