require('./editHeader.less');
const tips = require('../components/tips/tips.js');
const $save = $('#j-edit-header-submit');
const $title = $('#j-edit-header-title')
const $type = $('#j-edit-header-select');
let saveing = false;
if(!saveing){
    saveing=true
    $save.on('click',()=>{
        const html = testEditor.getHTML();
        const markdown = testEditor.getMarkdown();
        const title = $title.val();
        const type = $type.val();
        if(!title){
             tips('Tips','请填写标题');
             return 
        }
        if(!markdown){
             tips('Tips','内容不能为空');
             return 
        }
        $.ajax({
            url:'/edit/save',
            method:'post',
            data:{
                markdown:markdown,
                html:html,
                type :type,
                title:title,
                id: $title.attr('data-id')
            },
            success:function(data){
                if(data.code==0){
                    if(data.data.id)
                        $title.attr({'data-id':data.data.id})
                    saveing=false;
                    tips('Success',data.data.msg);

                }
            }
        })
    })
}else{
    tips('Error','保存中。。。');
}