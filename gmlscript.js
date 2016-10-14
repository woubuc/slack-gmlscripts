// Require modules
const request = require('request');
const cheerio = require('cheerio');

// Helper function to format a Slack message
function slackMessage(text, url, code){

	// Basic message
	var slackMessage = {
		response_type: 'in_channel',
		text: text
	}

	// If all we need is a text message then we end here
	if(!url || !code)
		return slackMessage;

	// If code is given, add it to the message in a code block
	slackMessage.text += '\n ```' + code + '```';

	// Add a source attachment with a nice coloured border (in the orange of GMLScripts.com)
	slackMessage.attachments = [{
		color: '#FC7C13',
		fallback: 'Source: ' + url,
		text: 'Source: ' + url
	}];

	// That's it, the message is done
	return slackMessage;
}


// The actual webtask function
module.exports = function(context, cb) {

	// Check if we have a POST body
	if(!context.body)
		return cb('No body given')

	// Check if that body contains the fields we need
	if(!context.body.text || !context.body.user_name)
		return cb('Required fields: `text`, `user_name`');

	// Check if the body contains a Slack token
	if(!context.body.token)
		return cb('Authorisation missing')

	// Check if the Slack token is correct
	if(context.body.token != context.secrets.slack_token)
		return cb('Unauthorised')

	// Put the properties in appropriately named variables to make them more recognisable
	const scriptName = context.body.text;
	const userName = context.body.user_name;

	// Get the URL of the script page (on the Github-hosted mirror site, by request of the GMLScripts.com author)
	const url = 'http://gmlscripts.github.io/script/' + scriptName;

	// Load the script page
	request(url, function(err, response, data){

		// Check for request errors
		if(err)
			return cb(err);

		// If the request returned a 404 status code, the script doesn't exist
		if(response.statusCode == 404)
			return cb(null, slackMessage('GML script `' + scriptName + '` was not found'));

		// If the request returned any other status code than 200, something is wrong
		if(response.statusCode != 200)
			return cb(null, slackMessage('Could not load GML script `' + scriptName + '`'));

		// Parse the loaded HTML using Cheerio
		var $ = cheerio.load(data);

		// Get the content of the script codebox
		const code = $('.codebox.script').text();

		// Respond to the request with a nice Slack message containing the code
		cb(null, slackMessage('Here you go, ' + userName + '!', url, code));
	});
}
