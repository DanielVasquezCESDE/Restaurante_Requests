let d = document;
let tablas = d.querySelectorAll(".table > tbody");

//Evento al navegador para mostrar los datos
d.addEventListener("DOMContentLoaded", function () {
    ObtenerPedidosDB()
})

//Obtener pedidos de la base de datos
async function ObtenerPedidosDB () {
    const url = "http://localhost:3005/chef"
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

    //console.log(datos.dataPorPreparar);
    const { dataPorPreparar, dataPreparando, dataPorEntregar} = datos;
    console.log(dataPorPreparar)
    dataPorPreparar.forEach((platillo, i) => {
        let fila = d.createElement("tr");
        fila.innerHTML = `
            <td> ${ platillo.platillo } </td>
            <td>
                <button onclick="actualizarPedido(${platillo.id})" class="btn-editar btn btn-primary" type="button"></button>
            </td>
        `
        tablas[0].appendChild(fila);
    });

    dataPreparando.forEach((platillo, i) => {
        let fila = d.createElement("tr");
        fila.innerHTML = `
            <td> ${ platillo.platillo } </td>
            <td>
                <button onclick="actualizarPedido(${platillo.id}, 'preparando')" class="btn-editar btn btn-primary" type="button"></button>
            </td>
        `
        tablas[1].appendChild(fila);
    });

    dataPorEntregar.forEach((platillo, i) => {
        let fila = d.createElement("tr");
        fila.innerHTML = `
            <td> ${ platillo.platillo } </td>
            <td>
                <button onclick="actualizarPedido(${platillo.id}, 'por_entregar')" class="btn-editar btn btn-primary" type="button"></button>
            </td>
        `
        tablas[2].appendChild(fila);
    });
}
    
async function actualizarPedido (id, estado = "por preparar") {
    let url;
    let url1 = "http://localhost:3005/preparando/"+id;
    let url2 = "http://localhost:3005/listo/"+id;

    switch (estado) {
        case "prep":
            url = url2;
            break;
        
        default:
            url = url1;
            break;
    }

    const respuesta = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id:id})
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo actualizar el pedido");
    }
    //Mostrar en consola los datos
    const mensaje = await respuesta.text();
    //Mostrar un mensaje al chef en el navegador
    console.log(mensaje);
    //Recargar la página
    alert(mensaje);
    location.reload()
}