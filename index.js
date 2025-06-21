// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store
let items = [];
let nextId = 1;

// Root route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Validation helper
function validateItem(data) {
  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    return 'Name is required and must be a non-empty string.';
  }
  if (!data.description || typeof data.description !== 'string' || data.description.trim() === '') {
    return 'Description is required and must be a non-empty string.';
  }
  return null;
}

// GET /items - retrieve all items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET /items/:id - retrieve item by ID
app.get('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

// POST /items - create a new item
app.post('/items', (req, res) => {
  const error = validateItem(req.body);
  if (error) {
    return res.status(400).json({ error });
  }
  const newItem = {
    id: nextId++,
    name: req.body.name.trim(),
    description: req.body.description.trim(),
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT /items/:id - update item by ID
app.put('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const error = validateItem(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  items[itemIndex] = {
    id,
    name: req.body.name.trim(),
    description: req.body.description.trim(),
  };
  res.json(items[itemIndex]);
});

// DELETE /items/:id - delete item by ID
app.delete('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  const deleted = items.splice(itemIndex, 1);
  res.json(deleted[0]);
});

// 404 handler for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
