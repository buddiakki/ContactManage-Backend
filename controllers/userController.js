const asynchandler = require("express-async-handler");
const User = require('../models/userModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const registerUser = asynchandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ error: "All fields are mandatory" });
        return;
    }

    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
        res.status(400).json({ error: "User already registered" });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400).json({ error: "User data is not valid" });
    }
});


const loginUser = asynchandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
    res.status(400)
    throw new Error('All fields are required')
    }

    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user : {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn:'1440m'
        }
        )
        res.status(200).json({accessToken, username: user.username})
    } else {
        res.status(401).json({error:"Invalid Login"})
    }
});

const currentUser = asynchandler(async (req, res) => {
    res.json(req.user);
});

const uploadImage = asynchandler(async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const userId = decodedToken.user.id;

        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        user.imageUrl = imageUrl;

        const updatedUser = await user.save();

        return res.status(200).json({ imageUrl: updatedUser.imageUrl });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
});


const getImage = asynchandler(async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const userId = decodedToken.user.id;

        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const imageUrl = user.imageUrl; 
        console.log(imageUrl);
        
        return res.status(200).json({ imageUrl });
    } catch (error) {
        console.error(error);
        throw new Error(`Error fetching the image ${error}`);
    }
});






module.exports = {registerUser, loginUser, currentUser, uploadImage, getImage};