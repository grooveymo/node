process.on('message', function(arg) {

	function pause(millis) {
		var date = new Date();
		var curDate = null;

		do{
			curDate = new Date();
		}
		while(curDate - date < millis);
	};

	//Do work
	m = arg.value.toUpperCase();
	console.log('worker ' + arg.id + ' executing');

	pause(arg.delay);
	
	//pass results back to parent process
	process.send({'id':arg.id, 'result': m});

	process.exit();

});

