// import express from "express";
import { Router } from "express";
import { readItem, readItemById, createItem, updateItem, deleteItem } from "../controllers/itemsController.js";

const router = Router();

// this reads all items
router.get('/', readItem);

// this route reads item by Id
router.get("/:id", readItemById);

// this route to create new item
router.post('/', createItem);

// this route to put item

router.put('/:id', updateItem);

// this route to delete item
router.delete("/:id", deleteItem);

export default router;