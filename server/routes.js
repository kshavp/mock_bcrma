import express from 'express';
import { bookModel } from './models/model.js';

const router = express.Router();

/*Creating a New Book and Storing in the DB*/
router.post('/',async(req,res)=>{
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

/*Retreiving all books from the DB*/
router.get('/',async(req,res)=>{
    try{
        const book = await bookModel.find({});
        if(!book) return res.status(400).send("Book Not Found!");
        return res.status(201).json(book);
    }
    catch(err){
        return res.status(500).json(err);
    }
});


/*Retreiving a book based on ID from the DB*/
router.get('/:id',async(req,res)=>{
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


/*Updating a book from the DB*/
router.put('/:id',async(req,res)=>{
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


/*Deleting a book from the DB*/
router.delete('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const bookDeleted = await bookModel.findByIdAndDelete(id);
        if(!bookDeleted) return res.status(404).send("Book Not Found");
        return res.status(201).json("Book Deleted!");
    }
    catch(err){
        return res.status(500).json(err);
    }
});

export default router;