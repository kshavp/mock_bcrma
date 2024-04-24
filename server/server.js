import express from 'express';
import { PORT } from './config.js';
const app = express();

app.get('/',(req,res)=>{
    return res.status(200).send("Running");
});

app.listen(PORT);
