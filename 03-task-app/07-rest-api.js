REST API
REST stands for Representational State Transfer 
API stands for Application Programming Interface.


API is a set of tools that allow you to build software applications.
- like node, express all provide us with API -> a set of tools that allows us to build apps.
- REST API will be doing the same thing by providing us tools


Representational State Transfer 
- REST API allows clients such as a Web application to access and manipulate resources using a set of predefined operations.

//resource -> something like a user or a task.
//predefined operation -> for users and tasks like the ability to create a new task, mark a task as complete, upload a profile picture

Representational: 
- getting and working with representations of our data in the database using rest API, like fetch, manipulate, crud

State Transfer:
- the server is stateless. The state has been transferred from the server to the client.
- each request from the client, contains everything needed for the server to actually process that request.


//HTTP
Request from client made via HTTP request - GET, fetch data
  |
Server is going through the process of filling it, like going to find the data in the database
  |
Response with a status code like 200 and a JSON response with the data requested


//Creating data, deleting data and updating data.
Client POST for creating data and sending along JSON request
  |
Server confirm identify and create task
  |
Response with code like 201 along with JSON response


//Predefined Operation
CRUD (HTTP method / path of the resouces)
- Create - POST /tasks - create resource
- Read - GET /tasks - getting all our existing task data
- Read - GET /tasks/:id - paticular id we try to fetch
- Update - PATCH /tasks/:id - make a task complete when it was previously uncomplete
- Delete - DELETE /tasks/:id - delete the specific individual task by id


what is getting sent back and forth between the client and the server?
  -> Just text

//the structure of an HTTP request is text (key value pairs) based
1st line is request line: HTTP method being used, the path, and the HTTP protocol
  1 - Accept: we are expecting Json data back, which is what we will get like "application/json"
  2 - Connection: like "Keep-Alive", keep connection open to keep things fast
  3 - Authorization: setup authentication
request body: when we post data, we have to provide in JSON format

//the structure of an HTTP response similar to request
1st line is response line: protocol followed by the status code, followed by a text representation of the status code.
  1 - Date: date and time
  2 - Server: like "Express"
  3 - Content-Type: the metadata about what is repsonse body looks like below like "application/json"
repsonse body: get repsonse body JSON in the response for the request we pass over to the server 
   
 
