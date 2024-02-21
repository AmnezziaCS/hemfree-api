import express from 'express';

import { importAllRoutes } from './routes';

const app = express();

app.listen(3000, () => {
    console.log('🚀 Server started and running on port 3000');
});

app.use((req, res, next) => {
    console.log(`🔊 Request received\n📡 ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('ping pong!');
});

importAllRoutes(app);
