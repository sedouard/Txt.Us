/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var twilio_credentials = require('./twilio_credentials.json');
var twilio = require('twilio');

var client = new twilio.RestClient(twilio_credentials.twilio_sid, twilio_credentials.twilio_auth);

var g_Users = {
  christine: "+15107541837",
  livi: "+17038223932",
  kat: "+15714352171",
  matt: "+17037919734",
  steven: "+14079638488"
};

var g_Location = {
   "+15107541837" : {'m':[], 't':[],'w':[],'r':[],'f':[],'s':[]},
   "+17038223932" : {'m':[], 't':[],'w':[],'r':[],'f':[],'s':[]},
   "+15714352171" : {'m':[], 't':[],'w':[],'r':[],'f':[],'s':[]},
   "+17037919734" : {'m':[], 't':[],'w':[],'r':[],'f':[],'s':[]},
   "+14079638488": { 'm': [], 't':['The Weed Shop'], 'w': [], 'r': [], 'f': [], 's': [] }
};


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




var receive_message = function(req, res){
  console.log('hello!!!');
  var message = req.query;

  console.log(message);

  var messageArray = message.Body.split('\n');
  var from = message.From;

  if(messageArray.length < 1){
    return sendSms(from, "send a proper command!", function(){ res.send('') } );
  }
  
  for(var i = 0; i<messageArray.length; i++){
    var m = strip(messageArray[i]).toLowerCase();
    console.log('parsing message ' + m);
    //parse scheduling request
    if(m[0] === 's'){
      m = strip(m.substring(1,m.length));

      var foo = m.split(" on ");

      g_Location[from][foo[1]].push(foo[0]);

      console.log(g_Location);


    }

    //parse query
    //where is <user> on <day>
    else if (m.indexOf('where is') > -1) {
      console.log('got where is command');
      m = strip(m.replace('where is', ''));
      //steven on tuesday
      var parts = m.split(' ');
      var phoneNumber = g_Users[parts[0]];
      console.log('returning location for user ' + parts[0] + ' phone ' + phoneNumber);
      var locations = g_Location[phoneNumber];
      var result = null;
      switch(parts[2]){
        //today is always monday. HACK HACK
        case 'monday':
          result = locations.m;
          break;
        //tomorrow is always tuesday HACK HACK
        case 'tuesday':
            result = locations['t'];
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
        return sendSms(from, parts[0] + 'will be at ' + result[0], function(){ res.send('') } );
      }

      //lookup name 
    }

  }

};

var strip = function(str){
   return str.replace(/(^\s+|\s+$)/g,'');
}

var sendSms = function(number, message, cb){
  console.log("sending "+message+"to number: " + number);

  return client.sendMessage({
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
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/receive_message', receive_message);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
