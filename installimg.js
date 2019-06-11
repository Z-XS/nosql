var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var src = 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161022224033873-290248113.png'

var arr = []
var a = 0
// for (var i of arr) {
//     a++
//     var writeStream = fs.createWriteStream(`image/${a}.png`)
//     var readStream = request(i.url)
//     readStream.pipe(writeStream);
    
//     readStream.on('end',function(){
//         console.log('下载成功')
//     })
    
//     readStream.on('error',function(error){
//         console.log(error)
//     })
    
//     writeStream.on('finish',function() {
//         console.log('success')
//         writeStream.end()
//     })
// }

function getData(url) {
    request(url,function(err,response,body) {
        if(!err && response.statusCode == 200) {
            var $ = cheerio.load(body)
            var content = $(".ui-slide-content .ui-slide-item img")
            console.log(content[0].attribs.src)
            while(content.length--) {
                var writeStream = fs.createWriteStream(`image/${content.length}.png`)
                var readStream = request(content[content.length].attribs.src)
                readStream.pipe(writeStream)
            }
        }
    })
}
getData('https://movie.douban.com/')

