import express, { json } from 'express';
// import game from './engine/engine.mjs';
import { JsonRespone } from './Utils/utilities.mjs';
import Engine from './engine/engine.mjs';
import cors from 'cors';

const port = 8888;
const app = express();

app.use(express.json());
app.use(cors());

const engine = new Engine();

app.get('/', (req, res) => {
    return res.json(JsonRespone('Up and running'));
});

app.post('/api/move', (req, res) => {
    const { from, to } = req.body;

    console.log(req.body);
    const aiMoveResponse = engine.move(from, to);

    return res.json(aiMoveResponse);
});

app.get('/api/state', (req, res) => {
    return res.json(engine.getState());
});

app.listen(port, () => console.log(`Listening on port ${port}`));