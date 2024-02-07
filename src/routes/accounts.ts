import bcrypt from 'bcrypt';
import mysql from 'mysql';

import { ENV } from '../env';

const connection = mysql.createConnection({
    host: ENV.DATABASE_URL,
    user: ENV.DATABASE_USER,
    password: ENV.DATABASE_PASSWORD,
    database: ENV.DATABASE_NAME,
});

export const importAccountsRoutes = (app: any) => {
    app.route('/accounts')
        .get((req, res) => {
            connection.query('SELECT * FROM accounts', (err, results) => {
                if (err) {
                    res.status(500).send(
                        'Error retrieving accounts from database',
                    );
                    return;
                }
                res.send(results);
            });
        })
        .post((req, res) => {
            const { name, password, email, balance } = req.body as {
                name: string;
                password: string;
                email: string;
                balance: number;
            };

            const encryptedPassword = bcrypt.hashSync(password, 10);

            connection.query(
                'INSERT INTO accounts (name, password, email, balance) VALUES (?, ?, ?, ?)',
                [name, encryptedPassword, email, balance],
                (err) => {
                    if (err) {
                        res.status(500).send('Error creating account');
                        return;
                    }
                    res.send('Account created');
                },
            );
            res.send('Account created');
        });

    app.route('/accounts/:id')
        .get((req, res) => {
            connection.query(
                'SELECT * FROM accounts WHERE id = ?',
                [req.params.id],
                (err, results) => {
                    if (err) {
                        res.status(500).send(
                            'Error retrieving account from database',
                        );
                        return;
                    }
                    if (results.length === 0) {
                        res.status(404).send('Account not found');
                        return;
                    }
                    res.send(results[0]);
                },
            );
            res.send('Account');
        })
        .put((req, res) => {
            const { name, password, email, balance } = req.body as {
                name: string;
                password: string;
                email: string;
                balance: number;
            };

            const encryptedPassword = bcrypt.hashSync(password, 10);

            connection.query(
                'UPDATE accounts SET name = ?, password = ?, email = ?, balance = ? WHERE id = ?',
                [name, encryptedPassword, email, balance, req.params.id],
                (err) => {
                    if (err) {
                        res.status(500).send('Error updating account');
                        return;
                    }
                    res.send('Account updated');
                },
            );
            res.send('Account updated');
        })
        .delete((req, res) => {
            res.send('Account deleted');
        });
};
