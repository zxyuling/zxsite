require('./tips.less');
const  tpl = require('./tmpl/tips.ejs');
module.exports = function(type,content){
	const $tips = $('#j-tips')
	if($tips){
		$tips.remove();
	}
	$('body').append(templ(tpl,{content:content,type:type}))
	$('#j-tips').animate({
		top:"30px"
	},()=>setTimeout(()=>{
		$('#j-tips').fadeOut(300,()=>$('#j-tips').remove());
	},1000));
}