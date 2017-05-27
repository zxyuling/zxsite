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

$('.list').on('click','[data-id]',function(){
    const id = $('[data-id]').attr('data-id');
    document.location.href="/doc/"+id
})

const renderList = function(res){
    res.data.forEach((item,index)=>{

        let data = {
            "id":item._id,
            "title":item.title,
            "content":item.html.replace(/<img[^>]*>/,'[图片]').replace(/<[^>]*>/g,'')
        }
        console.log(data)
        if($listBottom[0].clientWidth>$listTop[0].clientWidth){
            $listTop.append(templ(tpl,{data:data,top:1}))
        }else{
            $listBottom.append(templ(tpl,{data:data}));
        }
    })
}