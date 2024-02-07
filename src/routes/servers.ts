export const importServerRoutes = (app: any) => {
    app.route('/servers')
        .get((req, res) => {
            res.send('Servers');
        })
        .post((req, res) => {
            res.send('Server created');
        });

    app.route('/servers/:id')
        .get((req, res) => {
            res.send('Server');
        })
        .put((req, res) => {
            res.send('Server updated');
        })
        .delete((req, res) => {
            res.send('Server deleted');
        });
};
