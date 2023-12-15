//Registro

//Variables globales
var d = document;

let inputUsuario = d.querySelector('#user')
let inputNombre = d.querySelector('#name')
let inputRol = d.querySelector('#rol')
let inputContra = d.querySelector('#password')
let btnRegistrar = d.querySelector('.btn-guardar')

//Login 
//Variables Login
let Usuario = d.querySelector('#user')
let Contrasena = d.querySelector('#password')
let btnLogin = d.querySelector('.btn-iniciar')

//Validar existencia de los botones
if (btnRegistrar != null) {
    btnRegistrar.addEventListener('click', function () {
        //Alert "Dí click"
        let datosUser = ObtenerDatosRegistro();
        enviarRegistro(datosUser)
    })
}
else if (btnLogin != null) {
    btnLogin.addEventListener('click', function () {
        //Alert "Dí click"
        let usuario = ObtenerCredenciales();
        enviarLogin(usuario);
    })
}

//Obtener datos del login
function ObtenerCredenciales() {
    let datosLogin;
    if (Usuario.value == "" || Contrasena == "") {
        alert("Todos los campos son obligatorios")
    }
    else {
        datosLogin = {
            user: Usuario.value,
            password: Contrasena.value
        }
        console.log(datosLogin)
        Usuario.value = ""
        Contrasena.value = ""
    }
    return datosLogin;
}

//Enviar credenciales al backend
async function enviarLogin(datos) {
    let url = "http://localhost:3005/login";

    try {
        let respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });
        if (!respuesta.ok) {
            throw new Error("No se puedo enviar los datos");
        }
        let UsuarioRegistrado = await respuesta.text();
        console.log(UsuarioRegistrado);

        //VALIDAR rol DEL USER REGISTRADO
        if (UsuarioRegistrado.rol === "mesero" && UsuarioRegistrado.password === datos.password) {
            alert(`BIENVENIDO ${UsuarioRegistrado.user}`)
            location.href = "mesero.html";
        }
        else if (UsuarioRegistrado.rol === "cajero" && UsuarioRegistrado.password === datos.password) {
            alert(`BIENVENIDO ${UsuarioRegistrado.user}`)
            location.href = "cajero.html";
        }
        else if (UsuarioRegistrado.rol === "chef" && UsuarioRegistrado.password === datos.password) {
            alert(`BIENVENIDO ${UsuarioRegistrado.user}`)
            location.href = "chef";
        }

        //Mostrar mensaje al usuario
        // alert(mensaje);
        // location.href = "login.html"
    }
    catch (error) {
        console.log(`Obtuviste un error que dice: ${error}`)
    }

}

btnRegistrar.addEventListener('click', function () {
    //Alert 
    let datosUsuario = ObtenerDatosRegistro();
    enviarRegistro(datosUsuario);
});

function ObtenerDatosRegistro() {
    let datosRegistro;
    if (inputUsuario.value === "" || inputNombre.value === "" || inputContra.value === "" || inputRol.value === "") {
        alert("Todos los campos son obligatorios")
    }
    else {
        datosRegistro = {
            user: inputUsuario.value,
            name: inputNombre.value,
            rol: inputRol.value,
            password: inputContra.value
        }
        console.log(datosRegistro)
        inputUsuario.value = "";
        inputNombre.value = "";
        inputRol.value = "";
        inputContra.value = "";
    }
    return datosRegistro;
}

//Enviar datos del registro
async function enviarRegistro(usuario) {
    let url = "http://localhost:3005/register";

    try {
        let respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });
        if (!respuesta.ok) {
            throw new Error("No se puedo enviar el registro");
        }
        let mensaje = await respuesta.text();
        console.log(mensaje)
        //Mostrar mensaje al usuario
        alert(mensaje);
        location.href = "login.html"
    }
    catch (error) {
        console.log(`Obtuviste un error que dice: ${error}`)
    }

}