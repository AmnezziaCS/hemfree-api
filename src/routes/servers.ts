import sql from '../db/db.ts';
import { serverData } from '../types/models.ts';

export const importServerRoutes = (app: any) => {
    app.route('/servers')
        .get((req, res) => {
            sql`SELECT * FROM servers`
                .then((servers) => {
                    res.send(servers);
                })
                .catch(() => {
                    res.status(500).send('Error getting servers');
                });
        })
        .post((req, res) => {
            const { name, price, ip, userId } = req.body as serverData;

            if (!name || !price || !ip || !userId) {
                res.status(400).send(
                    `Missing fields: ${JSON.stringify(req.body)}`,
                );
                return;
            }

            sql`INSERT INTO servers (name, price, ip, user_id) VALUES (
                    ${name},
                    ${price},
                    ${ip},
                    ${userId})`
                .then(() => {
                    res.send('Server created');
                })
                .catch(() => {
                    res.status(500).send('Error creating server');
                });
        });

    app.route('/servers/:id')
        .get((req, res) => {
            sql`SELECT * FROM servers WHERE id = ${req.params.id}`
                .then((servers) => {
                    if (servers.length === 0) {
                        res.status(404).send(
                            `Server at id ${req.params.id} not found`,
                        );
                        return;
                    }
                    res.send(servers[0]);
                })
                .catch(() => {
                    res.status(500).send(
                        `Error getting serverId: ${req.params.id}`,
                    );
                });
        })
        .put((req, res) => {
            const { name, price, ip, userId } = req.body as serverData;

            if (!name || !price || !ip || !userId) {
                res.status(400).send(
                    `Missing fields: ${JSON.stringify(req.body)}`,
                );
                return;
            }

            sql`UPDATE servers SET name = ${name}, price = ${price}, ip = ${ip}, user_id = ${userId} WHERE id = ${req.params.id}`
                .then(() => {
                    res.send('Server updated');
                })
                .catch(() => {
                    res.status(500).send(
                        `Error updating serverId: ${req.params.id}`,
                    );
                });
        })
        .delete((req, res) => {
            sql`DELETE FROM servers WHERE id = ${req.params.id}`
                .then(() => {
                    res.send('Server deleted');
                })
                .catch(() => {
                    res.status(500).send(
                        `Error deleting serverId: ${req.params.id}`,
                    );
                });
        });
};
