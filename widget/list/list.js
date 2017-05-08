require('./list.less');
require('./tmpl/item.less');
var tpl = require('./tmpl/item.ejs');
var $listTop  = $('.list-top');
var $listBottom = $('.list-bottom');
$.ajax({
    url:"./edit/get",
    method:"post",
    success:(res)=>{
        renderList(res);
    }
})

const renderList = function(res){
    res.data.forEach((item,index)=>{
        let data = {
            "title":item.title,
            "content":item.content.replace(/<img[^>]*>/,'[图片]').replace(/<[^>]*>/g,'')
        }
        if($listBottom[0].clientWidth>$listTop[0].clientWidth){
            $listTop.append(templ(tpl,{data:data,top:1}))
        }else{
            $listBottom.append(templ(tpl,{data:data}));
        }
    })
}