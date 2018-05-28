
var exec = require('child_process').exec;

function start(callback) {
	console.log("function called\n");
	exec("bash -c 'ls -lah;'", (error,stdout,stderr) => {
		callback(['ok',stdout,stderr]);
	});
}
function printArray(arr) {
	let log ='';
	for (i=0;i<arr.length;i++) { 
		
		log += '%s\n';
		}
	console.log(log,arr);
		
}
start((ret) => {
		printArray(ret);
});
