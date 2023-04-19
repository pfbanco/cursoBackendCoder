const socketClient = io();

socketClient.on("products", products => {
  render(products);
});

function render(data) {
  const html = data
    .map(item => {
      return `<div class="product">
      <div>${item.title}</div>
      <div>${item.description}</div>
      <div>${item.price}</div>
      <div>${item.thumbnail}</div>
      <div>${item.code}</div> 
      <div>${item.status}</div> 
      <div>${item.category}</div>  
      <div>${item.stock}</div>
      <input type="button" value="Eliminar" onclick="deleteProduct(${item.id})"></input>
      </div>
      `;
    })
    .join(" ");
  document.getElementById("productsContainer").innerHTML = html;
}

function paramsValidator(product) {
  if (
    product.title &&
    product.description &&
    product.price &&
    product.code &&
    product.status &&
    product.category &&
    product.stock 
  ) {
    return true;
  } else {
    throw new Error(`Every field is required`);
  }
}

function addProduct() {
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const product = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: parseInt(price),
    thumbnail: document.getElementById("thumbnail").value,
    code: document.getElementById("code").value,
    status: document.getElementById("status").value,
    category: document.getElementById("category").value,
    stock: parseInt(stock),
  };
  if (paramsValidator(product)) {
    socketClient.emit("newProduct", product);
    const form = document.getElementById("formAddProduct");
    form.reset();
    return
  }
}

function deleteProduct(id) {
  socketClient.emit("deleteProduct", id);
}