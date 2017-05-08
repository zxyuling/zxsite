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
        if(e){console.log(e,1)}
    })
    res.send('save ok')
});

router.post('/edit/get', function(req, res, next) {
    editModel.find((err,rs)=>{
        if(err){console.log(err)}
        res.send({data:rs})
    })

});
module.exports = router;
