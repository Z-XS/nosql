var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
// MongoClient.connect连接返回的是promise
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db('runoob')
  // 创建集合
  // dbo.createCollection('site', function(err,res) {
  //   if(err) throw err
  //   console.log('success')
  // })
  // 插入数据,单条insertOne，多条insertMany
  // const obj = {name: '温度范围', get: 11}
  // const arr = [
  //   {name: '小红', password: '852963'},
  //   {name: '小米', password: '123456'},
  //   {name: 'XD', password: '741'}
  // ]
  // dbo.collection("site").insertOne(obj, function(err, res) {
  //   if (err) throw err
  // })
  // dbo.collection("site").insertMany(arr, function(err, res) {
  //   if (err) throw err
  // })
  // 查询数据find({}).toArray--所有
  // find(查询条件).toArray
  // toArray 集合转数组
  // dbo.collection('site').find({}).toArray(function(err,res) {
  //   if (err) throw err
  //   console.log(res)
  // })
  // dbo.collection('site').find({},function(err,res){
  //   console.log(res)
  //   })
  // (>) 大于 - $gt
  // (<) 小于 - $lt
  // (>=) 大于等于 - $gte
  // (<= ) 小于等于 - $lte
  // const wherestr = {"name":'XD'}
  // dbo.collection('site').find(wherestr).toArray(function(err,res) {
  //   if (err) throw err
  //   console.log(res)
  // })
  // 更新一条数据
  // const wherestr2 = {name: '小红'}
  // const updatestr = {$set: {pass: '8529637410'}}
  // dbo.collection('site').updateOne(wherestr2,updatestr,function(err,res) {
  //   if(err) throw err
  // })
  // 更新多条数据
  // const wherestr2 = {name: '温度范围'}
  // const updatestr = {$set: {ki: '123++456'}}
  // dbo.collection('site').updateMany(wherestr2,updatestr,function(err,res) {
  //   if(err) throw err
  //   console.log(res.result.nModified)
  //   console.log(res)
  // })
  //插入新字段
  // dbo.collection('site').update({}, {$set: {get: 'getters'}}, {multi: true},function(err,res){
  //   console.log(res)
  // })
  //   update命令
  // update命令格式：
  // db.collection.update(criteria,objNew,upsert,multi)
  // 参数说明：
  // criteria：查询条件
  // objNew：update对象和一些更新操作符
  // upsert：如果不存在update的记录，是否插入objNew这个新的文档，true为插入，默认为false，不插入。
  // multi：默认是false，只更新找到的第一条记录。如果为true，把按条件查询出来的记录全部更新。
  // 删除字段
  // dbo.collection('site').update({},{$unset:{'pass': ''}}, {multi: true})
  // 删除一条(deleteOne)/多条数据(deleteMany)
  // const deletestr = {name: '温度范围'}
  // dbo.collection('site').deleteOne(deletestr,function(err,res){
  //   if(err) throw err
  //   console.log(res.result.n + '删除条数')
  // })
  // 排序 使用 sort() 方法，该方法接受一个参数，规定是升序(1)还是降序(-1)
  // const sortstr = {get: -1}
  // dbo.collection('site').find().sort(sortstr).toArray(function(err,res) {
  //   if (err) throw err
  //   console.log(res)
  // })
  // 查询分页 如果要设置指定的返回条数可以使用 limit() 方法，该方法只接受一个参数，指定了返回的条数。
  // dbo.collection('site').find().limit(2).toArray(function(err,res) {
  //   console.log(res)
  // })
  // 如果要指定跳过的条数，可以使用 skip() 方法
  // dbo.collection('site').find().skip(2).limit(2).toArray(function(err,res) {
  //   console.log(res)
  // })
  // dbo.collection('site').aggregate([
  //   {
  //     $lookup:
  //     {
  //       from: 'runoob',
  //       localField: 'name',
  //       foreignField: 'get',
  //       as: 'order'
  //     }
  //   }
  // ]).toArray(function(err,res){
  //   console.log(res)
  // })

  dbo.collection('site').aggregate([{$limit:5},{$group: {_id: null,sum:{$sum: "$get"}}}]).toArray(function(err,res){
    console.log(res)
  })
  // drop() 方法来删除集合
  // dbo.collection('product').drop(function(err, delOk) {
  //   if(err) throw err
  //   if(delOk) console.log('已删除')
  // })

  // 导出（json格式）//bin目录下打开cmd
  // mongoexport -d 库名 -c 表名 -o 目的的路径+文件名（带后缀）
  })
  
