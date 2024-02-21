import jwt from 'jsonwebtoken';

import { ENV } from './env';

export const generateToken = (name: string) => {
    return jwt.sign({ name }, ENV.JWT_SECRET, { expiresIn: 18000 });
};

export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, ENV.JWT_SECRET, (err) => {
        if (err) return res.sendStatus(403);

        next();
    });
};
