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

app.get('/books/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const book = await bookModel.findById(id);
        if(!book) return res.status(400).send("Book Not Found!");
        return res.status(201).json(book);
    }
    catch(err){
        return res.status(500).json(err);
    }
});

app.put('/books/:id',async(req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.yearOfPublish) return res.status(400).send("Fields are Missing");
        const book = {
            title : req.body.title,
            author : req.body.author,
            yearOfPublish : req.body.yearOfPublish
        }
        const id = req.params.id;
        const bookFound = await bookModel.findByIdAndUpdate(id,book)
        if(!bookFound) return res.status(404).send("Book Not Found");
        return res.status(201).json("Book Updated");
    }
    catch(err){
        return res.status(500).json(err);
    }
});

app.delete('/books/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const bookDeleted = await bookModel.findByIdAndDelete(id);
        if(!bookDeleted) return res.status(404).send("Book Not Found");
        return res.status(201).json("Book Deleted");
    }
    catch(err){
        return res.status(500).json(err);
    }
});
