import express from "express";
//import ProductManager from "./ProductManager.js";

import cartsRouter from "./routes/carts.router.js"
//import productsRouter from "./router/prodcts.router.js"
//import { __dirname } from "./utils.js"

const app = express();
const PORT = 8080



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(__dirname+"/public"))

//Routes
app.use("/api/carts", cartsRouter)
//app.use("/api/products", productsRouter)


app.get("/", (req, res) => {
  res.json("Hola a todos desde express!");
});
/*
const productManager = new ProductManager("Products.json");
app.get("/products", async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getProducts();
  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.json({ products });
  }
});

app.get("/products/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const product = await productManager.getProductById(+idProduct);
  res.json({ product });
});

app.delete("/prodcts", async (req, res) => {
  const message = await productManager.deleteProducts();
  res.json({ message });
});

app.delete("/products/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const message = await productManager.deleteProductsById(+idProduct);
  res.json({ message });
});

app.post("/products", async (req, res) => {
  const obj = req.body;
  const newProduct = await productManager.addProduct(obj);
  res.json({ message: "Product created", product: newProduct });
});

app.put("/products/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const updateProd = req.body;
  const product = await productManager.updateProduct(+idProduct, updateProd);
  res.json({ product });
});
*/
app.listen(PORT, () => {
  console.log(`ESCUCHANDO EL PUERTO ${PORT}`);
});
