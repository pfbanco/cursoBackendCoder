import express from "express";
import { __dirname } from "./utils.js";
import handlenbars from "express-handlebars";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/viewsRouter/views.router.js";
import { Server } from "socket.io";
import { ProductManager } from "./controllers/ProductManager.js";

const app = express();
const PORT = 8080;
const productManager = new ProductManager(__dirname + "/db/Products.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//CONFIGURAR HANDLEBARS
app.engine("handlebars", handlenbars.engine({defaultLayout: "main.handlebars", layoutsDir: __dirname+"/views/layout"}));
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//ROUTES
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`ESCUCHANDO EL PUERTO ${PORT}`);
});

//SOCKET

const socketServer = new Server(httpServer)

socketServer.on("connection", async socket =>{
  const products = await productManager.getProducts()
  socket.emit("products", products)

  socket.on("newProduct", async product => {
    await productManager.addProduct(product);
    socket.emit("products", products);
  });

  socket.on("deleteProduct", async id => {
    await productManager.deleteProductsById(id);
    socket.emit("products", products)
	});

})
