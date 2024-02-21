import bcrypt from 'bcrypt';

import sql from '../db.ts';
import { authenticateToken } from '../jwt.ts';
import { UserData } from '../types/models.ts';

export const importUserRoutes = (app: any) => {
    app.route('/users')
        .all(authenticateToken)
        .get((req, res) => {
            sql`SELECT * FROM users`
                .then((users) => {
                    res.send(users);
                })
                .catch(() => {
                    res.status(500).send('Error getting users');
                });
        })
        .post((req, res) => {
            const { name, password, mail, balance } = req.body as UserData;

            if (!name || !password || !mail || balance === undefined) {
                res.status(400).send(
                    `Missing fields: ${JSON.stringify(req.body)}`,
                );
                return;
            }

            sql`SELECT * FROM users WHERE name = ${name}`
                .then((users) => {
                    if (users.length > 0) {
                        res.status(409).send(`User ${name} already exists`);
                        return;
                    }
                })
                .catch(() => {
                    res.status(500).send(
                        `Error getting users with name: ${name}`,
                    );
                });

            const encryptedPassword = bcrypt.hashSync(password, 10);

            sql`INSERT INTO users (name, password, mail, balance, creation_date) VALUES (
                    ${name},
                    ${encryptedPassword},
                    ${mail},
                    ${balance},
                    NOW())`
                .then(() => {
                    res.send('User created');
                })
                .catch(() => {
                    res.status(500).send('Error creating user');
                });
        });

    app.route('/users/:id')
        .all(authenticateToken)
        .get((req, res) => {
            sql`SELECT * FROM users WHERE id = ${req.params.id}`
                .then((users) => {
                    if (users.length === 0) {
                        res.status(404).send(
                            `User at id ${req.params.id} not found`,
                        );
                        return;
                    }
                    res.send(users[0]);
                })
                .catch(() => {
                    res.status(500).send(
                        `Error getting userId: ${req.params.id}`,
                    );
                });
        })
        .put((req, res) => {
            const { name, mail, balance } = req.body as UserData;

            if (!name || !mail || balance === undefined) {
                res.status(400).send(
                    `Missing fields: ${JSON.stringify(req.body)}`,
                );
                return;
            }

            sql`SELECT * FROM users WHERE name = ${name}`
                .then((users) => {
                    if (users.length > 0) {
                        res.status(409).send(`User ${name} already exists`);
                        return;
                    }
                })
                .catch(() => {
                    res.status(500).send(
                        `Error getting users with name: ${name}`,
                    );
                });

            sql`UPDATE users SET
                name = ${name},
                mail = ${mail},
                balance = ${balance}
                WHERE id = ${req.params.id}`
                .then(() => {
                    res.send('User updated');
                })
                .catch(() => {
                    res.status(500).send('Error updating user');
                });
        })
        .delete((req, res) => {
            sql`DELETE FROM users WHERE id = ${req.params.id}`
                .then(() => {
                    res.send('User deleted');
                })
                .catch(() => {
                    res.status(500).send(
                        `Error deleting userId: ${req.params.id}`,
                    );
                });
        });
};
