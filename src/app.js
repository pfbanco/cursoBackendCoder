import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const productManager = new ProductManager("Products.json");

app.get("/", (req, res) => {
  res.send("Hola a todos desde express!");
});

app.get("/products", async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getProducts();
  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.send(limitedProducts);
  } else {
    res.send({ products });
  }
});

app.get("/products/:idProduct", async (req, res) => {
	const {idProduct}  = req.params;
	const product = await productManager.getProductById(+idProduct);
	res.send({ product });
});

app.listen(8080, () => {
  console.log("ESCUCHANDO EL PUERTO 8080");
});
