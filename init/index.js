const mongoose = require("mongoose");
const initdata = require("./data1.js");
const Listing = require("../models/listing.js");
let mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
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
const initDB = async ()=>{
    await Listing.deleteMany({});
     initdata.data = initdata.data.map((obj)=>({...obj,owner:"676d79345f523d07ce795129"}));
    await Listing.insertMany(initdata.data);
    console.log('Data was initialised');
}
initDB();