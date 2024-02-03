import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "Incorrect Email." })
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Incorrect Password." })
        
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });
        
        res.status(200).json({ result: {id: existingUser._id, email: existingUser.email, name: existingUser.name, username: existingUser.username}, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const signup = async(req, res) => {
    const { email, username, password, confirmPassword, name } = req.body;

    try {
        const existingEmail = await User.findOne({ email });
        if (existingEmail) return res.status(400).json({ message: "Email already in use." });

        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "User already exists." });

        if (password != confirmPassword) return res.status(400).json({ message: "Passwords don't match." });

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({ email, username, password: hashedPassword, name })
        
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1d" });
        res.status(200).json({ result: {id: result._id, email: result.email, name: result.name, username: result.username}, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const getUser = async (req, res) => {
    const { id } = req.body;
    
    try {
        const exisitngUser = await User.findOne({ _id: id })
        if (!exisitngUser) return res.status(400).json({ message: "Can't find User" });
        
        res.status(200).json({ result: {email: exisitngUser.email, name: exisitngUser.name, username: exisitngUser.username, photo: exisitngUser.photo}});
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }

}