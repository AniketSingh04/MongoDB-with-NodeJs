const {dbConnection} =  require("./db");

async function main(){
    try{
        const db =  await dbConnection();
        const collection = db.collection("users");
        const deleteResult  = await collection.deleteMany({name:"Emily"});
        console.log(deleteResult.deletedCount);
    }
    catch(error){
        console.error("Failed to delete data", error);
        throw error;
    }
}
main();