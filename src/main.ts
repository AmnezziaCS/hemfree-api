import express from 'express';

import { importAllRoutes } from './routes';

const app = express();

app.listen(3000, () => {
    console.log('🚀 Server started and running on port 3000');
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

importAllRoutes(app);
