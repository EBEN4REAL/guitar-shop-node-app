const {User} = require('../models/user');

let auth = (req,res,next) => {
    let token = req.cookies.w_auth;

    User.findByToken(token, (err,user) => {
        
    })
}

module.exports = {auth};

