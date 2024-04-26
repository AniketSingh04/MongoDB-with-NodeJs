const mongoose = require("mongoose");

// Define a schema
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

// Create a model using the schema and a collection
const UserModel = mongoose.model("users", UserSchema);

const main = async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/myDatabase");
    console.log("Connected Succesfully to mongodb server");

    const newData = new UserModel({
        name:"Honey Singh",
        age:40
    },);
    await newData.save();
    console.log("New Data Added");

}

main();