require('./editHeader.less');
$save = $('#j-edit-header-submit');
$save.on('click',()=>{
    const editContent = testEditor.getHTML();
    $.ajax({
        url:'/edit/save',
        method:'post',
        data:{
            editContent:editContent
        }
    })
})