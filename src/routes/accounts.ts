export const importAccountsRoutes = (app: any) => {
    app.route('/accounts')
        .get((req, res) => {
            res.send('Accounts');
        })
        .post((req, res) => {
            res.send('Account created');
        });

    app.route('/accounts/:id')
        .get((req, res) => {
            res.send('Account');
        })
        .put((req, res) => {
            res.send('Account updated');
        })
        .delete((req, res) => {
            res.send('Account deleted');
        });
};
