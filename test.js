console.log('started');
function testReturn(blabla, callback) {
	
					callback('1');
			
	};
testReturn('huy', (ret) =>{
		console.log('Executed');
		if (ret == 1)
			console.log('Success');
		else	
			console.log('fail');
	});
	