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
    const productsCollection = client.db("recapemajhon").collection("Products");
    const ordersCollection = client.db("recapemajhon").collection("orders");

    //load all data form fakeData to database //complete C of the CRUD//
    app.post('/addProduct', (req, res) => {
        const products = req.body;
        productsCollection.insertOne(products)
            .then(result => {
                res.send(result.insertedIds)
                console.log(result.insertedIds)
            })
    })

    //upload/Read a product Item form the database// complete R of th CRUD//
    app.get('/products', (req, res) => {
        productsCollection.find({})//get product from database//then convert it to array//then send it to documents//
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    //load Single Products//
    app.get('/product/:key', (req, res) => {
        productsCollection.find({ key: req.params.key })//find single product by "using req.params.key" //
            .toArray((err, documents) => {
                res.send(documents[0]);
            })
    })

    //get/load product for review components//find by productKeys//
    app.post('/productsByKeys', (req, res) => {
        const productKeys = req.body;
        productsCollection.find({ key: { $in: productKeys } })
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    //add order to database//
    app.post('/addOrder', (req, res) => {
        const orders = req.body;
        ordersCollection.insertOne(orders)
            .then(result => {
                res.send(result.insertedId)
                console.log(result.insertedId)
                
            })
    })
});


//from express
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})