My Express.js REST API
A simple Express.js app demonstrating routing, 404 handling, and error middleware.

Setup Instructions

git clone https://github.com/AsRealTech/restapi.git
cd restapi
npm install
npm start

Server will run at http://localhost:5000

API Routes

1. GET /items
Returns a hello world message.

Request:

GET /items HTTP/1.1
Host: localhost:5000

Response (HTTP 200):

{
  "message": "Hello World!"
}


2. GET /itemserror

Simulates a server error.

Request:

GET /itemserror HTTP/1.1
Host: localhost:5000

Response (HTTP 500):

{
  "error": "Intentional server error",
  "status": 500
}

3. Invalid Route Example

Request:

GET /items/unknown HTTP/1.1
Host: localhost:5000


Response (HTTP 404):

{
  "error": "Route not found",
  "status": 404,
  "path": "/items/unknown"
}

Testing with Postman

1. Open Postman.
2. Use GET http://localhost:5000/items
3. Test GET http://localhost:5000/itemserror for error handling.
4. Test any unknown route like GET http://localhost:5000/items/404test

## API Endpoints

- *GET /* – Returns "Hello, World!"
- *GET /items* – Retrieves all items
- *GET /items/:id* – Retrieves a single item by ID
- *POST /items* – Creates a new item (requires name, description, price)
- *PUT /items/:id* – Updates an item by ID
- *DELETE /items/:id* – Deletes an item by ID

Built With:

Node.js
Express js