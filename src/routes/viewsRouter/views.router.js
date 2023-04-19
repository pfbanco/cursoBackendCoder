import { Router } from "express";
import { ProductManager } from "../../controllers/ProductManager.js";
import { __dirname } from "../../utils.js";

const router = Router();
const productManager = new ProductManager(__dirname + "/db/Products.json");

//HOME

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("index", {products});
});

/*router.get("/", async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getProducts();
  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.render("index", { products });
  }
});*/

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts", { products });
});

export default router;
