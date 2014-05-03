

var twilio_credentials = require('../twilio_credentials.json');
var twilio = require('twilio');
var mongoose = require('mongoose');


var client = new twilio.RestClient(twilio_credentials.twilio_sid, twilio_credentials.twilio_auth);
var db = mongoose.createConnection('localhost', 'test', '27017');

db.once('open', function() {
  console.log("connected to mongo!");
});


var SmsSchema = new mongoose.Schema({
  number: String,
  time: String,
  location: String
});

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


var Sms = db.model('Sms', SmsSchema);

var location = {};

exports.receive_message = function(req, res){


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

var sendSms = function(number, message, cb){
  console.log("sending "+message+"to number: " + number);

  returnclient.sendMessage({
    to:number,
    from: '+17037634332',
    body: message
  }, cb)
}





