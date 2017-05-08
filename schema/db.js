const mongoose = require('mongoose');
var path = require('path');
const db = mongoose.createConnection('mongodb://127.0.0.1:27017/blog');
const glob = require('glob');
db.on('error',console.error.bind(console,'连接错误:'))
db.on('open',()=>{console.log('open Success')})
const  schemaList = glob.sync('schema/*.js');
let schemaMap = {}
 schemaList.forEach((item,index)=>{
    if(item!=='schema/db.js'){
        let basename = path.basename(item,'.js')
        let mongooseSchema =  new  mongoose.Schema(require('../'+item))
         let model = db.model('edit', mongooseSchema,'edit');
        schemaMap[basename] =model
    }
})
module.exports = schemaMap