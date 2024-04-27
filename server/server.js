import express from 'express';
import { PORT, mongoURL } from './config.js';
import mongoose from 'mongoose';
import router from './routes.js';

const app = express();
app.use(express.json());
app.use('/books', router);

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


