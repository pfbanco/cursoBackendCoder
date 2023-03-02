/*class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    const id =
      this.products.length === 0
        ? 1
        : this.products[this.products.length - 1].id + 1;

    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log("Error: Every fild in required");
      return;
    }
    if (this.products.some((p) => p.code === product.code)) {
      console.log("Error: The product code already exists");
      return;
    }

    const newProduct = {
      id,
      ...product
    };
    this.products.push(newProduct);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((prod) => prod.id === id);
    //product ? product : console.log("Error: Product not found");}
     if (product) {
      return product;
    } else {
      console.log("Error: Product not found");
    }
  }
}

const productoNuevo1 = new ProductManager();
console.log(productoNuevo1)
//Muestro el array vacio.

productoNuevo1.addProduct({ title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25});
productoNuevo1.addProduct({ title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25});
//Cargo con el mismo codigo para comprobar mensaje de error.
productoNuevo1.addProduct({ description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25});
//Cargo sin un elemento para comprobar mensaje de error.

productoNuevo1.addProduct({ title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc321', stock: 25});
productoNuevo1.addProduct({ title: 'producto prueba', description: 'Elemento para traer con getProductById', price: 200, thumbnail: 'Sin imagen', code: 'abc000', stock: 25});
console.log(productoNuevo1.getProducts());
//Cargo un nuevo producto y traigo todos.

console.log(productoNuevo1.getProductById(4));
//Llamo un id inexistente para comprobar mensaje de error.

console.log(productoNuevo1.getProductById(3));
//Traigo un elemento con getProductByID.
*/

const fs = require("fs");

//const path = "Usuarios.json";

class ManagerUsuarios {
  constructor(path) {
    this.path = path;
  }

  consultarUsuarios = async () => {
    if (fs.existsSync(this.path)) {
      const infoArchivo = await fs.promises.readFile(this.path, "utf-8");
      const usuarios = JSON.parse(infoArchivo);
      return usuarios;
    } else {
      console.log("Archivo no existe");
      return [];
    }
  };

  consultarUsuariosById = async (id) => {
    const usuarios = await this.consultarUsuarios();
    const user = usuarios.find((u) => u.id === id);
    if (user) {
      return user;
    } else {
      return "User not found";
    }
  };

  crearUsuario = async (usuario) => {
    const usuarios = await this.consultarUsuarios();
    const id = this.#generarId(usuarios);
    const nuevoUsuario = { id, ...usuario };
    usuarios.push(nuevoUsuario);
    await fs.promises.writeFile(this.path, JSON.stringify(usuarios));
    return nuevoUsuario;
  };

  eliminarUsuarios = async () => {
    if (fs.existsSync(this.path)) {
      await fs.promises.unlink(this.path);
      return 'Usuarios eliminados';
    } else {
      return 'No existe este archivo';
    }
  };

  eliminarUsuariosById = async (id) => {
    const usuarios = await this.consultarUsuarios();
    const arrayNuevo = usuarios.filter(u=>u.id !== id)
    await fs.promises.writeFile(this.path, JSON.stringify(arrayNuevo))
  };

  actualizarUsuario = async(id, obj) =>{
    const usuarios = await this.consultarUsuarios();
    const indexUsuario = usuarios.findIndex(u=>u.id === id)
    if (indexUsuario === -1){
      return 'Usuario no encontrado'
    }
    const usuarioActualizado = {...usuarios[indexUsuario], ...obj}
    usuarios.splice(indexUsuario, 1,usuarioActualizado)
    await fs.promises.writeFile(this.path, JSON.stringify(usuarios))
  }

  #generarId = (usuarios) => {
    let id;
    if (usuarios.length === 0) {
      id = 1;
    } else {
      id = usuarios[usuarios.length - 1].id + 1;
    }
    return id;
  };
}

const usuario1 = {
  nombre: "Fran",
  apellido: "Banco",
};

const usuario2 = {
  nombre: "Pepito",
  apellido: "Gomez",
};

async function prueba() {
  const manager = new ManagerUsuarios("Usuarios.json");
  await manager.crearUsuario(usuario2);
  await manager.crearUsuario(usuario1);
  const usuarios = await manager.consultarUsuarios();
  //const usuario = await manager.consultarUsuariosById(15)
  //await manager.eliminarUsuariosById(10)
  //await manager.eliminarUsuarios()
  console.log(usuarios);
}

prueba();
