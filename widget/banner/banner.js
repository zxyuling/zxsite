require('./banner.less');
var $board = $('#J-board');
var $banner = $('#J-banner');
var boardWidth = $banner[0].clientWidth;
var boardHeight = $banner[0].clientHeight;
var ctx = $board[0].getContext("2d");
$(window).on('resize',canvasSize);
var canvasSize = function(){
	$board.attr({width:boardWidth,height:boardHeight})
}
canvasSize();
ctx.fillStyle="#000";
ctx.fillRect(0,0,boardWidth,boardHeight);
