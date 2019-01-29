const mongoose = require('mongoose');
const  bcrypt = require('bcryptjs');
const SALT = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    name: {
        type: String,
        required: true,
        maxLength: 100
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 100
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
     role: {
         type: Number,
         default: 0
     },
     token: {
         type: String
     }
});
userSchema.pre('save', function(next){
    let user = this;

    if(user.isModified('password')){  // IF They are changing the passwords
        bcrypt.genSalt(SALT, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
    }
    else{
        next();
    }
})

userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return callback(err);
        callback(null, isMatch);

    });
}
userSchema.methods.generateToken = function(callback){
    let user = this;
    let token = jwt.sign(user._id.toHexString(), process.env.SECRET);

    user.token = token;
    user.save(function(err,user){
        if(err) return callback(err);
        callback(null, user);
    })
}

userSchema.statics.findByToken =  function(token, callback){
    var user = this;
    
    jwt.verify(token, process.env.SECRET, function(err, decode){
        user.findOne({"_id": decode, "token": token}, function(err,user){
            if(err) return callback(err);
            callback(null,user);
        })
    })
}
const User = mongoose.model('User', userSchema);

module.exports = {User}