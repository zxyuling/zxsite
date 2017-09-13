const  express = require('express');
const router = express.Router();
const editModel = require('../schema/db.js').edit
const multer = require('multer')
const upload = multer({dest:'./public/upload/'})
/* GET home page. */

router.get('/', function(req, res, next) {
    data = {
    }
  res.render('index/index', data);
});
router.get('/edit', function(req, res, next) {
    const id = req.query.id;
    if(id){
        editModel.findById(id,(err,rs)=>{
            if(err){
                res.render('edit/edit', {markdown:'',id:''});
            }
            else{
                res.render('edit/edit', {markdown:rs.markdown,id:id,title:rs.title});
            }
        })
    }else{
       res.render('edit/edit', {}); 
    }
  
});

router.post('/edit', upload.single('editormd-image-file'),function(req, res, next) {
    console.log(req.file)
    res.send({success:1,url:'/upload/'+req.file.filename})
  
});


router.post('/edit/save', function(req, res, next) {
    const id = req.body.id;
    console.log()
    new Promise((resolve,reject)=>{
        editModel.findById(id,(err,rs)=>{
            if(err){console.log(err)}
            resolve(rs)
        })
    }).then(rs=>{
        if(rs){
            editModel.update({_id:id},{
                "title":req.body.title,
                "type":req.body.type,
                "html":req.body.html,
                "markdown":req.body.markdown,
                "time":+new Date()
            },(e)=>{
                if(e){
                     console.log(e,1)
                 }else{
                    res.send({code:0,data:{msg:"保存成功"}}) 
                 }
            });
        }else{
            const mongo = new editModel({
                "title":req.body.title,
                "type":req.body.type,
                "html":req.body.html,
                "markdown":req.body.markdown,
                "time":+new Date()
            })
            mongo.save((e,r,n)=>{
                if(e){
                    console.log(e,1)
                }else{
                    res.send({code:0,data:{id:r._id,msg:"保存成功"}}) 
                }                
            })                     
        }
    })

});

router.post('/edit/get', function(req, res, next) {
    editModel.find((err,rs)=>{
        if(err){console.log(err)}
        res.send({data:rs})
    })

});
module.exports = router;
