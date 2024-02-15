// Declaración de los botones
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
// Campos de texto
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
// Declaración de las alertas
let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
// Declaración de las variables que contendrán las tablas
let tablaListaCompras = document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

let precio = 0;
let isValid = true; // --> Variables bandera
let contador = 0;
let costoTotal = 0;
let totalEnProductos = 0;

let datos = new Array ();

// Valida que en el campo de cantidad haya solo números
function validarCantidad(){
    if(txtNumber.value.length == 0){
        return false;
    }
    if (isNaN(txtNumber.value)){
        return false;
    }
    if (Number(txtNumber <= 0)){
        return false;
    }
    return true;
}

// Asigna un número aleatorio al precio del producto
function getPrecio(){
    return parseInt ((Math.random() * 75) * 100) /100;
}

btnClear.addEventListener("click", function(event){
    event.preventDefault();//evita la funcionalidad predeterminada
    txtNombre.value = "";
    txtNumber.value = "";
    alertValidaciones.innerHTML = "";
    alertValidacionesTexto.innerHTML = "";
    txtNombre.style.border = "";
    txtNumber.style.border = "";
    contador = 0;
    costoTotal = 0;
    totalEnProductos = 0;
    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
    localStorage.setItem("contadorProductos", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal);
    cuerpoTabla.innerHTML = "";
    txtNombre.focus();
});

// funcionalidad del botón agregar

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";

    txtNombre.style.border="";
    txtNumber.style.border="";
    isValid=true;

    txtNombre.value = txtNombre.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if (txtNombre.value.length < 3 ) {
        alertValidacionesTexto.insertAdjacentHTML("beforeend", `
        El <strong> Nombre </strong> no es correcto <br/>`);
        alertValidaciones.style.display = "block";
        txtNombre.style.border="solid red thin";
        isValid = false;
    }

    if(! validarCantidad()){
        alertValidaciones.insertAdjacentHTML("beforeend", `
        La <strong> Cantidad </strong> no es correcta. <br/> `);
        alertValidaciones.style.display="block";
        txtNumber.style.border="solid red thin";
        isValid = false;
    }

    if(isValid){
        contador++;
        precio = getPrecio();
        row = ` <tr>
                    <td>${contador}</td>
                    <td>${txtNombre.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                </tr>`;

        let elemento = `{"id" : ${contador},
                        "nombre" : "${txtNombre.value}",
                        "cantidad" : ${txtNumber.value},
                        "precio" : ${precio}
        }`;

        datos.push(JSON.parse(elemento));
        console.log(datos);
        localStorage.setItem("datos", JSON.stringify(datos));

        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        contadorProductos.innerText = contador;
        totalEnProductos += parseFloat(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        costoTotal += precio * parseFloat(txtNumber.value);
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;

        localStorage.setItem("contadorProductos", contador);
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("costoTotal", costoTotal);

        txtNombre.value = "";
        txtNumber.value = "";
        txtNombre.focus();
    }
});

// Para que se guarde la información de la sesión 

window.addEventListener("load", function(event){
    event.preventDefault();
    if(this.localStorage.getItem("contadorProductos") != null){
        contador = Number(this.localStorage.getItem("contadorProductos"));
        totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));
        costoTotal = Number(this.localStorage.getItem("costoTotal"));
        contadorProductos.innerText = contador;
        productosTotal.innerText = totalEnProductos;
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
    }

    if(this.localStorage.getItem("datos") != null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach((r) => {
            let row = ` <tr>
                            <td>${contador}</td>
                            <td>${txtNombre.value}</td>
                            <td>${txtNumber.value}</td>
                            <td>${precio}</td>
                        </tr>`;
            cuerpoTabla.insertAdjacentHTML("beforeend", row);
        });
    };
})