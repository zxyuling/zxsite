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
switch(readPage()){
    case 'index':
        $('#J-audio')[0].style.zIndex=1;
        $('.explain')[0].style.display="block";
        audio.addEventLister('#J-audio',{analyser:db.analyser,ended:db.ended});
        break;
    case 'doc':
        const id = utils.urlparse('/doc/:id:').id
        Robot.on('click',function(){
            document.location.href = '/edit?id='+id;
        });
}