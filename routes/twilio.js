

var twilio_credentials = require('../twilio_credentials.json');

var twilio = require('twilio');
var client = new twilio.RestClient(twilio_credentials.twilio_sid, twilio_credentials.twilio_auth);

var messages = [];

exports.receive_message = function(req, res){

	messages.push(req.query);
	console.log(messages);

	res.send('');
};

exports.retrieve_messages = function(req, res){
	return res.json(messages);
};



/*
 * GET home page.
 */

exports.index = function(req, res){

	client.sms.messages.list(function(error, data){

		if(!error){
			data.messages.forEach(function(message) {
				console.log(message.Body);
			});
		}

		res.render('index', {});

	});

};






