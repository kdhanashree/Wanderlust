const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveredirectUrl} = require("../middleware.js");
const userController = require("../controllers/user.js");

router.route("/signup")
.get(userController.renderSignUp)
.post(wrapAsync(userController.signup))
// router.get("/signup",userController.renderSignUp);

// router.post("/signup",wrapAsync(userController.signup));


router.route("/login")
.get((req,res)=>{ 
  res.render("users/login.ejs");
})
.post(saveredirectUrl,
  passport.authenticate("local",
  {failureRedirect:'/login' , failureFlash:true}),userController.login)
  
// router.get("/login",(req,res)=>{ 
//   res.render("users/login.ejs");
// });

// router.post("/login",saveredirectUrl,
//   passport.authenticate("local",
//     {failureRedirect:'/login' , failureFlash:true}),userController.login);

router.get("/logout",userController.logout);

module.exports = router;
