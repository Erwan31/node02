const express = require('express');
//const { MongoClient } = require('mongodb');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

// Connect to DB
mongoose.connect('mongodb://localhost:27017/App',{
    useUnifiedTopology: true,
    useNewUrlParser: true
});


// Create Mongoose Schema + Model
const carSchema = mongoose.Schema({
    brand: String,
    model: String,
    year: Number,
    avail: Boolean,
});

const Car = mongoose.model('Car', carSchema);
////////////////////////////////////////////////

app.post('/api/addcar', (req,res) => {
    
    const addCar = new Car({
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        avail: req.body.avail,
    })
    
    
    addCar.save((err, doc) => {
        if(err) return console.log(err);
        console.log(doc);
        res.sendStatus(200);
    })
});

app.post('/api/removecar', (req,res) => {
    
    const brand = req.body.brand;

    Car.remove( {brand: brand}, (err, doc) => {
        if(err) return console.log(err);
        console.log(doc);
    })
});



app.get('/api/getcars', (req, res) => {
    Car.find( {}, (err, doc) => {
        if(err) return console.log(err);
        res.json(doc);
    })
})

app.get('/api/updatecar', (req, res) => {
    const id = req.body.id;
    const brand = req.body.brand;

    /*
    Car.update( {_id : id}, { $set: {
        brand: brand
    }}, (err, doc) => {
        if(err) return console.log(err);
        res.json(doc);
    });
    */
   Car.find( {}, (err, car) => {
       if(err) return console.log(err);

       car.set({
           brand: brand
       });
       car.save((err,doc)=>{
           if(err) return console.log(err);
           res.json(doc);
       })
   }
})

/*
const url = 'mongodb://localhost:27017'

const cars = [
    {model:"chevy", year:2017},
    {model: "nissan", year: 2000},
];

/*
app.get('/api/users',(req,res)=>{
    MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        if(err){
            console.log('COuld not connect to DB...');
        }
        console.log('Could connect to DB !!');
        client.db('Cars').collection('items').insert({
            cars
        }, (err, res) => {
            if(err){
                return console.log(`ERROR: ${err}`)
            }
            console.log(res.ops[0]._id.getTimestamp());
            client.close();
        });
    });
})

/*
app.get('/api/users',(req,res)=>{
    MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        if(err){
            console.log('COuld not connect to DB...');
        }
        console.log('Could connect to DB !!');
        client.db('Cars').collection('items').insertOne({
            model: "Ford",
            year: 2017
        }, (err, res) => {
            if(err){
                return console.log(`ERROR: ${err}`)
            }
            console.log(res.ops[0]._id.getTimestamp());
            client.close();
        });
    });
})
*/

const port = process.env.PORT || 3001;

app.listen(port);

