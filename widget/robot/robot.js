require('./robot.less')
const move = require('./lib/move');
const audio = require('./lib/audio');
const db = require('./lib/doBanner');
const Robot = $('#J-robot');
const title = $('#J-robot');
const utils = require('../components/utils/index');
move('#J-robot');
const readPage = function(){
    return GlobalInfo.page
}
console.log(readPage())
switch(readPage()){
    case 'index':
        $('#J-audio').style.zIndex=1;
        audio.addEventLister('#J-audio',{analyser:db.analyser,ended:db.ended});
        break;
    case 'doc':
    console.log(1)
        const id = utils.urlparse('/doc/:id:').id
        Robot.on('click',function(){
            document.location.href = '/edit?id='+id;
        });
}