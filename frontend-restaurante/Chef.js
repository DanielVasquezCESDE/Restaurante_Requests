let d = document;
let tablas = d.querySelectorAll(".table > tbody");

//Evento al navegador para mostrar los datos
d.addEventListener("DOMContentLoaded", function () {
    console.log("Pendiente")
})

//Obtener pedidos de la base de datos
async function ObtenerPedidosDB () {
    let url = "http://localhost:3005/pedido"
    let respuesta = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo obtener los pedidos de la base de datos");
    }

    const datos = await respuesta.json();

    console.log(datos.dataPorPreparar);
}
    