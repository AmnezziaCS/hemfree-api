import bcrypt from 'bcrypt';

import sql from '../db.ts';
import { generateToken } from '../jwt.ts';
import { UserData } from '../types/models.ts';

export const importLoginRoutes = (app: any) => {
    app.route('/login').post((req, res) => {
        const { name, password } = req.body as Omit<
            UserData,
            'balance' | 'mail'
        >;

        if (!name || !password) {
            res.status(400).send(`Missing fields: ${JSON.stringify(req.body)}`);
            return;
        }

        sql`SELECT password FROM users WHERE name = ${name}`
            .then((users) => {
                if (users.length === 0) {
                    res.status(404).send(`User ${name} not found`);
                    return;
                }
                if (!bcrypt.compareSync(password, users[0].password)) {
                    res.status(401).send('Invalid password');
                    return;
                }
                const token = generateToken(name);
                res.send(token);
            })
            .catch(() => {
                res.status(500).send(`Error getting user: ${name}`);
            });
    });
};
