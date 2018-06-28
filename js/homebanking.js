//Declaración de variables
var nombreUsuario = "Rodrigo Cejas";
var saldoCuenta = 3000;
var limiteExtraccion = 1000;
var serviciosMonto = [350,425,210,570];
var serviciosDesc  = ["Agua","Luz","Internet","Telefono"];
var cuentasAmigas = ["1234567","7654321"];
var codigoSeguridad = "1234";

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    iniciarSesion();
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    var nuevoLimite = ingresarDatos("limite");
    limiteExtraccion = nuevoLimite;
    actualizarLimiteEnPantalla();
    alert("Su nuevo limite de extracción es de: " + "$ " + nuevoLimite);
}

function extraerDinero() {
    var saldoAnterior = saldoCuenta;
    var dineroAExtraer = ingresarDatos("extraer");
    if(  verificarLimite(dineroAExtraer)  && verificarMultiplo(dineroAExtraer) && verificarSaldoDisponible(dineroAExtraer))
    {
        actualizarSaldo(dineroAExtraer,"resta");
        alert("Saldo antes de la operación: " + "$ " + saldoAnterior +  "\n" + "Dinero a extraer: " + "$ " + dineroAExtraer + "\n" + "Saldo actual: " + "$ " + saldoCuenta);
    }
 
}

function depositarDinero() {
    var saldoAnterior = saldoCuenta;
    var dineroADepositar = ingresarDatos("depositar");
    actualizarSaldo(dineroADepositar,"suma");
    alert("Saldo antes de la operación: " + "$ " + saldoAnterior +  "\n" + "Dinero a depositar: " + "$ " + dineroADepositar + "\n" + "Saldo actual: " + "$ " + saldoCuenta);

}

function pagarServicio() {
    var saldoAnterior = saldoCuenta;
    var servicioAPagar = ingresarDatos("pagar");
    var monto=obtenerServicio(servicioAPagar);
    if (monto != false)
    {
        if(verificarSaldoDisponible(monto))
        {
            actualizarSaldo(monto,"resta");
            alert("Has pagado " + serviciosDesc[servicioAPagar-1] + "\n" + "Saldo antes de la operación: " + "$ " + saldoAnterior +  "\n" + "Monto del servicio: " + "$ " + monto + "\n" + "Saldo actual: " + "$ " + saldoCuenta);
        }
    }
}

function transferirDinero() {
    var saldoAnterior = saldoCuenta;
    var montoATransferir = ingresarDatos("transferir");
    if(verificarSaldoDisponible(montoATransferir))
    {
        var cuentaATransferir=ingresarDatos("cuentaAmiga");
        if (verificarCuentaAmiga(cuentaATransferir))
        {
            actualizarSaldo(montoATransferir,"resta");
            alert("Saldo antes de la operación: " + "$ " + saldoAnterior +  "\n" + "Dinero a transferir: " + "$ " + montoATransferir + "\n" + "Saldo actual: " + "$ " + saldoCuenta + "\n" + "Cuenta destino: " + cuentaATransferir);
        }
    }
}

function iniciarSesion() {
    var password = ingresarDatos("ingreso");
    verificarClave(password);

}

//Funciones generales
function ingresarDatos(param)
{
    var invalido = true;
    var texto = obtenerMensaje(param);
    while (invalido) {
        var inputUsuario = prompt(texto);
        var valorUsuario = parseInt(inputUsuario);
        if (valorUsuario != null && !isNaN(valorUsuario) && valorUsuario >= 0 )
        {
            invalido = false;
        }
        else
        {
            alert("Ingrese un valor valido");
        }
    }  
    return valorUsuario;
}

function obtenerMensaje(param)
{
    var mensaje;
    switch (param) {
        case "extraer":
            mensaje = "Ingrese la cantidad de dinero a extraer";
            break;
        case "depositar":
            mensaje = "Ingrese la cantidad de dinero a depositar";
            break;
        case "limite":
            mensaje = "Ingrese el nuevo limite de extracción";
            break;
        case "pagar":
            mensaje = "Ingrese el numero que corresponda con el servicio que quiere pagar: " +  imprimirVector();
            break;
        case "transferir":
            mensaje = "Ingrese la cantidad de dinero a transferir";
            break;
        case "cuentaAmiga":
            mensaje = "Ingrese la cuenta destino";
            break;
        case "ingreso":
            mensaje = "Ingrese la clave numerica de acceso";
            break;
        default:
            break;
    }
    return mensaje;
}

function verificarLimite(dineroAExtraer)
{
    if (dineroAExtraer > limiteExtraccion)
    {
        alert("El monto ingresado supera el limite de extraccion");
        return false;
    }
    return true;
}

function verificarSaldoDisponible(valorOperacion)
{
    if (saldoCuenta - valorOperacion >= 0)
    {
        return true;
    }
    alert("No posee Saldo suficiente para realizar la operación");
    return false;
}

function actualizarSaldo(monto,operacion)
{
    if(operacion == "suma")
    {
        saldoCuenta += monto;
    }
    else
    {
        saldoCuenta -= monto;
    }
    actualizarSaldoEnPantalla();
}
//Para la Funcionalidad de extracción.
function verificarMultiplo(valorOperacion)
{
    if(valorOperacion % 100 != 0)
    {
        alert("El monto ingresado debe ser multiplo de 100");
        return false;
    }
    return true;
}
//Para la Funcionalidad de Pago de servicios.
function obtenerServicio(valor)
{
    /* switch (valor) {
        case 1:
            monto = servicios[valor-1];
            break;
        case 2:
            monto = servicios[valor-1];
            break;
        case 3:
            monto = servicios[valor-1];
            break;
        case 4:
            monto = servicios[valor-1];
            break;
        default:
            alert("Servicio inexistente");
            return false;
            break;
    } */
    if( valor > 0 && valor <= serviciosMonto.length )
    {
        return serviciosMonto[valor-1];
    }
    else
    {
        alert("Servicio inexistente");
        return false;
    }
}
function imprimirVector()
{
    var mensaje = " ";
    for (var index = 0; index < serviciosDesc.length; index++) {
        mensaje += "\n" + (index + 1 ) + " - " + serviciosDesc[index];
    }
    return mensaje;
}
//Para la Funcionalidad de Transferencia.
function verificarCuentaAmiga(cuenta)
{
    for (var index = 0; index < cuentasAmigas.length; index++) {
        if(cuenta == cuentasAmigas[index])
        {
            return true;
        }
    }
    alert("La cuenta " + cuenta + " no existe en la lista de cuentas amigas")
    return false;
}
//Para la clave de acceso.
function verificarClave(clave)
{
    if (clave == codigoSeguridad)
    {
        alert("Bienvenido/a " + nombreUsuario + " ya puedes comenzar a realizar operaciones");
    }
    else
    {
        alert("Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad");
        saldoCuenta = 0;
        limiteExtraccion = 0;
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
    var elemento=document.querySelector(".green-container");
    if (saldoCuenta == 0)
    {
        elemento.style.background  = 'gold';
    }
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}