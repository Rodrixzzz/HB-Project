//Declaración de variables
var nombreUsuario = "Rodrigo Cejas";
var saldoCuenta = 3000;
var limiteExtraccion = 1000;
//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}


//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    var inputUsuario = prompt("Ingrese el nuevo limite de extracción");
    var nuevoLimite = parseInt(inputUsuario);
    if (inputUsuario != null && inputUsuario != "" && !isNaN(inputUsuario) )
    {
        limiteExtraccion = nuevoLimite;
        actualizarLimiteEnPantalla();
        alert("Su nuevo limite de extracción es de: " + "$ " + nuevoLimite);
    }
    else
    {
        alert("Ingrese un valor valido");
    }
}

function extraerDinero() {
    var saldoAnterior = saldoCuenta;
    var inputUsuario = prompt("Ingrese la cantidad de dinero a extraer");
    var dineroAExtraer = parseInt(inputUsuario);
    if (inputUsuario != null && inputUsuario != "" && !isNaN(inputUsuario) )
    {
        if (dineroAExtraer <= limiteExtraccion) 
        {
            if (saldoCuenta - dineroAExtraer >= 0)
            {
                if(dineroAExtraer % 100 == 0)
                {
                    saldoCuenta -= dineroAExtraer;
                    actualizarSaldoEnPantalla();
                    alert("Saldo antes de la operación: " + "$ " + saldoAnterior +  "\n" + "Dinero a extraer: " + "$ " + dineroAExtraer + "\n" + "Saldo actual: " + "$ " + saldoCuenta);
                }
                else
                {
                    alert("El monto ingresado debe ser multiplo de 100");
                }
            }
            else
            {
                alert("El monto ingresado supera su saldo disponible");
            }
        }
        else
        {
            alert("El monto ingresado supera el limite de extraccion");
        }
    }
    else
    {
        alert("Ingrese un valor valido");
    }
}
    

function depositarDinero() {
    var saldoAnterior = saldoCuenta;
    var inputUsuario = prompt("Ingrese la cantidad de dinero a depositar");
    var dineroADepositar = parseInt(inputUsuario);
    if (inputUsuario != null && inputUsuario != "" && !isNaN(inputUsuario) )
    {
        saldoCuenta += dineroADepositar;
        actualizarSaldoEnPantalla();
        alert("Saldo antes de la operación: " + "$ " + saldoAnterior +  "\n" + "Dinero a depositar: " + "$ " + dineroADepositar + "\n" + "Saldo actual: " + "$ " + saldoCuenta);
    }
    else
    {
        alert("Ingrese un valor valido");
    }

}

function pagarServicio() {

}

function transferirDinero() {

}

function iniciarSesion() {

}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}