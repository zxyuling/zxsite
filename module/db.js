const  settings = require('../setting');
const  Db		 = require('mongodb').Db;
const Connection=require('mongodb').Connection;
const Server	 = require('mongodb').Server;
const settings=
{
	cookieSecret:'microblogbyvoid',
	db:'microblog',
	host:'localhost',
	port:'27017'
};
function conn(con_del)
{
	var server = new Server(settings.host,settings.port,{auto_reconnect:'ture'});
	var db = new Db(settings.db,server,{safe:'ture'});
	db.open(con_del);


}

exports.conn=conn;
