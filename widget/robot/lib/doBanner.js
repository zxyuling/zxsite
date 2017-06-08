module.exports = {
    analyser:function(analyser){
        $('.banner-bg').animate({//展示画板
            opacity:0
        },1000)
        var canvas = document.getElementById('J-board'),
            cwidth = canvas.width,
            cheight = canvas.height - 2,
            meterWidth = 10, //频谱条宽度
            gap = 2, //频谱条间距
            capHeight = 2,
            capStyle = '#fff',
            meterNum = cwidth / (10 + 2), //频谱条数量
            capYPositionArray = []; //将上一画面各帽头的位置保存到这个数组
        var ctx = canvas.getContext('2d'),
        gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(1, '#0f0');
        gradient.addColorStop(0.5, '#ff0');
        gradient.addColorStop(0, '#f00');
        var drawMeter = function() {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            var step = Math.round(array.length / meterNum); //计算采样步长
            ctx.clearRect(0, 0, cwidth, cheight);
            ctx.fillStyle="#000";
            ctx.fillRect(0,0,cwidth,cheight);
            for (var i = 0; i < meterNum; i++) {
                var value = array[i * step]; //获取当前能量值
                if (capYPositionArray.length < Math.round(meterNum)) {
                    capYPositionArray.push(value); //初始化保存帽头位置的数组，将第一个画面的数据压入其中
                };
                ctx.fillStyle = capStyle;
                //开始绘制帽头
                if (value < capYPositionArray[i]) { //如果当前值小于之前值
                    ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight); //则使用前一次保存的值来绘制帽头
                } else {
                    ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight); //否则使用当前值直接绘制
                    capYPositionArray[i] = value;
                };
                //开始绘制频谱条
                ctx.fillStyle = '#d4e8ff';
                ctx.fillRect(i * 12, cheight - value + capHeight, meterWidth, cheight);
            }
            requestAnimationFrame(drawMeter);
        }
        requestAnimationFrame(drawMeter);
    },
    ended:function(){
        $('.banner-bg').animate({//展示画板
            opacity:1
        },1000)
    }
}