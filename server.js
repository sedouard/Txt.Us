
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var twilio_credentials = require('./twilio_credentials.json');
var twilio = require('twilio');

var client = new twilio.RestClient(twilio_credentials.twilio_sid, twilio_credentials.twilio_auth);


// { ToCountry: 'US',
//     ToState: 'VA',
//     SmsMessageSid: 'SMdbef8677f992a26b28df2bc4305035a9',
//     NumMedia: '0',
//     ToCity: 'VIENNA',
//     FromZip: '94546',
//     SmsSid: 'SMdbef8677f992a26b28df2bc4305035a9',
//     FromState: 'CA',
//     SmsStatus: 'received',
//     FromCity: 'HAYWARD',
//     Body: 'M: Svc\nT: SF \nW: LAS\nTh: home',
//     FromCountry: 'US',
//     To: '+17037634332',
//     ToZip: '22182',
//     MessageSid: 'SMdbef8677f992a26b28df2bc4305035a9',
//     AccountSid: 'AC50cf5db22487012e70e1eb2e4335bcba',
//     From: '+15107541837',
//     ApiVersion: '2010-04-01' }


var location = {

};

var receive_message = function(req, res){


  var message = req.query;

  console.log(message);

  var messageArray = message.Body.split('\n');
  var from = message.From;

  if(messageArray.length < 1){
    return sendSms(from, "send a proper command!", function(){ res.send('') } );
  }

  for(int i = 0; i<messageArray.length; i++){
    var m = strip(messageArray[i]).toLowerCase();

    if(m[0] === 's'){
      
    }
    
  }



};

var strip = function(str){
   return str.replace(/(^\s+|\s+$)/g,'');
}

var sendSms = function(number, message, cb){
  console.log("sending "+message+"to number: " + number);

  returnclient.sendMessage({
    to:number,
    from: '+17037634332',
    body: message
  }, cb)
}


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/receive_message', receive_message);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});




