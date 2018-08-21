// 

var fs=require('fs');
var request = require('request');

var configObj=require('./configfilelocation.json');

var realConfigObj=require(configObj.path);

function uploadZip(cb){

    //request=request.defaults({'proxy':'http://127.0.0.1:8888'})

    var formData = {
        // Pass a simple key-value pair

       
        // Pass data via Buffers
       // my_buffer: Buffer.from([1, 2, 3]),
        // Pass data via Streams
        file: fs.createReadStream(realConfigObj.rootFolder+'.zip'),
        // // Pass multiple values /w an Array
        // attachments: [
        //   fs.createReadStream(__dirname + '/attachment1.jpg'),
        //   fs.createReadStream(__dirname + '/attachment2.jpg')
        // ],
        // // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
        // // Use case: for some types of streams, you'll need to provide "file"-related information manually.
        // // See the `form-data` README for more information about options: https://github.com/form-data/form-data
        // custom_file: {
        //   value:  fs.createReadStream('/dev/urandom'),
        //   options: {
        //     filename: 'topsecret.jpg',
        //     contentType: 'image/jpeg'
        //   }
        // }
      };

      for(var k in realConfigObj.formData){
        formData[k]=realConfigObj.formData[k];
      }


      var u=realConfigObj.uploadUrl;

     // u="http://service.com/upload";
      request.post({url:u, formData: formData
            ,headers:realConfigObj.headers
    
        }, function optionalCallback(err, httpResponse, body) {
        if (err) {
          return console.error('upload failed:', err);
        }
        
        console.log('Upload successful!  Server responded with:', body);

        cb(body);

      });

}




exports.uploadZip=uploadZip;



