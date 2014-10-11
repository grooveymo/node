README
-------

Sample code demonstrating how to get node to spawn processes each of which may be in a non-node language
i.e. c++, python executables.

C++ code is found in task/ 

to compile, use native g++ compiler, i.e.

	g++ hello.C -o hello

this will produce executable with name

	hello (no suffix)

Suggestions
------------
Modify the code

1.)	- pass pid from server.js to process instance (i.e. hello) 
	  could use process.stdin.write 
	  see 
	  	- http://stackoverflow.com/questions/26032492/how-to-send-message-from-node-js-to-c-code
	  	- http://stackoverflow.com/questions/19961193/nodejs-child-process-stdin-write-no-callback		

2.) - for each web service request, spawn process which runs c++/python code passing to it
      pid and some command line paramter passed from request params. The response is then returned
      to client
      see

      	**** This ref is good as it shows how to return the c++ response back to original client over http ***************
      	*																												 *	
      	*    -http://stackoverflow.com/questions/17675101/node-js-pass-handle-of-response-object-handle-to-child-process *
      	*																												 *	
      	**** This ref is good as it shows how to return the c++ response back to original client over http ***************


ref
	- http://stackoverflow.com/questions/5775088/is-it-possible-to-execute-an-external-program-from-within-node-js
	- http://stackoverflow.com/questions/17156799/node-js-child-process-spawn-process-runs-but-events-dont-fire
	- http://stackoverflow.com/questions/18243810/handling-chunked-responses-from-process-stdout-data-event
	- http://stackoverflow.com/questions/26032492/how-to-send-message-from-node-js-to-c-code
	- http://stackoverflow.com/questions/19961193/nodejs-child-process-stdin-write-no-callback