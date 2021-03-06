var http = require('http');
var url = require("url");
var fs	=	require('fs');


/*simple object dive-in*/
function fetchObject(obj) {
	for (var key in obj) {
		var val=obj[key];
		if (val != null)
			if (typeof(val)=='string')
				return val;
			else if (typeof(val) == 'integer')
				return val.toString();
			else if (typeof(val) == 'object')
				return fetchObject(val);
			else 
				return null;
	}
}
/*module function */
function start() {
	console.log("SERVER STARTED");
	function onRequest(request,response) {
		var pathname = url.parse(request.url).pathname;
		//var query = url.parse(request.url).query;
		
		console.log("Request %s received\nDate: %s", request.url, Date());
		for (var key in request) {
			var  reqVal=request[key];
			var  _reqVal = fetchObject(reqVal);
				if (typeof _reqVal !== 'undefined' ) console.log("%s:%s",key,_reqVal);
		}
		
		response.writeHead(200,{"Content-Type":"text/html"});
		try {
			var content = fs.readFileSync('head.html');

			content += fs.readFileSync('file.txt');
			content += fs.readFileSync('foot.html');
			response.write(content);
		} catch (e) {
				response.write('<html>ERROR PROCESSING FILE<p>'+e.message+'</p>');
		}
		//response.write("hello world, this is my first NodeJS APP");
		response.end();
		
	}

http.createServer(onRequest).listen(8888);
	}

	/* exports */
	exports.start = start;
