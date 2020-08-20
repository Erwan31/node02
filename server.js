const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

const url = 'mongodb://localhost:27017'


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


const port = process.env.PORT || 3001;

app.listen(port);

