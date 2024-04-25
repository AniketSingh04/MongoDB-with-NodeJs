const {MongoClient} = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "myDatabase";
//console.log(client);

const dbConnection = async () =>{
    try{
        await client.connect();
        console.log("Connected Succesfully to mongodb server");
        const db = client.db(dbName);
        return db;
    }
    catch(error){
        console.error("Failed to connect to mongodb server", error);
        throw error;
    }
}
/*client.connect() is an asynchronous operation that connects
to the MongoDB server. By using await, the execution of main()
is paused until the connection is established. This ensures
that subsequent operations, which rely on the connection,
won't execute until it's ready. */

module.exports = {dbConnection};
    
