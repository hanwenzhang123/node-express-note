//questions
What way besides a route parameter can information be passed to the server?
query string

What does a query string contain?
key value pairs

What symbol in a URL marks the beginning of a query string?
?

Given the URL
http://example.com/resource?building=42&age=40&color=salmon
What is the value of "age" in the query string?
40

Pug templates support JavaScript string interpolation.

Pug 
h1 Hi #{animal}!
h1=`Hi ${animal}!`
HTML
<h1>Hi, aardvark!</h1>
<h1>Hi, aardvark!</h1>

Pug 
h1(title='Hi ' + animal + '!') text
h1(title=`Hi ${animal}!`) text
HTML
<h1 title="Hi arrdvark!">text</h1>
<h1 title="Hi arrdvark!">text</h1>



Where are cookies stored?
on the client

What are two ways of putting data into a URL to be sent to the server?
query strings and url parameters

How do you get cookies from a client's request?
req.cookies

What happens when an object is passed into the `next` function?
Execution is passed to the next error handling middleware function

What is one of the benefits of template rendering?
it reduces repetition you would otherwise need to have in your HTML files




What overall problem does templating attempt to solve?
  How to write and reuse HTML

What overall problem do cookies attempt to solve?
  How to store data - cookies are a way to save state while working in a stateless protocol

What overall problem do redirects attempt to solve?
  How to move clients to a different URL

What overall problem do query strings attempt to solve?
  How to pass the information to the server

Where are static assets executed? 
The client executes them.
- Express doesn't understand static assets, even though it might be written in JavaScript.
- Node is what is running Express, but static assets are intended for the client.
- The client receives static assets from Express, not the other way around.

Express cannot read and execute client-side JavaScript.
Client-side JavaScript is not meant to run server-side, and Express can't understand it. 
Instead, Express just hands those files straight over to the client to be executed there.
