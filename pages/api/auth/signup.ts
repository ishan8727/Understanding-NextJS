import { NextApiRequest, NextApiResponse } from 'next';
import connectDB, { User } from '../../../mogoose/mongoose';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        await connectDB();

        console.log(req.body);
        
        const { name, email, number, password } = req.body;

        if (!name || !email || !password || !number) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists! Login" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await User.create({
            name,
            email,
            number,
            password: hashedPassword
        });

        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}



