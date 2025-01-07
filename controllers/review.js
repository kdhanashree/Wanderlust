//mvc for reviews
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.Savereview = async(req,res)=>{
     
    let {id} = req.params;
    
    //add the review in reviews collection
    // console.log(req.body);
    let {review} = req.body;
    let listing = await Listing.findById(id);
    let newReview = new Review(review);
    newReview.author = res.locals.currUser._id;
    //await newReview.populate("author");
    // console.log(newReview);
    listing.reviews.push(newReview);
    await listing.save();
    await newReview.save();
    // console.log("Review has been saved");
    req.flash("Success","New Review added!")
    res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async(req,res)=>{
    let {id , reviewId} = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: { _id: reviewId } } });
    req.flash("Success","Review deleted!")
    res.redirect(`/listings/${id}`);
};