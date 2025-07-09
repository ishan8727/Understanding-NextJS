import connectDB from "../../mogoose/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../mogoose/User";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(req:NextApiRequest, res:NextApiResponse){

    if(req.method!=='POST') return res.status(405);

    await connectDB();

    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({message:"User email not registered!"});
    }

    const passCheck = await bcrypt.compare(password, user.password);
    if(!passCheck){
        res.status(401).json({message:"Invalid password!"});
    }

    const token = jwt.sign({email}, JWT_SECRET);

    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite = Strict; Secure`)
    res.json({message:"Logged in!"})
    
    // res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/ Same-Site = Strict `)
}