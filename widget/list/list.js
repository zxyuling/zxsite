require('./list.less');
require('./tmpl/item.less');
var tpl = require('./tmpl/item.ejs');
var $listTop  = $('.list-top');
var $listBottom = $('.list-bottom');
var str = '標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題標題';
for(var i=0; i<20;i++){
	var data={
		'title':str.substring(0,parseInt(Math.random()*10+5)),
		'subtitle':'子標題子標題子標題子標題子標題',
		'content':'内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
	};
	if($listBottom[0].clientWidth>$listTop[0].clientWidth){
		$listTop.append(templ(tpl,{data:data,top:1}))
	}else{
		$listBottom.append(templ(tpl,{data:data}));
	}
}