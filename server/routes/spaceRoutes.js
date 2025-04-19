const express = require('express');
const router = express.Router();
const VirtualSpace = require('../models/VirtualSpace');
const bcrypt = require('bcrypt');


router.post('/create', async (req,res)=>{
    try{
        const {name, maxNoOfPeople, pass, userId} = req.body;
        const user = req.session.userId;
        if(!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if(!name || !maxNoOfPeople) {
            return res.status(400).json({ message: 'Name and maximum number of people are required' });
        }

        const hashedPass = pass ? await bcrypt.hash(pass, 10) : null;
        const newSpace = new VirtualSpace({
            name: name.trim(),
            password: hashedPass,
            maxUsers: maxNoOfPeople,
            owner: user,
            currentUsers: [] // Initially empty
        });

        await newSpace.save();

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
        const {id, pass} = req.body;
        const user = req.session.userId;
        if(!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if(!id || !user) {
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
            user: user,
            position: { x: 0, y: 0 } // You can randomize or customize this
        };

        space.currentUsers.push(newUserEntry);
        await space.save();

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



module.exports = router;