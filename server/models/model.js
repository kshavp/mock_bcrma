import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    author : {
        type: String,
        required: true
    },
    yearOfPublish : {
        type: Number,
        required: true
    },
    },
    {timestamps : true}
);

export const bookModel = mongoose.model('Book',bookSchema);