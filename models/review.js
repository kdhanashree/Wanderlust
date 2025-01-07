const { default: mongoose } = require("mongoose");
// let mongo_url = 'mongodb://127.0.0.1:27017/wanderlust';
// main().then((req,res)=>{
//     // console.log("Connected to DB.");
// })
// .catch((err)=>{
//     console.log(err);
// })
// async function main()
// {
//      mongoose.connect(mongo_url);
// }

const reviewSchema = new mongoose.Schema({
    comments:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
});

let review = mongoose.model("Review",reviewSchema);

module.exports = review;