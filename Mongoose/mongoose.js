const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/myDatabase");

//schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String
});

const bookModel = mongoose.model("Book", bookSchema); //model created using schema


const app = express();

//in Mongoose, operations are carried out by model unlike collections in MongoDB

//get
app.get("/books", async (req, res)=>{
    try{
        const books = await bookModel.find()
        res.json(books);
    }
    catch(error){
        res.status(500).json({error: "Internal Server Error"});
    }
});

//Middleware to convert the request body to JSON object
app.use(express.json());

//post
app.post("/books", async(req, res)=>{
    try{
        const  {title, author} =req.body;
        const newBook = new bookModel({title, author});
        await newBook.save();
        res.status(201).json(newBook);
    }
    catch(error){
        res.status(500).json({error: "Internal Server Error"});
    }
});

//put
app.put("/books/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const{title, author} = req.body;
        const updateBook = await bookModel.findByIdAndUpdate(id, {title, author});
        res.json(updateBook);
    }
    catch(error){
        res.status(500).json({error: "Internal Server Error"});
    }
});

//delete
app.delete("/books/:id", async(req, res)=>{
    const {id} = req.params;
    const deleteBook = await bookModel.findByIdAndDelete(id);
    res.sendStatus(204);
});


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});