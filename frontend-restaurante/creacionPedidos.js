//Global variable
let d = document;
let platillo = d.querySelectorAll(".platillo");
let cliente = d.querySelectorAll(".cliente");
let precio = d.querySelectorAll(".precios");
let cantidad = d.querySelectorAll(".cantidad");
let fechas = d.querySelectorAll(".fecha");
let observaciones = d.querySelectorAll(".observaciones");
let btn_Pedidos = d.querySelectorAll(".btn-pedido");

//Agregar evento a los botones
btn_Pedidos.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        let pedido_datos = ObtenerDatosPedidos(i)
        enviarPedido(pedido_datos)
    });
})

//Obtener datos del formulario de pedidos
function ObtenerDatosPedidos( pos ) {
    let datosPedido;
    if (platillo[pos].value == "" || cliente[pos].value == "" || cantidad[pos].value == "" || fechas[pos].value == "" || observaciones[pos].value == "") {
        alert("Todos los campos son obligatorios")
    }
    else {
        datosPedido = {
            platillo: platillo[pos].value,
            precio: precio[pos].textContent,
            cantidad: cantidad[pos].value,
            observaciones: observaciones[pos].value,
            cliente: cliente[pos].value,
            fecha: fechas[pos].value,
    
        }
        console.log(datosPedido)

        platillo[pos].value = "";
        precio[pos].value = "";
        cantidad[pos].value = "";
        observaciones[pos].value = "";
        cliente[pos].value = "";
        fechas[pos].value = "";
    }
    return datosRegistro;
}

//Enviar datos del pedido
async function enviarPedido(pedido) {
    let url = "http://localhost:3005/chef";

    try {
        let respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pedido)
        });
        if (!respuesta.ok) {
            throw new Error("No se puedo enviar el registro");
        }
        //Respuesta del servidor
        let mensaje = await respuesta.text();
        console.log(mensaje)
        //Mostrar mensaje al usuario
        // alert(mensaje);
        // location.href = "login.html"
    }
    catch (error) {
        console.log(`Obtuviste un error que dice: ${error}`)
    }

}