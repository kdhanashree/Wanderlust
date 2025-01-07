const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync  = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema , reviewSchema} = require("../Schema.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");
//common part in the routes for revies "is:listings/:id/reviews"
//reviews post route
router.post("/",isLoggedIn,validateReview, wrapAsync (reviewController.Savereview));
//reviews delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports = router;