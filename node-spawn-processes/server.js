var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
var child_process = require("child_process");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;

var messages = new Array('apples', 'bananas', 'carrots', 'dog','elephant', 'fish', 'gorllia','horse', 'iguana', 'jackass');
var delays = new Array(10000, 9000, 8000, 3000, 2000, 1000, 10000,9000,8000,500);
var counter = 0;

var router = express.Router();

router.get('/', function(req, res) {
	res.json({message:'hooray! welcome to out api'});
});



router.get('/task', function(req, res) {

	if(counter > 9) {
		counter = 0;
	}

	var child = child_process.fork('communicating-worker.js');

		child.on('message', function(m) {
			console.log('received message from child process: ' + m.id + ' result: ' + m.result);

				res.json({message:m.result});

		});	

		child.on('close', function(code){
			console.log('child process exited with code: ' + code);
		});

		child.send({'id':counter, 'delay': delays[counter],'value': messages[counter] + counter});

	counter++;


//	res.json({message:'hooray! welcome to out api'});
});

app.use('/api', router);

app.listen(port);


	/* using fork */

	// for(var j = 0; j < 10; j++) {
	// 	var child = child_process.fork('communicating-worker.js');

	// 	//handle message from child
	// 	child.on('message', function(m) {
	// 		console.log('received message from child process: ' + m.id + ' result: ' + m.result);
	// 	});	

	// 	child.on('close', function(code){
	// 		console.log('child process exited with code: ' + code);
	// 	});

	// 	child.send({'id': j, 'delay': delays[j],'value': messages[j] + j});

	// }

	/* use spawn*/
	console.log('about to spwan,,,,,,');

	var spawn = child_process.spawn;
	
	//create process to run c++ code hello.C and pass in command line argument 987
	//this command line argument could be the proceess id
	var prc = spawn('./task/hello',[987]);

	console.log("Spawned child process with pid: " + prc.pid);
	
	//return the output of the c++ code
	prc.stdout.on('data', function(data){
		console.log('spawn child returns - ' +  data.toString('utf8'));
	});


console.log('server running....');