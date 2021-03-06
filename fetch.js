const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output:process.stdout
});
var httpObj = require('http');

/* Main synchronous loop prompt for a user input */

rl.setPrompt('Fetch?> ');
rl.prompt();
rl.on('line', (line) => {
	if (line == 'y' || line == 'Y') { 
		processHttpRequest(httpObj, (status,msg) => {
			if (status == 'err') {
				console.error('ERR:[%s]',msg);	
				process.exit(1);
			} else if (status == 'ok')
			rl.setPrompt('REQUEST-RESPONSE:\n'+msg+'\nFetch?> ');
		  rl.prompt();
		});
		
	}	else rl.close();
	}).on('close',function() {
			process.exit(0);
	});
	

	function processHttpRequest(httpObj, callbackFunc) {

			try {
					httpObj.get('http://127.0.0.1:8888', (res) => {
						const {statusCode} = res;
						const contentType = res.headers['content-type'];
						let error;
							if (statusCode != 200) {
								error = new Error(statusCode);
							}
						if (error) {
							callbackFunc('err', 'Status Code '+error.message);
							//console.log('Let ERROR:'+error.message);

						}
						res.setEncoding('utf8');
						var rawData ='';
						res.on('data', (chunk) => { rawData += chunk;});
						res.on('end', () => {	
							callbackFunc('ok', rawData)});
				
					});
			} catch (e) {
					callbackFunc('err', 'HTTP GET'+e.message);
					//console.error('ERR:[http.get]:%s',e.message);

			}

}
/*var stdin = process.openStdin();

stdin.addListener('data', (d) => {
	var answer = d.toString();
	if (d.toString() == 'y') {
		console.log('You have entered %s\nRun again?', answer);
	}
	
});
stdin.addListener('end', () => {
	console.info('Quitting\n');
});
*/

		/*
		http.get('http://127.0.0.1:8888',(res) => {
			const { statusCode } = res;
			const contentType = res.headers['content-type'];
			

	let error;
	if (statusCode != 200) {
		error = new Error('Request Failed.\n' +
											`Status Code: ${statusCode}`);
	}
	if (error) {
		console.log(error.message);
	res.resume();
	return;
	}
	res.setEncoding('utf8');
	let rawData = '';
	res.on('data', (chunk) => { rawData += chunk;});
	res.on('end', () => {
		try {
			console.log(rawData);
		} catch (e) {
			console.error(e.message);
		}
	});
}).on('error', (e) => {
	console.error(`Got error: ${e.message}`);
});
*/