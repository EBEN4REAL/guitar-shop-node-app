
const express = require('express');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const app = express();  

const mongoose = require('mongoose');

require('dotenv').config();

// mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

// MIDDLEWARES
const {auth} = require('./middleware/auth');

// MODELS
const {User} = require('./models/user');

// ============================
//      USERS
// ============================
app.post('/api/users/register' , auth , (req,res) => {
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
    User.findOne({email: req.body.email}, (err,user) => {
        if(!user) return res.json({loginSuccess: false, message: 'Auth failes, email not fund'})

        user.comparePassword(req.body.password, (err,isMatch) => {
            if(!isMatch){
                return res.json({loginSuccess:false, message: "wrong password"});
            }
              user.generateToken((err, user) => {
                  if (err) return res.status(400).send(err);
                  res.cookie('w_auth', user.token).status(200).json({
                      loginSuccess: true
                  })
              })
        });
    });
});

app.get('/api/users/auth' , (req,res) => {

});

const port = process.env.PORT || 3002;

app.listen(port , () => {
    console.log(`Server running at ${port}`);
})