require('./robot.less')
var move = require('./lib/move');
var audio = require('./lib/audio');
var db = require('./lib/doBanner');
move('#J-robot');
audio.addEventLister('#J-audio',{analyser:db.analyser,ended:db.ended});