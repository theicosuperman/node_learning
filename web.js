var http = require('http');
function fetchObject(obj) {
	for (var key in obj) {
		var val=obj[key];
		if (val != null)
			if (typeof(val)=='string')
				return val;
			else if (typeof(val) == 'object')
				return fetchObject(val);
			else 
				return null;
	}
}
http.createServer(function(request,response) {
	console.log("Request received");
	for (var key in request) {
		var  reqVal=request[key];
			console.log("Key:"+key+"Value:"+fetchObject(reqVal));
	}
	response.writeHead(200,{"Content-Type":"text/plain"});
	response.write("hello world, this is my first NodeJS APP");
	response.end();
	
}).listen(8888);