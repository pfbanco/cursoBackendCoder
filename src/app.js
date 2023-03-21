import express from "express";
import cartsRouter from "./routes/carts.router.js"
import productsRouter from "./routes/products.router.js"

const app = express();
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/carts", cartsRouter)
app.use("/api/products", productsRouter)

app.get("/", (req, res) => {
  res.json("Hola a todos desde express!");
});

app.listen(PORT, () => {
  console.log(`ESCUCHANDO EL PUERTO ${PORT}`);
});
