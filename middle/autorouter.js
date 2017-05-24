const path = require('path');
const glob = require('glob');
const  routerList = glob.sync('routes/*.js');
console.log(routerList)
 const autoRouter = (app)=>{	
 	 routerList.forEach((item,index)=>{
	       app.use('/',require('../'+item))
	       console.log(item)
	})
 }
module.exports = autoRouter