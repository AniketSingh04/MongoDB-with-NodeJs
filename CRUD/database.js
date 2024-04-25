const {MongoClient} = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url); //client object is created to interact with MongoDB Server
const dbName = "myDatabase"; //name of the database on which we will work

const connectToDatabase = async () => {
    try{
        await client.connect(); //client is now connected to the server
        console.log("Connected Succesfully to mongodb server");
        const db = client.db(dbName); //client is connected to the database
        return db; //returning the database access
    }
    catch(error){
        console.error("Failed To connect to mongodb server", error);
    }
}

module.exports = {connectToDatabase};