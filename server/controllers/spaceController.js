const VirtualSpace = require('../models/VirtualSpace');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Chat = require('../models/Chat')
const { formatDistanceToNow } = require('date-fns');

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
  'fa-solid fa-users',
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
  'text-zinc-400',
];

const generateAvatars = async (currentUsers, ownerId) => {
  const avatarColors = [
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
  const usersToProcess = currentUsers && currentUsers.length > 0 ? currentUsers : [{ user: ownerId }];
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
      const color = avatarColors[Math.floor(Math.random() * avatarColors.length)];
      avatars.push({
        initials,
        bgColor: color.bg,
        textColor: color.text,
      });
    } catch (err) {
      console.error('Error fetching user for avatar:', err);
      const color = avatarColors[Math.floor(Math.random() * avatarColors.length)];
      avatars.push({
        initials: '?',
        bgColor: color.bg,
        textColor: color.text,
      });
    }
  }

  if (usersToProcess.length > 2) {
    const color = avatarColors[Math.floor(Math.random() * avatarColors.length)];
    avatars.push({
      initials: `+${usersToProcess.length - 2}`,
      bgColor: color.bg,
      textColor: color.text,
    });
  }

  return avatars;
};

exports.createSpace = async (req, res) => {
  try {
    const { name, maxNoOfPeople, pass } = req.body;
    const userId = req.user.userId; // From JWT auth middleware

    if (!name || !maxNoOfPeople) {
      return res.status(400).json({ message: 'Name and maximum number of people are required' });
    }

    const hashedPass = pass ? await bcrypt.hash(pass, 10) : null;
    const newSpace = new VirtualSpace({
      name: name.trim(),
      password: hashedPass,
      maxUsers: maxNoOfPeople,
      owner: userId,
      currentUsers: [{
        user: userId,
        position: { x: 0, y: 0 },
      }],
    });
    const chatISpace = new Chat({
      spaceId : newSpace._id,
      chats : []
    })

    await chatISpace.save();

    await newSpace.save();
    console.log('Space created:', { id: newSpace._id, currentUsers: newSpace.currentUsers });

    await User.findByIdAndUpdate(userId, {
      $push: { createdSpaces: newSpace._id },
    });

    return res.status(201).json({
      message: 'Virtual space created successfully',
      space: {
        id: newSpace._id,
        name: newSpace.name,
        maxUsers: newSpace.maxUsers,
        isProtected: !!newSpace.password,
      },
    });
  } catch (err) {
    console.error('Error creating space:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.joinSpace = async (req, res) => {
  try {
    const { id, pass } = req.body;
    const userId = req.user.userId; // From JWT auth middleware

    if (!id) {
      return res.status(400).json({ message: 'Space ID is required' });
    }

    const space = await VirtualSpace.findById(id);
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }

    if (space.password) {
      const isMatch = await bcrypt.compare(pass, space.password);
      if (!isMatch) {
        return res.status(403).json({ message: 'Incorrect password' });
      }
    }

    if (space.currentUsers.length >= space.maxUsers) {
      return res.status(403).json({ message: 'Space is full' });
    }

    const userExists = space.currentUsers.some(u => u.user.toString() === userId);
    if (userExists) {
      return res.status(400).json({ message: 'User already in space' });
    }

    const newUserEntry = {
      user: userId,
      position: { x: 0, y: 0 },
    };

    space.currentUsers.push(newUserEntry);
    await space.save();
    console.log('User joined space:', { spaceId: id, userId, currentUsers: space.currentUsers });

    await User.findByIdAndUpdate(userId, {
      $push: { joinedSpaces: space._id },
    });

    return res.status(200).json({
      message: 'Successfully joined the space',
      space: {
        id: space._id,
        name: space.name,
        maxUsers: space.maxUsers,
        currentUsers: space.currentUsers.length,
      },
    });
  } catch (err) {
    console.error('Error joining space:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllSpaces = async (req, res) => {
  try {
    const userId = req.user.userId; 

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

    let allSpaces = [...user.createdSpaces, ...user.joinedSpaces];

    allSpaces = await Promise.all(
      allSpaces.map(async (space) => ({
        id: space._id,
        type: user.createdSpaces.some((s) => s._id.equals(space._id)) ? 'my' : 'joined',
        title: space.name,
        createdOrJoined: user.createdSpaces.some((s) => s._id.equals(space._id))
          ? `Created ${formatDistanceToNow(new Date(space.createdAt))} ago`
          : `Joined recently`,
        participants: space.currentUsers.length,
        iconClass: icons[Math.floor(Math.random() * icons.length)],
        iconColor: colors[Math.floor(Math.random() * colors.length)],
        lastActive: 'Recently active',
        avatars: await generateAvatars(space.currentUsers, space.owner),
      }))
    );

    res.status(200).json(allSpaces);
  } catch (err) {
    console.error('Error fetching all spaces:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getSpace = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: 'Space ID is required' });
    }

    const space = await VirtualSpace.findById(id).populate('currentUsers.user');
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }
    // console.log(space.currentUsers);
    return res.status(200).json(space);
  } catch (err) {
    console.error('Error fetching space:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateSpace = async (req, res) => {
  const { spaceId, userId, position } = req.body;

  if (!spaceId || !userId || !position) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const space = await VirtualSpace.findById(spaceId);
    if (!space) {
      return res.status(404).json({ error: 'Space not found.' });
    }

    const userEntry = space.currentUsers.find(
      (entry) => entry.user.toString() === userId
    );

    if (userEntry) {
      userEntry.position = position;
    } else {
      // optionally add user if not found
      space.currentUsers.push({ user: userId, position });
    }

    await space.save();
    return res.status(200).json({ message: 'Position updated successfully.' });
  } catch (err) {
    console.error('Error updating user position:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.leaveSpace = async (req, res) => {
  try {
    const { spaceId, userId } = req.body;

    // Validate input
    if (!spaceId || !userId) {
      return res.status(400).json({ error: 'spaceId and userId are required' });
    }

    // Find the space
    const space = await VirtualSpace.findById(spaceId);
    if (!space) {
      return res.status(404).json({ error: 'Space not found' });
    }

    // Check if user is in the space
    const userIndex = space.currentUsers.findIndex(
      (entry) => entry.user.toString() === userId
    );
    if (userIndex === -1) {
      return res.status(400).json({ error: 'User is not in this space' });
    }

    // Remove user from space's currentUsers
    space.currentUsers.splice(userIndex, 1);

    // Save the updated space
    await space.save();

    // Update the User document
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove space from user's joinedSpaces or createdSpaces
    if (space.owner.toString() === userId) {
      // If user is the owner, remove from createdSpaces
      user.createdSpaces = user.createdSpaces.filter(
        (id) => id.toString() !== spaceId
      );
    } else {
      // If user is a participant, remove from joinedSpaces
      user.joinedSpaces = user.joinedSpaces.filter(
        (id) => id.toString() !== spaceId
      );
    }

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: 'Successfully left the space' });
  } catch (err) {
    console.error('Error in leaveSpace:', err);
    return res.status(500).json({ error: 'An error occurred while leaving the space', details: err.message });
  }
};