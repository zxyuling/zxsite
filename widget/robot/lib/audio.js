function Audio(){
	this.file = null;
	this.fileName = null;
	this.callback = {};
	this.state = null;
	this.AC = window.AudioContext || 
						window.webkitAudioContext || 
						window.mozAudioContext || 
						window.msAudioContext
    this.raf =  window.requestAnimationFrame || 
    		   window.webkitRequestAnimationFrame || 
    		   window.mozRequestAnimationFrame || 
    		   window.msRequestAnimationFrame;
    this.audioContext = null;
}
Audio.prototype = {
	_start:function(file){
		var self = this;
		var fr = new FileReader();
		self.audioContext = null;
		self.audioContext = new self.AC();
		fr.readAsArrayBuffer(file);
		fr.onload = function(e){
			var fileResult = e.target.result; //这是读取成功得到的结果ArrayBuffer数据

	        var audioContext = self.audioContext; //从Visualizer得到最开始实例化的AudioContext用来做解码ArrayBuffer
	        window.audioContext = audioContext;
	        audioContext.decodeAudioData(fileResult, function(buffer) { //解码成功则调用此函数，参数buffer为解码后得到的结果
	            self._visualize(buffer); //调用_visualize进行下一步处理，此方法在后面定义并实现
	        }, function(e) { //这个是解码失败会调用的函数
	            console.log("!哎玛，文件解码失败:(");
	        });
		}
		self._audioListenner();
	},
	addEventLister:function(tar,callback){
		var self = this;
		self.callback = callback;
		var audioInput = $(tar)[0];
		audioInput.onchange = function() {
		    if (audioInput.files.length !== 0) {
		        self.file = audioInput.files[0]; 
		        self.fileName = self.file.name;
		        self._start(self.file); 
		    };
		};
		$('.photo').on('click',function(){
			console.log(self.audioContext.state)
			if(self.audioContext.state=='running'){
				self.audioContext.suspend();
			}else{
				self.audioContext.resume();
			}
		})
	},
	_visualize:function(buffer){
		var audioContext = this.audioContext;
		var analyser = audioContext.createAnalyser();
		var audioBufferSouceNode = audioContext.createBufferSource();
		audioBufferSouceNode.connect(audioContext.destination);
		audioBufferSouceNode.connect(analyser);
		audioBufferSouceNode.buffer = buffer;
		audioBufferSouceNode.start(0);
		this.callback['analyser'](analyser);
	},
	_audioListenner:function(){
		var self = this;
		self.audioContext.onstatechange = function(e){
			if(e.currentTarget.state=='closed'){
				self.callback['ended']();
				audioContext = null;
			}
		}
	}
}
var audio = new Audio();
module.exports = audio;