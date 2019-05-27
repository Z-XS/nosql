var express = require('express')
var app = express()
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/"

// var connection = MongoClient.connect(url,{useNewUrlParser:true})

app.post('/addfoods',function(req,res) {
    console.log(req.query)
    // connection
    // .then(db => {
    //     var dbo = db.db('manage')
    //     dbo.connection('foods').insertMany(arr,function(err,result) {
    //         if(err) throw err
    //     })
    // })
    // .catch(err => console.log(err))

})






var server = app.listen(3002,'localhost',function() {
    var host = server.address().address
    var port = server.address().port
    console.log('http://%s:%s',host,port)
})
