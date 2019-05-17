var express = require('express')
var MongoClient = require('mongodb').MongoClient
var app = express()
var url = "mongodb://localhost:27017/";

var connection = MongoClient.connect(url,{ useNewUrlParser: true })
app.get('/123',function(req,res) {
    if(req.query.id != 123) return
    console.log(111)
    connection
    .then(db => {
        var dbo = db.db('runoob')
        dbo.collection('site').find({}).toArray(function(err,result){
            if(err) throw err
            res.json(result)
        })
    })
    .catch(err => console.log(err))
            
})

var server = app.listen(3002,'localhost',function() {
    var host = server.address().address
    var port = server.address().port
    console.log('http://%s:%s',host,port)
})