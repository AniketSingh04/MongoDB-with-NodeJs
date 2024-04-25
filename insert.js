const {dbConnection} = require("./db");

async function main(){
    try{
        const db = await dbConnection();
        const collection = db.collection("users");

        const data = [{name : "Aniket" , age : 21}, {name : "Seenu", age: 3}];
        const insertResult = await collection.insertMany(data);
        console.log(`${insertResult.insertedCount} documents inserted`);
    }
    catch(error){
        console.error("Failed to insert data", error);
        throw error;
    }
}
main();