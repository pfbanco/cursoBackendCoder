import fs from 'fs'

//const fs = require("fs");

//Ejemplo de contructor de producto.
class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Error: Every fild in required");
      return;
    }
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct = async (product) => {
    if(Object.keys(product).length === 0){
      console.log("Error: Product empty")
      return
    }
    const products = await this.getProducts();
    if (products.length > 0 && products.some((p) => p.code === product.code)) {
      console.log("Error: The product code already exists");
      return;
    }
    const id = this.#generarId(products);
    const newProduct = { id, ...product };
    products.push(newProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(products));
  };

  getProducts = async () => {
    if (fs.existsSync(this.path)) {
      const infoProducts = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(infoProducts);
      return products;
    } else {
      console.log("File not exist");
      return [];
    }
  };

  getProductById = async (id) => {
    const products = await this.getProducts();
    const product = products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      return "Product not found";
    }
  };

  deleteProducts = async () => {
    if (fs.existsSync(this.path)) {
      await fs.promises.unlink(this.path);
      return "Deleted products";
    } else {
      return "File not exist";
    }
  };

  deleteProductsById = async (id) => {
    const products = await this.getProducts();
    const newArray = products.filter((p) => p.id !== id);
    await fs.promises.writeFile(this.path, JSON.stringify(newArray));
  };

  updateProduct = async (id, obj) => {
    const products = await this.getProducts();
    const indexProduct = products.findIndex((p) => p.id === id);
    if (indexProduct === -1) {
      return "Product not found";
    }
    const newProduct = { ...products[indexProduct], ...obj };
    newProduct.id = id
    products.splice(indexProduct, 1, newProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(products));
  };

  #generarId = (products) => {
    let id;
    if (products.length === 0) {
      id = 1;
    } else {
      id = products[products.length - 1].id + 1;
    }
    return id;
  };
}


//PRODUCTO COMPLETO
const product1 = new Product("Producto1", "Descripcion de producto", "$2000", "No contiene", "ABC123", 30);
const product2 = new Product("Producto2", "Descripcion de producto", "$2000", "No contiene", "ABC124", 30);
const product3 = new Product("Producto3", "Descripcion de producto", "$2000", "No contiene", "ABC125", 30);
const product4 = new Product("Producto4", "Descripcion de producto", "$2000", "No contiene", "ABC126", 30);
const product5 = new Product("Producto5", "Descripcion de producto", "$2000", "No contiene", "ABC127", 30);
const product6 = new Product("Producto1", "Descripcion de producto", "$2000", "No contiene", "ABC128", 30);
const product7 = new Product("Producto2", "Descripcion de producto", "$2000", "No contiene", "ABC129", 30);
const product8 = new Product("Producto3", "Descripcion de producto", "$2000", "No contiene", "ABC1210", 30);
const product9 = new Product("Producto4", "Descripcion de producto", "$2000", "No contiene", "ABC1211", 30);
const product10 = new Product("Producto5", "Descripcion de producto", "$2000", "No contiene", "ABC1212", 30);
//PRODUCTO INCOMPLETO
//const product2 = new Product("Producto2", "$3000", "No contiene", "ABC321", 30);
//PRODUCTO CON MISMO CODIGO
//const product3 = new Product("Producto3", "Descripcion de producto", "$25000", "No contiene", "ABC123", 30);

/*async function prueba() {
  const manager = new ProductManager("Products.json");
  //AGREGAR PRODUCTOS
  await manager.addProduct(product1);
  await manager.addProduct(product2);
  await manager.addProduct(product3);
  await manager.addProduct(product4);
  await manager.addProduct(product5);
  await manager.addProduct(product6);
  await manager.addProduct(product7);
  await manager.addProduct(product8);
  await manager.addProduct(product9);
  await manager.addProduct(product10);
  //await manager.addProduct(product2);
  //await manager.addProduct(product3);

  //BUSCAR POR ID
  //await manager.getProductById(2)

  //BORRAR POR ID
  //await manager.deleteProductsById(1)

  //BORRAR TODO EL DOCUMENTO
  //await manager.deleteProducts()

  //MODIFICAR EL DOCUMENTO
  await manager.updateProduct(3,{title: 'Nuevo producto'})

  //TRAER TODOS LOS PRODUCTOS
  console.log(await manager.getProducts());
}

prueba();*/
