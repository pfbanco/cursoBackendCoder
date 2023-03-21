import { Router } from "express";
import { CartManager } from "../CartManager.js";
import { __dirname } from "../utils.js";

const router = Router();
const cartManager = new CartManager(__dirname + "/Carts.json");

router.get("/", (req, res) => {
  res.send("CARRITO");
});

//CREAR CARRITO
router.post("/", async (req, res) => {
  const newCart = await cartManager.createCart();
  res.json({ cart: newCart });
});

//BUSCAR UN CARRITO
router.get("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  const cart = await cartManager.getCart(+idCart);
  res.json({ cart });
});

//AGREGAR PRODUCTO A UN CARRITO
router.post("/:idCart/product/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;
  const addProduct = await cartManager.addProductsToCart(+idCart, +idProduct);
  res.json({ message: addProduct });
});

//router.put();

//router.delete();

export default router;
