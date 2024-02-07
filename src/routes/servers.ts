import { getDbConnection } from '../db/getDbConnection';

const connection = getDbConnection();

type serverData = {
    name: string;
    price: number;
    ip: string;
    userId: number;
};

export const importServerRoutes = (app: any) => {
    app.route('/servers')
        .get((req, res) => {
            connection.query('SELECT * FROM servers', (err, results) => {
                if (err) {
                    res.status(500).send(
                        'Error retrieving servers from database',
                    );
                    return;
                }
                res.send(results);
            });
        })
        .post((req, res) => {
            const { name, price, ip, userId } = req.body as serverData;

            connection.query(
                'INSERT INTO servers (name, price, ip, user_id, purchase_date) VALUES (?, ?, ?, ?, NOW())',
                [name, price, ip, userId],
                (err) => {
                    if (err) {
                        res.status(500).send('Error creating server');
                        return;
                    }
                    res.send('Server created');
                },
            );
        });

    app.route('/servers/:id')
        .get((req, res) => {
            connection.query(
                'SELECT * FROM servers WHERE id = ?',
                [req.params.id],
                (err, results) => {
                    if (err) {
                        res.status(500).send(
                            'Error retrieving server from database',
                        );
                        return;
                    }
                    if (results.length === 0) {
                        res.status(404).send('Server not found');
                        return;
                    }
                    res.send(results[0]);
                },
            );
        })
        .put((req, res) => {
            const { name, price, ip, userId } = req.body as serverData;

            connection.query(
                'UPDATE servers SET name = ?, price = ?, ip = ?, user_id = ? WHERE id = ?',
                [name, price, ip, userId, req.params.id],
                (err) => {
                    if (err) {
                        res.status(500).send('Error updating server');
                        return;
                    }
                    res.send('Server updated');
                },
            );
        })
        .delete((req, res) => {
            connection.query(
                'DELETE FROM servers WHERE id = ?',
                [req.params.id],
                (err) => {
                    if (err) {
                        res.status(500).send('Error deleting server');
                        return;
                    }
                    res.send('Server deleted');
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
