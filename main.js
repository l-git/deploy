// 


var pack=require('./pack');

var uploadZip=require('./uploadZip');


var deployProcess=require('./deployProcess');


var configObj=require('./configfilelocation.json');

var realConfigObj=require(configObj.path);

// var configFilePath=JSON.parse(configObj);

console.log('config file path:'+configObj.path);

var pp=configObj.path.split('/');

var wp='';
for(var i=0;i<pp.length-1;i++){
    wp+=pp[i]+"/";
}

console.log(wp);

process.chdir(wp);

console.log("change work directory to "+wp);



pack.packZip(function(){


    console.log('pack ok');


    uploadZip.uploadZip(function(respbody){
        for(var i=0;i<5;i++)console.log();
        console.log('=================================================================================================');

        console.log(respbody);

        console.log('=================================================================================================');
        var obj=JSON.parse(respbody);

        if(obj.code==0){
            deployProcess.uploadProcss(obj.data.channel);
        }
        
        

    });






});



