const mongoose = require("mongoose");
const initdata = require("./data1.js");
const { MongoClient, ObjectId } = require('mongodb');
// const { ObjectId } = mongoose.Types;
let mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
const client = new MongoClient(mongo_url);
const dbName = 'wanderlust';
const collectionName = 'listings';
main().then((req,res)=>{
    console.log("Connected to DB.");
    
})
.catch((err)=>{
    console.log(err);
})

async function main()
{
    await mongoose.connect(mongo_url);
}

async function insertListings() {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertMany(initdata.data);
        console.log(`${result.insertedCount} listings inserted successfully.`);
    } catch (err) {
        console.error('Error inserting listings:', err);
    }
}
 insertListings();