const expressFunction = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



var expressApp = expressFunction();

const makeHash = async(plainText) => {
    const result = await bcrypt.hash(plainText, 10);
    return result;
}

const compareHash = async(plainText, hashText) => {
    const resultCompare = await bcrypt.compare(plainText, hashText);
    return resultCompare;
}

const url = 'mongodb://localhost:27017/db_it';
const config = {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true };

var Schema = require("mongoose").Schema;
const userSchema = Schema({
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




const addProfile = profileData => {
       return new Promise ((resolve, reject) => {
        var new_Profile = new Profile ({
            id: profileData.id,
            password: profileData.password,
            title: profileData.title,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            sex: profileData.sex,
            email: profileData.email,
            file: profileData.file,
            img: profileData.img
        });
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
    makeHash(req.body.password)
    .then(hashText => {
        const prodata = {
            id: req.body.id,
            password: hashText,
            title: req.body.title,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            sex: req.body.sex,
            email: req.body.email,
            file: req.body.file,
            img: req.body.img
        }
        console.log(prodata);
    



    console.log('add'); 
    addProfile(prodata)
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
        .catch(err => {
            console.log(err);
        })
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









expressApp.listen(3000, function () {
    console.log('Listening on port 3000');
});

