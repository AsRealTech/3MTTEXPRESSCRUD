import { items } from "../data/items.js";

//  item controller for readItem
export const readItem = (req, res) => res.json(items);

//  item controller for readItemById
export const readItemById = (req, res) => {
    const id = Number(req.params.id);
    const item = items.find(i => i.id === id);
    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
};

//  item controller for createItem
export const createItem = (req, res) => {
    const data = req.body;
    if (!data || !data.name || !data.description || typeof data.price !== "number") {
        return res.status(400).json({ message: "Invalid item data" });
    }
    const newItem = {
        id: items.length ? items[items.length - 1].id + 1 : 1,
        ...data
    };
    items.push(newItem);
    console.log("item created successfully");
    res.status(201).json(newItem);
};

//  item controller for updateItem
export const updateItem = (req, res) => {
      const id = Number(req.params.id);
      const data = req.body;
      if(!data || !data.name || !data.description || typeof data.price !== 'number'){
        return res.status(400).json({message: "invalid item data supplied"});
      };
      const itemIndex = items.findIndex(i => i.id == id);
      if(itemIndex === -1){
        return res.status(404).json({message: "failed to updata, item with the specified id not found!"});
      };

      items[itemIndex] = { ...items[itemIndex], ...data, id};
      res.json({message: `item with the id ${id} updated successfully`});
};

//  item controller for deleteItem
export const deleteItem = (req, res) => {
    const id = Number(req.params.id);
    const index = items.findIndex(i => i.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Item not found" });
    }
    const deleted = items.splice(index, 1);
    res.json({ message: "Item deleted", item: deleted[0] });
};