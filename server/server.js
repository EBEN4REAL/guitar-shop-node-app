
const express = require('express');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const app = express();  

const mongoose = require('mongoose');

const formidable = require("express-formidable");

const cloudinary = require('cloudinary');

require('dotenv').config();

app.use(express.static('client/build'));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// MIDDLEWARES
const {auth} = require('./middleware/auth');
const {admin} = require('./middleware/admin');

// MODELS
const {User} = require('./models/user');
const {Brand} = require('./models/brand');
const {Wood} = require('./models/wood');
const {Product} = require('./models/products');

// ============================
//      Products
// ============================

app.post('/api/product/shop' , (req,res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBY = req.body.sortBY ? req.body.sortBY : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    
    for(let key in req.body.filters){
        console.log(req.body.filters);
        if(req.body.filters[key].length > 0){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key];
            }
        }
    }
    findArgs['publish'] = true;
    Product.find(findArgs)
        .populate('brand')
        .populate('wood')
        .sort([[sortBY,order]])
        .skip(skip)
        .limit(6)
        .exec((err, articles) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({
                size: articles.length,
                articles
            })
        })


    console.log(findArgs);

    res.status(200);
})

// BY ARRIVAL
// /articles?sortBY=createdAt&order=desc&limit=4

// BY SALE
// /articles?sortBy=sold&order=desc&limit=100&skip=5
app.get('/api/product/articles', (req,res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : 'id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Product.find()
        .populate('brand')
            .populate('wood')
                .sort([
                    [sortBy, order]
                ])
                    .limit(limit)
                        .exec((err,products)  => {
                        if(err) return res.status(400).send(err);
                        res.send(products);
                    })
})

app.get('/api/product/articles_by_id' , (req,res) => {
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let Ids =  req.query.id.split(',');
        items = []
        items = Ids.map(item => {
            return mongoose.Types.ObjectId(item)
        })
        console.log(items);
    }

    Product.find({'_id': {$in:items}})
        .populate('brand')
        .populate('wood')
       .exec((err, docs) => {
        return res.status(200).send(docs);
    })

})

app.post('/api/product/article', auth,admin, (req,res) => {
    const product = new Product(req.body);
    product.save((err,doc) => {
        if(err) return res.status(400).json({success: false, err});
        res.status(200).json({
            success: true,
            product: doc
        })
    })
})

// ============================
//      WOODS
// ============================


app.post('/api/product/wood' , auth, admin , (req,res) => {
    const wood = new Wood(req.body);

    wood.save((err, doc) => {
        if(err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            wood: doc
        })
    })
})

app.get('/api/product/woods', (req,res) => {
    Wood.find((err,woods) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(woods)
    })
})



// ============================
//      BRANDS
// ============================
app.post('/api/product/brand', auth, admin, (req,res) => {
    const brand = new Brand(req.body);

    brand.save((err,doc) => {
        if(err) return res.json({success: false, err:err});
        res.status(200).json({
            success: true,
            brandData: doc
        })
    })
});

app.get('/api/product/get_brands' , (req,res) => {
    Brand.find((err, brands) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(brands);
    })
})

// ============================
//      USERS
// ============================
app.post('/api/users/register' , (req,res) => {
    const user = new User(req.body);

    user.save((err,doc) => {
        if(err) return res.json({success: false, err:err});
        res.status(200).json({
            success: true,
            userdata: doc
        })
    })
})

app.post('/api/users/uploadimage', auth, admin, formidable(), (req, res) => {
    cloudinary.uploader.upload(req.files.file.path, (result)=>{
        console.log(result);
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        })
    }, {
        public_id: `${Date.now()}`,
        resource_type: 'auto'
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

app.get('/api/users/auth' , auth , (req,res) => {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })
});

app.get('/api/users/logout' , auth ,  (req,res) => {
    User.findOneAndUpdate(
        {_id: req.user._id},
        {token: ''},
        (err,doc)=>{
            if(err) return res.json({success:false, err})
            return res.status(200). send({
                success: true
            })
        }
    )
})

// // default
if(process.env.NODE_env === 'production'){
    const path = require('path');
    app.get('/*' , (req,res) => {
        res.sendfile(path.resolve(__dirname, '../client', 'build','index.html'))
    })
}

const port = process.env.PORT || 3002;

app.listen(port , () => {
    console.log(`Server running at ${port}`);
})