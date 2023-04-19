import fs from "fs";

//Ejemplo de contructor de producto.
class Product {
  constructor(
    title,
    description,
    price,
    thumbnail,
    code,
    status,
    category,
    stock
  ) {
    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      !status ||
      !category ||
      !stock
    ) {
      console.log("Error: Every fild in required");
      return null;
    }
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.status = status;
    this.category = category;
    this.stock = stock;
  }
}

export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct = async (product) => {
    Object.assign(new Product(), product);
    if (Object.keys(product).length != 8) return;
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
      return null;
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
    if (products.length == newArray.length) {
      return "Product does not exist";
    } else {
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return "Product deleted";
    }
  };

  updateProduct = async (id, obj) => {
    const products = await this.getProducts();
    const indexProduct = products.findIndex((p) => p.id === id);
    if (indexProduct === -1) {
      return "Product not found";
    }
    const newProduct = { ...products[indexProduct], ...obj };
    newProduct.id = id;
    products.splice(indexProduct, 1, newProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(products));
    return "Product update";
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
/*const product1 = new Product(
  "Producto1",
  "Descripcion de producto",
  "$2000",
  "No contiene",
  "ABC123",
  30
);
const product2 = new Product(
  "Producto2",
  "Descripcion de producto",
  "$2000",
  "No contiene",
  "ABC124",
  30
);
const product3 = new Product(
  "Producto3",
  "Descripcion de producto",
  "$2000",
  "No contiene",
  "ABC125",
  30
);
const product4 = new Product(
  "Producto4",
  "Descripcion de producto",
  "$2000",
  "No contiene",
  "ABC126",
  30
);
const product5 = new Product(
  "Producto5",
  "Descripcion de producto",
  "$2000",
  "No contiene",
  "ABC127",
  30
);
const product6 = new Product(
  "Producto1",
  "Descripcion de producto",
  "$2000",
  "No contiene",
  "ABC128",
  30
);
const product7 = new Product(
  "Producto2",
  "Descripcion de producto",
  "$2000",
  "No contiene",
  "ABC129",
  30
);
const product8 = new Product(
  "Producto3",
  "Descripcion de producto",
  "$2000",
  "No contiene",
  "ABC1210",
  30
);
const product9 = new Product(
  "Producto4",
  "Descripcion de producto",
  "$2000",
  "No contiene",
  "ABC1211",
  30
);
const product10 = new Product(
  "Producto5",
  "Descripcion de producto",
  "$2000",
  "No contiene",
  "ABC1212",
  30
);*/
