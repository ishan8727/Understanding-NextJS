import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "No token provided", isAuthenticated: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
        
        return res.status(200).json({ 
            message: "Authenticated", 
            isAuthenticated: true,
            user: {
                email: decoded.email,
                name: decoded.name
            }
        });
    } catch (error) {
        console.error('Auth verification error:', error);
        return res.status(401).json({ message: "Invalid token", isAuthenticated: false });
    }
}
