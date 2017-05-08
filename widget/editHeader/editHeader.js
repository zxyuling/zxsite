require('./editHeader.less');
$save = $('#j-edit-header-submit');
$title = $('#j-edit-header-title')
$type = $('#j-edit-header-select');
$save.on('click',()=>{
    const content = testEditor.getHTML();
    const title = $title.val();
    const type = $type.val();
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