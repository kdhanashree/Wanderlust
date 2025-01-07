const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema , reviewSchema} = require("../Schema.js");
const Listing = require('../models/listing.js');
const Review = require("../models/review.js");
const {isLoggedIn} = require("../middleware.js");
const {isOwner,validateListing} = require("../middleware.js");
//for parsing multiformat type of data
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage}) 
//index route
const listingControllers = require("../controllers/listing.js");
// The listingControllers is a JavaScript module imported from ../controllers/listing.js.
// It's typically an object that contains functions (also called "controller actions") responsible for handling the logic of specific routes.
     
router.route("/")
.get(wrapAsync(listingControllers.index))
.post( isLoggedIn ,upload.single("image"), validateListing,wrapAsync(listingControllers.addnewlisting));

router.get("/search",wrapAsync(async(req,res,next)=>{
     let {country} = req.query;
     console.log(country);
     if(country == ""){
          res.redirect("/listings");
     }
     else{
          const allistings = await Listing.find({country:country});
          console.log(allistings);
          res.render("./listings/index.ejs",{allistings});
          //res.send("Searchin!!");
     }
     
}));

router.get("/filter",wrapAsync(async (req,res,next)=>{
     let category = req.query.category;
     console.log(category);
     let allistings = await Listing.find({category:category});
     if(allistings.length == 0)
     {
          return res.redirect("/listings")
     }
     else{
          return res.render('./listings/index.ejs',{allistings});
     }
}));
// route that renders a form to get the data of  new place
router.get("/create",isLoggedIn,listingControllers.showform);

// upload.single("image")-functionality
// When a request containing a file is sent to a route that uses this middleware:
// Multer processes the file.
// Stores it according to the specified configuration (e.g., disk or memory storage).
// Adds a file object to the req object.

router.route("/:id")
.get(wrapAsync(listingControllers.showspecificlisting))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing ,isOwner, wrapAsync(listingControllers.updatelisting))
.delete(isOwner,wrapAsync(listingControllers.delete))


//route to render a edit listing form
//ensure only a authenticated user can edit the data
router.get("/:id/edit",isLoggedIn , wrapAsync(listingControllers.editplaceform));


//below are the valid routes they are just organised in more optimal format above using router.route

// router.get("/",wrapAsync(listingControllers.index));

// route that updates the new place data into the db
// router.post("/",validateListing, isLoggedIn , wrapAsync(listingControllers.addnewlisting));
//put request to update the changes
// router.put("/:id",isLoggedIn,isOwner,validateListing ,isOwner, wrapAsync(listingControllers.updatelisting));

//show route
//router.get("/:id",wrapAsync(listingControllers.showspecificlisting));

//destroy route
//router.delete("/:id",isOwner,wrapAsync(listingControllers.delete));

module.exports = router;