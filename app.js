
if(process.env.NODE_ENV!="production")
{
    require('dotenv').config()
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
// let mongo_url = 'mongodb://127.0.0.1:27017/wanderlust';
const path = require("path");
const methodoverride = require('method-override');
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
// const {listingSchema , reviewSchema} = require("./Schema.js");
const Review = require("./models/review.js");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
//requirements for authentication.
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const dbUrl = process.env.ATLASDB_URL ; 

main().then((req,res)=>{
    console.log("Connected to DB.");
})
.catch((err)=>{
    console.log(err);
})
async function main()
{ 
    //mongoose.connect(mongo_url);
    // console.log(`Db-url:${dbUrl}\n`);
    mongoose.connect(dbUrl);
    
}
app.listen(8080,()=>{
    console.log('Server is listening to port 8080!');
});
// app.get("/",(req,res)=>{
//     res.send('Hi I am root!!');
// });

const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto: {
        secret:process.env.SECRET
    },
    touchAfter:24*60*60
})

store.on("error",()=>{
    console.log("Error in Mongo Session Store.",err);
})
const sessionOptions = {
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    //adding the cookie choices
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Corrected
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },

};
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
//In Express.js, locals is an object that is used to store variables that are passed to templates or views during rendering. These variables can be accessed within your EJS (or other templating engines) templates to dynamically generate content.
//can use locals to set data that will be available across all templates for a given request. 
    res.locals.success = req.flash("Success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});
app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews/",reviewsRouter);
app.use("/",userRouter);

// app.get("/demouser",async(req,res,next)=>{
//     let fakeUser = new User({
//         email:"abcd@gmail.com",
//         username:"Sanvi"
//     });

//     let registeredUser =  await User.register(fakeUser,"helloworld");
//     console.log(registeredUser);
// });
// app.get("/testlisting", wrapAsync(async (req,res)=>{

//     let newdata = new Listing({
//         title: "ds villa",
//         description:"By beach side",
//         price:20000,
//         location:'Guhagar , Konkan',
//         country:'India'

//     });

//     await newdata.save();
//     console.log("data added successfully!");
//     res.send("Testing successful");
// }));
//catch all route -> in case any request been made by client doent match with any of the specified routed then catch all route will throw a custom express error written using the express class
//flow
// =>A user makes a request.
// Express checks all previously defined routes to find a match.
// If no route matches:
// The catch-all route (app.all("*")) triggers.
// It creates an error object (ExpressError) and passes it to the next middleware.
// The error-handling middleware catches the error:
// Extracts the statusCode and message.
// Sends a response with these details.
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not Found!"));
});

//error handling mddleware
app.use((err,req,res,next)=>{
    let {statusCode =500, message = "Something went wrong! "} = err;
    res.render("error.ejs",{err});
    //res.status(statusCode).send(message);
});