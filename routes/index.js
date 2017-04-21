const  express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS')
/* GET home page. */
db.on('error',console.error.bind(console,'连接错误:'))
db.on('open',()=>{console.log('open Success')})
router.get('/', function(req, res, next) {
	data = {
	}
  res.render('index/index', data);
});
router.get('/edit', function(req, res, next) {
	data = {
	}
  res.render('edit/edit', data);
});

router.post('/edit/save', function(req, res, next) {
	const mongooseSchema = new  mongoose.Schema({a:{type:'String'}})
	const model =  db.model('NodeJS1', mongooseSchema);
	const mongo = new model({"b":'123'})
	mongo.save(e=>{
		console.log(e)
	})
});
module.exports = router;
