const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

const url = 'mongodb://localhost:27017'


app.get('/api/users',(req,res)=>{
    MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        if(err){
            console.log('could not connect to DB');
        }
        console.log('connected to test DB');
        client.close();
    })
})


const port = process.env.PORT || 3001;

app.listen(port);

