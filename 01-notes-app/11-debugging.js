//Debugging Node.js
- console.log() to see the value 
- node debugger, just type "debugger" where you want to stop the application
- chrome dev tool using "debugger"

//Error Messages
Stack trace
- a report of the active stack frames at a certain point in time during the execution of a program
e.g. ReferenceError: dataJSON is not defined

There are three main types of errors that can occur while compiling a JavaScript program: 
- syntax errors:  incorrect in the syntax of the program body raises this error.
- runtime errors: occur during the runtime of the program after it is interpreted by the compiler.
- logical errors: statement is correct with respect to its syntax but is logically incorrect. 

Uncaught TypeError: Cannot read property
TypeError: ‘undefined’ is not an object
TypeError: null is not an object
(unknown): Script error
TypeError: Object doesn’t support property
TypeError: ‘undefined’ is not a function
Uncaught RangeError
TypeError: Cannot read property ‘length’
Uncaught TypeError: Cannot set property
ReferenceError: event is not defined

A ReferenceError occurs when you try to use a variable that does not exist at all.
A TypeError occurs when the variable exists, but the operation you are trying to perform is not appropriate for the type of value it contains. 

EvalError: Raised when the eval() functions is used in an incorrect manner.
RangeError: Raised when a numeric variable exceeds its allowed range.
ReferenceError: Raised when an invalid reference is used.
SyntaxError: Raised when a syntax error occurs while parsing JavaScript code.
TypeError: Raised when the type of a variable is not as expected.
strong text URIError: Raised when the encodeURI() or decodeURI() functions are used in an incorrect manner.

  
