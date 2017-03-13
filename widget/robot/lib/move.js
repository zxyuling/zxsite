function move(tar,listen)
	{
		var $tar = $(tar);
		var $nTar = $tar[0];
		$tar.on('mousedown',mouseDown);
		var bodyCss = window.getComputedStyle(document.body);
		var bodyWidth = document.body.offsetWidth+parseInt(bodyCss.marginLeft)+parseInt(bodyCss.marginRight);
		var bodyHeight = window.innerHeight>document.body.offsetHeight?window.innerHeight:document.body.offsetHeight;
		var firstMouseX = 0;
		var firstMouseY = 0;
		var firstTarX = 0;
		var firstTarY = 0;
			 console.log(bodyHeight)
		function mouseDown(event)
		{
			$(document).on('mousemove',mouseMove);
			$(document).on('mouseup',mouseUp);
			$('body').addClass('user-select');
			firstMouseX = event.pageX;
			firstMouseY = event.pageY;
			var $nTarCss = window.getComputedStyle($nTar);
			firstTarX= $nTar.offsetLeft-parseInt($nTarCss.marginLeft);
			firstTarY = $nTar.offsetTop-parseInt($nTarCss.marginTop);
			console.log('down')
		}
		function mouseUp()
		{
			$(document).unbind('mousemove',mouseMove)
			$(document).unbind('mouseup',mouseUp)
			$('body').removeClass('user-select');
		}

		function mouseMove(event)
		{

			var mouseX = event.pageX;
			var mouseY = event.pageY;
			var offsetX = mouseX - firstMouseX;
			var offsetY = mouseY - firstMouseY;
			var $nTarCss = window.getComputedStyle($nTar);		
			$nTar.style.left = (firstTarX+offsetX)+'px';
			$nTar.style.top = (firstTarY+offsetY)+'px';
			if($nTar.offsetLeft<0)
				$nTar.style.left = parseInt($nTar.style.left)-$nTar.offsetLeft+'px';
			if($nTar.offsetLeft+$nTar.offsetWidth>bodyWidth)
				$nTar.style.left = bodyWidth-$nTar.offsetWidth+parseInt($nTarCss.left)-$nTar.offsetLeft+'px';
			if($nTar.offsetTop<0)
				$nTar.style.top = parseInt($nTar.style.top)-$nTar.offsetTop+'px';
			if($nTar.offsetTop+$nTar.offsetHeight>bodyHeight)
			 	$nTar.style.top = bodyHeight-$nTar.offsetHeight+parseInt($nTarCss.top)-$nTar.offsetTop+'px';

		}
	} 

	module.exports= move;