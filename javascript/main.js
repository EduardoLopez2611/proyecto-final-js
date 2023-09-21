// let usuario = prompt("ingrese su nombre y apellido");
// let edad = parseFloat (prompt("Ingrese su edad"));
// if (usuario= usuario){
//     alert(`Bienvenido a SportPage ` + usuario);
// }else{
//     alert(`Debe ingresar su nombre para continuar`);
//     usuario = prompt("Ingrese su nombre y apellido");
// };

// if (edad<18){
//     alert(`debe ser mayor de edad para continuar`);
//     edad = prompt("Ingrese su edad");
// }else{
//     alert("eres mayor de edad, puedes continuar ");

let productos=[];

fetch("../productos.json")
.then(response => response.json())
.then(data => {
    productos = data;
    cargarProductos(productos);
})

    const contenedorProductos=document.querySelector("#contenedor-productos");
    const botonesCategoria=document.querySelectorAll(".boton-categoria");
    const tituloPrincipal=document.querySelector("#titulo-principal");
    let botonesAgregar= document.querySelectorAll(".producto-agregar");
    const numerito = document.querySelector("#numerito");

    function cargarProductos(productosElegidos){

        contenedorProductos.innerHTML= "";

        productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML= `
        <img class="producto-imagen" src="${producto.imagen}" alt=${producto.titulo}>
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="producto-precio">$${producto.precio}</p>
                        <button class="producto-agregar" id="${producto.id}">Agregar</button>
                    </div>
        `;
            contenedorProductos.append(div);
    })
        actualizarBotonesAgregar();
}


botonesCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id !="todos"){
            const productosCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productosCategoria.categoria.nombreProducto;
            const productosBoton=productos.filter(producto=>producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }else{
            tituloPrincipal.innerText="Todos los productos"; 
            cargarProductos(productos);
        }
        
    })
})
function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let productosEnCarrito;

let productosEnCarritoLS= localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS){
    productosEnCarrito = JSON.parse (productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito=[];
}

function agregarAlCarrito(e) {
    Toastify({
        text: "Se ha agregado con éxito!",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true,
        style: {
        background: "linear-gradient(to right, #ff8c00, #f2be7e)",
        borderRadius: "2rem",
        textTransform:"uppercase",
        fontSize:".75rem",
        },
        onClick: function(){} 
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado= productos.find(producto => producto.id === idBoton);
    
    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else{
        productoAgregado.cantidad= 1;
        productosEnCarrito.push(productoAgregado);
}
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
// }
        //mi idea es usar el sessionStorage y el localStorage para cargar a los nuevos usuarios "email" y "password" y para el carrito.
        // localStorage.setItem("producto", JSON.stringify(productos))