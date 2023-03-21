import { Router } from "express";
import { ProductManager } from "../ProductManager.js";
import { __dirname } from "../utils.js";

const router = Router();
const productManager = new ProductManager(__dirname + "/Products.json");

const products = [];

//OBTENER PRODUCTOS
router.get("/", async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getProducts();
  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.json({ products });
  }
});

router.get("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const product = await productManager.getProductById(+idProduct);
  res.json({ product });
});

//CREAR PRODUCTO
router.post("/", async (req, res) => {
  const obj = req.body;
  const newProduct = await productManager.addProduct(obj);
  res.json({ message: "Product created", product: newProduct });
});

//ACTUALIZAR PRODUCTO
router.put("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const updateProd = req.body;
  const product = await productManager.updateProduct(+idProduct, updateProd);
  res.json({ product });
});

//BORRAR PRODUCTOS
router.delete("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const message = await productManager.deleteProductsById(+idProduct);
  res.json({ message });
});

export default router;
