import express from 'express';
import { PORT, mongoURL } from './config.js';
import mongoose from 'mongoose';
import router from './routes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use('/books', router);
app.use(cors({
    options : ['GET','POST','PUT','DELETE'],
    origin : ['http://localhost:3000'],
    allowedHeaders : ['content-type']
}));

app.get('/',(req,res)=>{
    return res.status(200).send("Running");
});

mongoose.connect(mongoURL)
.then(()=>{
    console.log("Mongo Connected");
    app.listen(PORT);
})
.catch((err)=>{
    console.err(err);
});


