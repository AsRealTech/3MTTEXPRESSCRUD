import express from "express";
import itemsRoutes from "./routes/itemsRoutes.js";

const PORT = process.env.PORT || 5000;
const app  = express();
app.use(express.json());

const middleWare = function(req, res, next){
    console.log(' is middleware function in action');
    next();
};
app.use(middleWare);

app.get('/', (req, res) => {
    res.send("Hello, World");
});

app.use("/items", itemsRoutes);

//  middleware to handlie invalid route

app.use((req, res, next) => {
    const reqUrl = req.originalUrl;
    return res.status(404).json({message: `404 error route not found ${reqUrl}`})
});

// middleWare to handle general Error

app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({  "error": "Intentional server error",
  "status": 500});
})


app.listen(PORT, console.log(`server is running on http://localhost:${PORT}`));