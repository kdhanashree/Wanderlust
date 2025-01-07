const User = require("../models/user");
const passport = require("passport");

module.exports.renderSignUp = (req,res)=>{
    res.render("users/signup.ejs");
};
module.exports.signup = async(req,res)=>{
    try{
      let {username,email,password} = req.body;
      let newuser = new User({username,email});
      const registeredUser = await User.register(newuser,password);
      console.log(registeredUser);
      // Wrap req.login in a Promise and await it
      await new Promise((resolve, reject) => {
        req.login(registeredUser, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
      req.flash("Success","Welcome to Wanderlust!");
      res.redirect("/listings");
    }
    catch(e){
      req.flash("error",e.message);
      res.redirect("/signup");
    } 
}

module.exports.login = (req,res)=>{
    req.flash('Success',"Welcome to Wanderlust you are logged in!");
     if(res.locals.redirectUrl){
      return res.redirect(res.locals.redirectUrl);
     }
     return res.redirect("/listings");   
}

module.exports.logout = (req,res)=>{
    //here this req.logout method is provided by passport
    req.logout((err)=>{
      if(err){
       return next(err);
      }
      else{
        req.flash("Success","You logged out!");
        res.redirect("/listings");
      }
    });
  }