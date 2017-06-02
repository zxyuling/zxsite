module.exports = {
	urlparse:function(router){
		const url = document.location.href;		
		const tarReg = /:([^:]*):/g;
		const reg = new RegExp(router.replace(tarReg,'([\\s\\S]*)'));
		const result  = reg.exec(url);
		let data={};
		for(let i=1,tar;tar = tarReg.exec(router);i++){
			data[tar[1]] = result[i]
		}
		return data;
	}
}