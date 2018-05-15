var http = require('http');

function onRequest(request,response) {
	console.log("Request received:");
	response.writeHead(200,{"Content-Type":"text/plain"});
	response.write("hello world, this is my first NodeJS APP");
	response.end();
	
}.listen(8888);