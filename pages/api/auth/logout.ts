import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        // Clear the authentication cookie
        res.setHeader('Set-Cookie', `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`);
        
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
