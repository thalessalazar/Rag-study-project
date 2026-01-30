import {config} from './config.js';
import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    
});

app.listen(config.server.port, () => {
    console.log(`Server is running on port ${config.server.port}`);
});