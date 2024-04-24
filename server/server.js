import express from 'express';
import { PORT, mongoURL } from './config.js';
import mongoose from 'mongoose';
import { bookModel } from './models/model.js';

const app = express();
app.use(express.json());

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

/*Creating a New Book and Storing in the DB*/
app.post('/books',async(req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.yearOfPublish) return res.status(400).send("Fields are Missing");
        const book = {
            title : req.body.title,
            author : req.body.author,
            yearOfPublish : req.body.yearOfPublish
        }
        const newBook = await bookModel.create(book)
        return res.status(201).send(newBook);
    }
    catch(err){
        return res.status(500).json(err);
    }
});
