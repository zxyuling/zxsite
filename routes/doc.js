const editModel = require('../schema/db.js').edit
const  express = require('express');
const router = express.Router();
router.get('/doc/:id', function(req, res, next) {
    editModel.findById(req.params.id,(err,rs)=>{
        if(err||!rs){
        	res.render('re/400',{})
        }else{
        	res.render('doc/doc',{data:rs})
        }
        
        
    })

});
module.exports = router;