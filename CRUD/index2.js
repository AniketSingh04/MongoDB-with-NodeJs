const express = require("express");
const app = express();
const {connectToDatabase} = require("./CRUD/database.js");

app.get('/', async (req, res) =>{
    try{
        const db = await connectToDatabase(); //database access is called
        const collection = db.collection("users"); //database access the collection "users"
        let data = await collection.find().toArray(); //find() returns a cursor, toArray() is called to convert the cursor to an array of documents
        res.json(data); //data is sent as a json response
    }
    catch(error){
        console.error(error);
        res.status(500).send({error : "Internal Server Error "});
    }
});

//post
app.use(express.json()); //to parse the request body as a JSON object
app.post("/users", async (req,res)=>{
    console.log(req.body);
    const db = await connectToDatabase(); //database access is called
    const collection = db.collection("users"); //database access the collection "users"
    //let result = collection.insertOne({name :"aryan", age: 25}); //static method to insert data
    let result = collection.insertOne(req.body); //dynamic method to insert data; data coming from postman
    res.json("Inserted");
});

//put
app.put("/users/:name", async (req,res) =>{
    console.log(req.params); //params is used for dynamic approach
    const db = await connectToDatabase(); //database access is called
    const collection = db.collection("users"); //database access the collection "users"
    //let singleData = await collection.updateOne({name:"Michael"},{$set : {name:"Parshva", age: 40}});
    let singleData = await collection.updateOne({name: req.params.name},{$set: req.body});
    res.json("Updated");
})

//delete
app.delete("/users/:name", async(req, res)=>{
    const db = await connectToDatabase(); //database access is called
    const collection = db.collection("users"); //database access the collection "users"
    const username = req.params.name;
    const deleteData = collection.deleteOne({name: username});
    res.json(`${deleteData} is deleted`);
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})