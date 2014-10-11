var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
var child_process = require("child_process");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;


var router = express.Router();

router.get('/', function(req, res) {
	res.json({message:'hooray! welcome to out api'});
});


app.use('/api', router);

app.listen(port);

    /* using spawn */
	/* create 10 worker processes*/
	// for(var i = 0; i < 10; i++) {
	// 	console.log('spawning worker: ' + i);
	// 	var ls = child_process.spawn('node', ['worker.js', i]);

	// 	ls.stdout.on('data', function(data) {
	// 		console.log('output from process ' + i + ' : ' + data);
	// 	});

	// 	ls.stderr.on('data', function(data) {
	// 		console.log('sterr: ' + data);
	// 	});

	// 	ls.on('close', function(code) {
	// 		console.log('child process exited with code: ' + code);
	// 	});

	// }

	/* using fork */
		var messages = new Array('apples', 'bananas', 'carrots', 'dog','elephant', 'fish', 'gorllia','horse', 'iguana', 'jackass');
		var delays = new Array(10000, 9000, 8000, 3000, 2000, 1000, 10000,9000,8000,500);

	for(var j = 0; j < 10; j++) {
		var child = child_process.fork('communicating-worker.js');

		//handle message from child
		child.on('message', function(m) {
			console.log('received message from child process: ' + m.id + ' result: ' + m.result);
		});	

		child.on('close', function(code){
			console.log('child process exited with code: ' + code);
		});

		child.send({'id': j, 'delay': delays[j],'value': messages[j] + j});

	}
	// var child = child_process.fork('communicating-worker.js');

	// //handle message from child
	// child.on('message', function(m) {
	// 	console.log('received message from child process: ' + m);
	// });	

	// child.send('Please upcase this string');

console.log('server running....');