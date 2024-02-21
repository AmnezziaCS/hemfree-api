import bcrypt from 'bcrypt';

import sql from '../db/db.ts';
import { userData } from '../types/models.ts';

export const importUserRoutes = (app: any) => {
    app.route('/users')
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
            const { name, password, mail, balance } = req.body as userData;

            if (!name || !password || !mail || balance === undefined) {
                res.status(400).send(
                    `Missing fields: ${JSON.stringify(req.body)}`,
                );
                return;
            }

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
            const { name, mail, balance } = req.body as userData;

            if (!name || !mail || balance === undefined) {
                res.status(400).send(
                    `Missing fields: ${JSON.stringify(req.body)}`,
                );
                return;
            }

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
