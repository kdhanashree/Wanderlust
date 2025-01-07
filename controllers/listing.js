const Listing = require("../models/listing.js");

module.exports.index = async (req,res)=>{

    const allistings = await Listing.find({});
    // console.log(allistings[0].price);
    // res.send("Wait");
    res.render("./listings/index.ejs",{allistings});
}

module.exports.showform = (req,res,next)=>{
    res.render("./listings/newplace_form.ejs");
}


    //  console.log(req.body);
//here we are adding isLoggedIn middleware to ensure if a post request is not directly made through any tool like hopscotch or postman.
module.exports.addnewlisting = async (req, res, next) => {
    // Make sure the image and other required fields are present in the request
    // if (!req.file) {
    //   return next(new ExpressError(400, 'Image file is required.'));
    // }
    // Handle async fetch and save the listing
    try {
      //Get coordinates from the geocoding API
      let l = req.body.location;
      let q = `https://nominatim.openstreetmap.org/search?q=${l}&format=json&limit=1`;
     // console.log(`api:${q}`);
      const response = await fetch(q);

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
      const data = await response.json();
      if (data.length === 0) {
        return next(new ExpressError(400, 'Geocoding API returned no results.'));
      }
      let { lat, lon } = data[0]; // Get the first result's coordinates
    //   console.log(`Type : ${typeof(lat)}`);
    //   console.log(`float Parsed values : ${parseFloat(lon) }, ${ parseFloat(lat) }`);
      lon = parseFloat(lon);
      lat = parseFloat(lat);
     // console.log(typeof(lon)); 
      let geometry = {
        type: "Point",
        coordinates: [parseFloat(lon), parseFloat(lat)] // Longitude, Latitude
      };
      //console.log(`request body:${req.body}`);
     
      // Set location from the fetched coordinates
      const loc = geometry;
      //console.log(req.body);
    
    //   // Prepare other form data
      let { title, description, image, price, location, country,category} = req.body;
      geometry = loc;
     // console.log(geometry);
      
    //   // Save the new listing
      let newlisting = new Listing({
        title,
        description,
        image,
        price,
        location,
        country,
        owner: req.user._id,
        image: {
          url: req.file.path,
          filename: req.file.filename
        },
        geometry,
        category
      });
      console.log(newlisting);
    //   res.send('checking');
      await newlisting.save();
  
      // Provide success feedback and redirect
      req.flash("Success", "New Listing Created!");
      return res.redirect("/listings");
     } 
    catch (error) {
      console.error(error);
      return next(new ExpressError(500,'Something went wrong while creating the listing.'));
    }
  };
  
    //next(new ExpressError(400,"Send Valid data for listing")); =>listing validation is handled by valdate listing

module.exports.editplaceform = async (req,res)=>{
    
    let {id}= req.params;
    let listing = await Listing.findById(id);
       if(!listing)
        {
            req.flash("error","Listing you requested does not exists!");
            res.redirect("/listings");
        }
        let originalimageurl = listing.image.url;
        originalimageurl = originalimageurl.replace("/upload","/upload/w_250/e_blur:100");
        //console.log(originalimageurl);
    // console.log(listing);
    res.render("./listings/editform.ejs",{listing,originalimageurl});
}

module.exports.updatelisting = async (req,res)=>{

    let {id} = req.params;
    let updatedlisting = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    //only text format data gets updated in above query to update.We need to explicitly 
    //update any new file if uploaded
    // console.log(typeof(req.file));
    if(req.file)
    {
        let url = req.file.path;
        let filename = req.file.filename;
        updatedlisting.image ={url,filename};
        await updatedlisting.save();//after updating the new image uploaded save the listing once again
    }
    req.flash("Success","Listing updated!")
    res.redirect(`/listings/${id}`);
}

module.exports.showspecificlisting = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");   
    // console.log(listing.owner);
    // console.log(res.locals.currUser);
  
    if(!listing)
    {
        //in case someone tries to access now deleted listing
        req.flash("error","Listing you requested does not exists!");
        res.redirect("/listings");
    }
    else{
        res.render("./listings/show.ejs",{listing , mapToken : process.env.MAP_API_Token});
    }
  
}

module.exports.delete = async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("Success","Listing deleted!");
    res.redirect("/listings");
}