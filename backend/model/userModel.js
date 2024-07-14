const mongoose = require('mongoose');
const crypto = require("crypto");
const jwt = require("jsonwebtoken")
const userSchema = mongoose.Schema({

    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    email: {
        type : String,
        required : true,
    },
    password:{
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },
    is_verified: {
        type: Number,
        default:0
    },
    avatar:{
        type: String
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
 
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
 
    return resetToken;
};

const Users = mongoose.model('users', userSchema);
module.exports = Users;