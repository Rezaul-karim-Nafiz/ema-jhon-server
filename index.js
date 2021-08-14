//from express
var express = require('express')
var app = express()
const port = 4000
app.get('/', (req, res) => {
  res.send('Hello Node')
})

//use cors and body-parser
const cors = require('cors')
app.use(cors());
app.use(express.json());

//from env
require('dotenv').config()



//form mongodb
const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0mhgi.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const ProductsCollection = client.db("recapemajhon").collection("Productss");
  //create a post first from app//
  app.post('/addProduct', (req, res) => {
      const Products = req.body;
      
    ProductsCollection.insertMany(Products)
    .then(result => {
        res.send(result.insertedIds)
        console.log(result.insertedIds)
    })
  })
});


//from express
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})