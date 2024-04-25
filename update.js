const {dbConnection} = require("./db");

async function main(){
    try{
        const db = await dbConnection();
        const collection = db.collection("users");
        const updateResult = collection.updateMany({name : "Aniket"},{$set:{age: 22}});
        console.log(`${updateResult.modifiedCount} are updated`);
    }
    catch(error){
        console.error("Failed to update data",error);
        throw error;
    }
}

main();