let admin = (req, res, next) => {
    if(req.user.role === 0){
        return res.send("You are not authorised to Create brands!");
    }

   next();
}

module.exports = {admin};