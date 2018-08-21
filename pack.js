// 

var copydir = require('copy-dir');
var fs = require('fs');
const fse = require('fs-extra')
var zipFolder = require('zip-folder');


var configObj = require('./configfilelocation.json');

var realConfigObj = require(configObj.path);

var pathListFile=configObj.pathListFile;


var pathStr=fs.readFileSync(pathListFile);

var pathArr=pathStr.toString().split('\r\n');



function packZip(cb) {

    var rootFolder = realConfigObj.rootFolder;


    if (fs.existsSync(rootFolder)) {
        fse.removeSync(rootFolder);
    }

    var z = rootFolder + ".zip";

    if (fs.existsSync(z)) {
        fse.removeSync(z);
    }



    // var folder=fs.readFileSync('folder.json');


    // var folderJson=JSON.parse(folder);

    //var folder=fs.readFileSync(realConfigObj.folder);

    //var folder=realConfigObj.folder;


    //var pathList=folderJson.folder;
    //var pathList = realConfigObj.folder;

    var pathList =pathArr;


    var rootFolder = realConfigObj.rootFolder;

    if (!fs.existsSync(rootFolder)) {
        fs.mkdirSync(rootFolder+ '');
    }



    for (var i = 0; i < pathList.length; i++) {

        //var p = pathList[i].path;

        var p = pathList[i];
        if(p.trim()==''){
            continue;
        }

        // var pArr=p.split('\\');
        // console.log(pArr);

        var index=p.indexOf(rootFolder+'\\');

        var rp = p.substr(index);
        rp = rootFolder + '/' + rp;

        fse.ensureDirSync(rp)


        copydir.sync(p, rp);
    }




    zipFolder(rootFolder, rootFolder + '.zip', function (err) {
        if (err) {
            console.log('oh no!', err);
        } else {
            cb();
        }
    });


}



exports.packZip = packZip;

