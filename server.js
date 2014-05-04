/**
 * Module dependencies.
 */

<<<<<<< HEAD
=======

>>>>>>> 57b1e64292e2c376926f7a44b63884f9bf399b32
var express = require('express');
var http = require('http');
var path = require('path');
var twilio_credentials = require('./twilio_credentials.json');
var twilio = require('twilio');

<<<<<<< HEAD
var client = new twilio.RestClient(twilio_credentials.twilio_sid, twilio_credentials.twilio_auth);

var g_Users = {
  christine: "+15107541837",
  livi: "+17038223932",
  kat: "+15714352171",
  matt: "+17037919734"
};

var g_Location = {
   "+15107541837" : {'m':[], 't':[],'w':[],'r':[],'f':[],'s':[]},
   "+17038223932" : {'m':[], 't':[],'w':[],'r':[],'f':[],'s':[]},
   "+15714352171" : {'m':[], 't':[],'w':[],'r':[],'f':[],'s':[]},
   "+17037919734" : {'m':[], 't':[],'w':[],'r':[],'f':[],'s':[]}
};
=======

var client = new twilio.RestClient(twilio_credentials.twilio_sid, twilio_credentials.twilio_auth);


>>>>>>> 57b1e64292e2c376926f7a44b63884f9bf399b32


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




<<<<<<< HEAD
var receive_message = function(req, res){


  var message = req.query;

  console.log(message);

  var messageArray = message.Body.split('\n');
  var from = message.From;

  if(messageArray.length < 1){
    return sendSms(from, "send a proper command!", function(){ res.send('') } );
  }

  for(var i = 0; i<messageArray.length; i++){
    var m = strip(messageArray[i]).toLowerCase();

    //parse scheduling request
    if(m[0] === 's'){
      m = strip(m.substring(1,m.length));

      var foo = m.split(" on ");

      g_Location[from][foo[1]].push(foo[0]);

      console.log(g_Location);


    }

    //parse query
    //where is <user> on <day>
    else if(m == 'where is'){
      m = strip(m.replace('where is', ''));
      //steven on tuesday
      var parts = m.split(' ');
      var phoneNumber = g_Users[parts[0]];
      var locations = g_Location[phoneNumber];
      var result = null;
      switch(parts[2]){
        //today is always monday. HACK HACK
        case 'monday':
          result = locations.m;
          break;
        //tomorrow is always tuesday HACK HACK
        case 'tuesday':
          result = locations.t;
          break;
        case 'wednesday':
          result = locations.w;
          break;
        case 'thursday':
          result = locations.r;
          break;
        case 'friday':
          result = locations.f;
          break;
        case 'saturday':
          result = locations.s;
          break;
      }

      if(result == null){
        return sendSms(from, "send a proper command!", function(){ res.send('') } );  
      }
      else{
        return sendSms(from, parts[0] + 'will be at ' + result, function(){ res.send('') } );
      }

      //lookup name 
    }

  }


  return sendSms(from, "location saved!", function(){ res.send('') } );

};

var strip = function(str){
   return str.replace(/(^\s+|\s+$)/g,'');
}
=======
var location = {};


var receive_message = function(req, res){




  var message = req.query;


  console.log(message);


  var messageArray = message.Body.split(':');


  if(messageArray.length !== 3){
    return sendSms(message.From, "Invalid message", function(){ res.send('') } );
  }


  switch(messageArray[0]){
    case 's':




      break;
    case 'r':


      break;
    default:
      return sendSms(message.From, "Invalid command", function(){ res.send('') } );
  }


  var sms = new Sms({
    number: String,
    time: Date,
    location: String
  });






};

>>>>>>> 57b1e64292e2c376926f7a44b63884f9bf399b32

var sendSms = function(number, message, cb){
  console.log("sending "+message+"to number: " + number);

<<<<<<< HEAD
  return client.sendMessage({
=======

  returnclient.sendMessage({
>>>>>>> 57b1e64292e2c376926f7a44b63884f9bf399b32
    to:number,
    from: '+17037634332',
    body: message
  }, cb)
}

<<<<<<< HEAD

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
app.use(express.static(path.join(__dirname, 'public')));

=======



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


>>>>>>> 57b1e64292e2c376926f7a44b63884f9bf399b32
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

<<<<<<< HEAD
app.get('/receive_message', receive_message);
=======

app.get('/receive_message', receive_message);


>>>>>>> 57b1e64292e2c376926f7a44b63884f9bf399b32


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});




