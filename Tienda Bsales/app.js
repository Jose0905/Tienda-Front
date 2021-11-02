console.log("funciona");

//constantes
const HOST = "http://localhost:3000";
const endpoints = {
  categorias: "/categorias",
  productos: "/productos",
  productosPorId: "/productosPorIdCategoria?idCategoria=",
  productosPorNombre: "/productosPorNombre?nombre=",
};

//Variables
let categorias = [];
let productos = [];

//Obtener listado de categorias

const getCategorias = () => {
  fetch(HOST + endpoints.categorias)
    .then((response) => response.json())
    .then((data) => {
      if (data.ok === false) {
        alert(data.error);
        return;
      }

      //no hay error

      categorias = data.categorias;
      console.log("categorias => ", categorias);
      desplegarCategorias();
    });
};
//Obtener listado de productos

const getProductos = () => {
  fetch(HOST + endpoints.productos)
    .then((response) => response.json())
    .then((data) => {
      if (data.ok === false) {
        alert(data.error);
        return;
      }

      //no hay error

      productos = data.productos;
      console.log("Productos => ", productos);
      desplegarProductos();
    });
};
//Obtener listado de productos por id de categoria
const getProductosIdCategoria = (idCategoria)=>{
    fetch(HOST + endpoints.productosPorId + idCategoria)
    .then((response) => response.json())
    .then((data) => {
      if (data.ok === false) {
        alert(data.error);
        return;
      }

      //no hay error

      productos = data.productos;
      console.log("Productos por categoria => ", productos);
      desplegarProductos();
    });
}
//Obtener listado de productos por nombre
const getProductosNombre = (nombre)=>{
    fetch(HOST + endpoints.productosPorNombre + nombre)
    .then((response) => response.json())
    .then((data) => {
      if (data.ok === false) {
        alert(data.error);
        return;
      }

      //no hay error

      productos = data.productos;
      console.log("Productos por nombre=> ", productos);
      desplegarProductos();
    });
}

//Desplegar listado de categorias
const desplegarCategorias = () => {
  const ulListaCategorias = document.querySelector("#listaCategorias");

  categorias.forEach((categoria) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "dropdown-item";
    a.href = "#";
    a.addEventListener("click", () => {
      console.log("categoria seleccionada", categoria);
      productos = [];
      getProductosIdCategoria(categoria.id);
    });
    a.innerText = categoria.name;
    li.appendChild(a);
    ulListaCategorias.appendChild(li);
  });
};

//Desplegar listado de productos
const desplegarProductos = () => {
  const divListaproductos = document.querySelector("#listaProductos");
  divListaproductos.innerHTML = "";
  productos.forEach(producto => {
    const card = document.createElement("div");
    card.className = "card mt-5";
    card.style.width = "18rem";
    card.innerHTML = `
            <img src="${
              producto.url_image || "imgs/default-placeholder.png"
            }" class="card-img-top" alt="..." />
            <div class="card-body">
            <h5 class="card-title">${producto.name}</h5>
            <p class="card-text">
                <h4><span class="badge bg-primary">$ ${
                  producto.price
                }</span></h4>
            </p>
            </div>  
        `;
    divListaproductos.appendChild(card);
  });
};

//Asignar evento a boton buscar por nombre

const buscarPorNombre = ()=>{
    const btnBuscar = document.querySelector("#btnBuscar");
    btnBuscar.addEventListener('click', ()=>{
        const inputBuscar = document.querySelector('#inputBuscar');
        console.log(inputBuscar.value);
        getProductosNombre(inputBuscar.value);
    })
}
buscarPorNombre();
getCategorias();
getProductos();
