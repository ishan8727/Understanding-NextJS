import { NextApiRequest, NextApiResponse } from "next";
import connectDB, { User } from "../../../mogoose/mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    console.log("Processing login request...");

    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        
        
        await connectDB();
        
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not found!" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid password!" });
        }

        const token = jwt.sign(
            { email: user.email, name: user.name }, 
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`);
        res.status(200).json({ message: "Logged in successfully!" });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}