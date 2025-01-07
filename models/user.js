const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        required:true,
        type:String
    }
});

userSchema.plugin(passportLocalMongoose);
//we used this plugin because it adds username,hash func , and salt to the model.also adds certain methods
module.exports = mongoose.model('User',userSchema);