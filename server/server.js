
const express = require('express');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const app = express();  

const mongoose = require('mongoose');

require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

// MODELS
const {User} = require('./models/user');

// ============================
//      USERS
// ============================
app.post('/api/users/register' , (req,res) => {
    const user = new User(req.body);

    user.save((err,doc) => {
        if(err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            userdata: doc
        })
    })
})

app.post('/api/users/login', (req, res) => {
    // Find Email
    User.findOne({'email': req.body.email}, (err,user) => {
        if(!user) return res.json({loginSuccess: false, message: 'Auth failes, email not fund'})
        
    });

    // Check Password

    // generate a token
});


const port = process.env.PORT || 3002;

app.listen(port , () => {
    console.log(`Server running at ${port}`);
})