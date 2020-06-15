const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();

const url = 'mmongodb+srv://movie:movie@movie-upjmm.mongodb.net/Movie?retryWrites=true&w=majority';
const config = {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true };

var Schema = require("mongoose").Schema;
const userSchema = Schema({
    type: String,
    id: String,
    password: String,
    title: String,
    firstName: String,
    lastName: String,
    sex: String,
    email: String,
    file: String,
    img: String
},{
    collection: 'profiles'
});

let Profile
try {
  Profile = mongoose.model('profiles')
}catch (error) {
  Profile = mongoose.model('profiles',userSchema) ;
}

expressApp.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
    res.setHeader('Access-Control-Allow-Methods' , 'POST, GET, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers' , 'Content-Type, Option, Authorization ')
    return next()
});
expressApp.use(expressFunction.json());
expressApp.use((req, res, next) => {
    mongoose.connect(url, config)
    .then(() => {
        console.log( 'Connected to MongoDB... ');
        next();
    })
    .catch(err=> {
        console.log( 'Cannot connect to MongoDB');
        res.status(501).send( 'Cannot connect to MongoDB')
    });
});

const addProfile = (profileData) => {
    return new Promise ((resolve, reject) => {
        var new_Profile = new Profile (
            profileData
        );
        new_Profile.save((err, data) => {
            if(err){
                reject(new Error( 'Cannot insert Profile to DB!'));
            }else{
                resolve(data);
            }
        });
    })
}


const getProfiles =() => {
    return new Promise ((resolve, reject) =>{
        Profile.find({}, (err, data) => {
            if(err){
                reject(new Error('Cannont get Profiles!'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannont get ProfileProfiles!'));
                }
            }
        })
    });
}






expressApp.post('/profile/add', (req, res) => {
    console.log('add'); addProfile(req.body).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
        .catch(err => {
            console.log(err);
        })
});


expressApp.get('/profile/get', (req, res) => {
    console.log('get');
    getProfiles()
        .then(result => {
           // console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});

expressApp.get('/profile/get/:id', (req, res) => {
    //id: req.params.id;
    console.log(req.params.id);
    Profile.findById(req.params.id)
        .exec(function(err, data) {
            if (err) {
               // console.log("Error retriveing item")
                console.log(err)
            } else {
                res.json(data)
              //  console.log("retrieveing success")
            }
        })
});

expressApp.listen(3000, function () {
    console.log('Listening on port 3000');
});

