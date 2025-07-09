import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../mogoose/mongoose';
import dotenv from 'dotenv';
import { User } from '../../mogoose/User';
import bcrypt from 'bcryptjs';
dotenv.config();

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    
    if(req.method!=='POST') return res.status(405);

    const{email, password} = req.body;
    await connectDB();

    const user = await User.findOne({email});
    if(user){
        res.status(400).json({message:"User already exists! Login"})
    }

    const hashed = await bcrypt.hash(password, 5);
    await User.create({
        email: email,
        password: hashed
    });

    res.status(201).json({message: "User created!"});
}



