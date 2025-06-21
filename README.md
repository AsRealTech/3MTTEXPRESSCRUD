# Simple Items API

## Setup

1. Clone repo
2. Run `npm install`
3. Run `node index.js` (or `npm start` if you add a start script)

## API Endpoints

- `GET /`  
  Returns "Hello, World!"

- `GET /items`  
  Returns all items.

- `GET /items/:id`  
  Returns single item by ID.  
  - 404 if item not found.

- `POST /items`  
  Create a new item.  
  Body JSON:  
  ```json
  {
    "name": "Item Name",
    "description": "Item Description"
  }
