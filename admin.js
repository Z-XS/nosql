var express = require('express')
var mongoose = require('mongoose')
var app = express()
var bodyParser = require('body-parser'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/"

var connection = MongoClient.connect(url,{useNewUrlParser:true})

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// function findcount() {
//     return new Promise((resolve,reject) => {
//         connection.then(db => {
//             var dbo = db.db('manage')
//             dbo.collection('foods').countDocuments().then(count => resolve(count))
//         })
//     })
// }
// var result
// async function Count() {
//     result = await findcount()
// }
app.get('/getcount',function(req,res) {
    connection.then(db => {
        var dbo = db.db('manage')
        dbo.collection('foods').countDocuments().then(count => res.json(count))
    })
})

app.get('/addfoods',function(req,res) {
    // console.log(req)
    var arr = [req.query]
    res.status(200)
    connection
    .then(db => {
        var dbo = db.db('manage')
        dbo.collection('foods').insertMany(arr,function(err,result) {
            if(err) throw err
            res.json('good')
        })
    })
    .catch(err => console.log(err))
})

app.get('/foodlist',function(req,res) {
    console.log(req.query)
    if(req.query.search != 'foodlist07') return
    connection
    .then(db => {
        var dbo = db.db('manage')
        dbo.collection('foods').find({}).toArray(function(err,result) {
            if(err) throw err
            res.json(result)
        })
    })
    .catch(err => console.log(err))
})

app.get('/foodpage',function(req,res) {
    var pagesize = Number(req.query.pagesize)
    var page = Number(req.query.page)
    var skips = Number((page - 1)*pagesize) 
    connection
    .then(db => {
        var dbo = db.db('manage')
        dbo.collection('foods').find().skip(skips).limit(pagesize).toArray(function(err,result) {
            if(err) throw err
            res.json(result)
        })
    })
    .catch(err => console.log(err))  
})

app.get('/delete',function(req,res) {
    console.log(req.query)
    var str = mongoose.Types.ObjectId(req.query.deleteId)
    console.log(str)
    const deletestr = {_id : str}
    connection
    .then(db => {
        var dbo = db.db('manage')
        dbo.collection('foods').deleteOne(deletestr,function(err,result) {
            if (err) throw err
            res.json('success')
        })
    })
})

app.get('/update',function(req,res) {
    var obj = JSON.parse(req.query.form)
    var str = mongoose.Types.ObjectId(obj._id)
    const wherestr = {_id : str}
    console.log(str)
    delete obj._id
    console.log(obj)
    const updatestr = {$set: obj}
    // const updatestr = {$set: {name: 'skr'}}
    connection
    .then(db => {
        var dbo = db.db('manage')
        dbo.collection('foods').updateOne(wherestr,updatestr,function(err,result) {
            if (err) throw err
            res.json('success')
        })
    })
})

app.post('/cookie',function(req,res){
    console.log(111)
    console.log(req.body)
    res.send(true)
})

app.get('/123',function(req,res){
    console.log(req.query)
    res.json(1321212)
})




var server = app.listen(3002,'localhost',function() {
    var host = server.address().address
    var port = server.address().port
    console.log('http://%s:%s',host,port)
})
