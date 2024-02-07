import bcrypt from 'bcrypt';

import { getDbConnection } from '../db/getDbConnection';

const connection = getDbConnection();

type userData = {
    name: string;
    password: string;
    mail: string;
    balance: number;
};

export const importUserRoutes = (app: any) => {
    app.route('/users')
        .get((req, res) => {
            connection.query('SELECT * FROM users', (err, results) => {
                if (err) {
                    res.status(500).send(
                        'Error retrieving users from database',
                    );
                    return;
                }
                res.send(results);
            });
        })
        .post((req, res) => {
            const { name, password, mail, balance } = req.body as userData;

            const encryptedPassword = bcrypt.hashSync(password, 10);

            connection.query(
                'INSERT INTO users (name, password, mail, balance, creation_date) VALUES (?, ?, ?, ?, NOW())',
                [name, encryptedPassword, mail, balance],
                (err) => {
                    if (err) {
                        res.status(500).send('Error creating user');
                        return;
                    }
                    res.send('User created');
                },
            );
        });

    app.route('/users/:id')
        .get((req, res) => {
            connection.query(
                'SELECT * FROM users WHERE id = ?',
                [req.params.id],
                (err, results) => {
                    if (err) {
                        res.status(500).send(
                            'Error retrieving user from database',
                        );
                        return;
                    }
                    if (results.length === 0) {
                        res.status(404).send('User not found');
                        return;
                    }
                    res.send(results[0]);
                },
            );
        })
        .put((req, res) => {
            const { name, password, mail, balance } = req.body as userData;

            const encryptedPassword = bcrypt.hashSync(password, 10);

            connection.query(
                'UPDATE users SET name = ?, password = ?, mail = ?, balance = ? WHERE id = ?',
                [name, encryptedPassword, mail, balance, req.params.id],
                (err) => {
                    if (err) {
                        res.status(500).send('Error updating user');
                        return;
                    }
                    res.send('User updated');
                },
            );
        })
        .delete((req, res) => {
            connection.query(
                'DELETE FROM users WHERE id = ?',
                [req.params.id],
                (err) => {
                    if (err) {
                        res.status(500).send('Error deleting user');
                        return;
                    }
                    res.send('User deleted');
                },
            );
        });
};

connection.end((err) => {
    if (err) {
        console.error('Error closing the database connection', err);
        return;
    }
    console.log('🔒 Database connection closed');
});
