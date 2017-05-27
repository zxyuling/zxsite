const editModel = require('../schema/db.js').edit
const  express = require('express');
const router = express.Router();
router.get('/catalog', function(req, res, next) {
    editModel.find((err,rs)=>{
        if(err){console.log(err)}
        	console.log(rs)
        res.render('catalog/catalog',{data:rs})
    })

});
module.exports = router;