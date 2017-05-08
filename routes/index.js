const  express = require('express');
const router = express.Router();
const editModel = require('../schema/db.js').edit

/* GET home page. */

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
    const mongo = new editModel({
        "title":req.body.title,
        "type":req.body.type,
        "content":req.body.content
    })
    mongo.save(e=>{
        console.log(e)
    })
});
module.exports = router;
