const editModel = require('../schema/db.js').edit
const  express = require('express');
const router = express.Router();
router.get('/doc', function(req, res, next) {
    editModel.find((err,rs)=>{
        if(err){console.log(err)}
        res.render('doc/doc',{data:rs[0]})
    })

});
module.exports = router;