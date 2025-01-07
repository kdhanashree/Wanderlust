let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let review = require("./review.js");
//here we are creating a mmodel for listings
const listingSchema = new Schema(
  {
    title:String,
    description:String,
    image:{
        url:String,
        filename:String
    },
    price:Number,
    location:String,
    country:String,
    reviews:[ //array of type Objectid
      {
       type:mongoose.Schema.Types.ObjectId,
       ref:review,
      }
    ],
    owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'    
    },
    geometry: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    category: {
      type: String,
      enum: ['Mountains', 'Camping', 'Iconic Cities', 'Arctic', 'Farms' , 'Castles','Amazing Pools','Rooms'], // Enum categories
      required: true,
    }
  
  } 
);
//defining a mongoose middleware
listingSchema.post("findOneAndDelete",async(listing)=>{
       if(listing){
        await review.deleteMany({_id:{$in:listing.reviews}});
       }
});
const Listing = new mongoose.model("Listing",listingSchema);
module.exports = Listing;