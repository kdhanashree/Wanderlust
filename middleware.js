const { findByIdAndDelete, findById } = require("./models/review");
const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
let {reviewSchema , listingSchema} = require("./Schema.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn=(req,res,next)=>{
   
    if(!req.isAuthenticated())
    {
         req.session.redirectUrl = req.originalUrl;
         req.flash("error","you must be logged in to create a listing!");
          return  res.redirect("/login");
    }
   next();  
}
//here we saved the original path that user wanted to visit in req.session.redirectUrl so that after login user is redirected to his desired path with the help of this path been saved in req.session.redirectUrl which is accessible to evry route handler amd middleware

//however passort will reset the session info when the user logs in and this info of redirecturl in req.session will be erased. to handle this and keep this info intact we 

module.exports.saveredirectUrl = (req,res,next)=>{
    console.log(req.session);
    if (!req.isAuthenticated()) {
        res.locals.redirectUrl = req.session.redirectUrl  // Save the attempted URL
    }
    next();
}
module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(res.locals.currUser && !listing.owner._id.equals(res.locals.currUser._id))
    {
        req.flash("error","You don't have permission!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req,res,next)=>{
   
    if (req.body.price) {
        req.body.price = Number(req.body.price);
    }

    let {error} = listingSchema.validate(req.body.listing);
   // console.log(result);
    if(error)
    {   
        console.log(req.body);
        console.log(error);
        let errMsg = error.details.map((el)=>el.message).join(",");
         throw new ExpressError(400,errMsg);
    }
    console.log('Validation done!');
     next();
};

module.exports.validateReview =  (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
   // console.log(result);
    if(error)
    {   let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    next();
};

module.exports.isReviewAuthor = async(req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    console.log(review);
    if(res.locals.currUser && !review.author._id.equals(res.locals.currUser._id))
    {
        req.flash("error","You don't have permission!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}