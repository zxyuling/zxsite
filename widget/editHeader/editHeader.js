require('./editHeader.less');
const tips = require('../components/tips/tips.js');
$save = $('#j-edit-header-submit');
$title = $('#j-edit-header-title')
$type = $('#j-edit-header-select');
$save.on('click',()=>{
    const content = testEditor.getHTML();
    const title = $title.val();
    const type = $type.val();
    if(!title){
         tips('Tips','请填写标题');
         return 
    }
    if(!content){
         tips('Tips','内容不能为空');
         return 
    }
    $.ajax({
        url:'/edit/save',
        method:'post',
        data:{
            content:content,
            type :type,
            title:title
        }
    })
})