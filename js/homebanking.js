//Declaración de variables
var nombreUsuario = "Rodrigo Cejas";
var saldoCuenta = 3000;
var limiteExtraccion = 1000;
var serviciosMonto = [350,425,210,570];
var serviciosDesc  = ["Agua","Luz","Internet","Telefono"];
var cuentasAmigas = [1234567,7654321];
var codigoSeguridad = 1234;

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
    if(nuevoLimite !== false)
    {
        limiteExtraccion = nuevoLimite;
        actualizarLimiteEnPantalla();
        alert(imprimirResultado("",nuevoLimite,"limite",""));
    }
}

function extraerDinero() {
    var saldoAnterior = saldoCuenta;
    var dineroAExtraer = ingresarDatos("extraer");
    if(dineroAExtraer !== false)
    {
        if(  verificarLimite(dineroAExtraer)  && verificarMultiplo(dineroAExtraer) && verificarSaldoDisponible(dineroAExtraer))
        {
            actualizarSaldo(dineroAExtraer,"resta");
            alert(imprimirResultado(saldoAnterior,dineroAExtraer,"extraer",""));
        }
    }
}

function depositarDinero() {
    var saldoAnterior = saldoCuenta;
    var dineroADepositar = ingresarDatos("depositar");
    if (dineroADepositar !== false )
    {
        actualizarSaldo(dineroADepositar,"suma");
        alert(imprimirResultado(saldoAnterior,dineroADepositar,"depositar",""));
    }
}

function pagarServicio() {
    var saldoAnterior = saldoCuenta;
    var servicioAPagar = ingresarDatos("pagar");
    if(servicioAPagar !== false )
    {
        var monto=obtenerServicio(servicioAPagar);
        if (monto !== false)
        {
            if(verificarSaldoDisponible(monto))
            {
                actualizarSaldo(monto,"resta");
                alert(imprimirResultado(saldoAnterior,monto,"pagar",servicioAPagar));
            }
        }
    }
}

function transferirDinero() {
    var saldoAnterior = saldoCuenta;
    var montoATransferir = ingresarDatos("transferir");
    if(montoATransferir !== false)
    {
        if(verificarSaldoDisponible(montoATransferir))
        {
            var cuentaATransferir=ingresarDatos("cuentaAmiga");
            if(cuentaATransferir !== false )
            {
                if (verificarCuentaAmiga(cuentaATransferir))
                {
                    actualizarSaldo(montoATransferir,"resta");
                    alert(imprimirResultado(saldoAnterior,montoATransferir,"transferir",cuentaATransferir));
                }
            }
        }
    }
}

function iniciarSesion() {
    var password = ingresarDatos("ingreso");
    verificarClave(password);

}

//Funciones generales
//Funcion que Valida que solo se puedan ingresar numeros y valores positivos.
function ingresarDatos(param)
{
    var texto = obtenerMensaje(param);
    var inputUsuario = prompt(texto);
    var valorUsuario = parseInt(inputUsuario);
    if (!isNaN(valorUsuario) && valorUsuario >= 0 )
    {
        return valorUsuario;
    }
    else
    {
        alert("Ingrese un valor valido");
        return false;
    }   
}
//Función que obtiene el mensaje para cada operación.
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
            mensaje = "Operación Invalida."
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
    if(operacion === "suma")
    {
        saldoCuenta += monto;
    }
    else
    {
        saldoCuenta -= monto;
    }
    actualizarSaldoEnPantalla();
}
//Función para generar el texto, de los resultados, el campo opcional es para 2 casos: 1 - El servicio que se pago 2 - La cuenta destino.
function imprimirResultado(saldoAnterior,monto,operacion,opcional)
{
    var mensaje;
    switch (operacion) {
        case "extraer":
            mensaje = "Saldo antes de la operación: " + "$ " + saldoAnterior +  "\n" + "Dinero a extraer: " + "$ " + monto + "\n" + "Saldo actual: " + "$ " + saldoCuenta;
            break;
        case "depositar":
            mensaje = "Saldo antes de la operación: " + "$ " + saldoAnterior +  "\n" + "Dinero a depositar: " + "$ " + monto + "\n" + "Saldo actual: " + "$ " + saldoCuenta;
            break;
        case "limite":
            mensaje = "Su nuevo limite de extracción es de: " + "$ " + monto;
            break;
        case "pagar":
            mensaje = "Has pagado " + serviciosDesc[opcional-1] + "\n" + "Saldo antes de la operación: " + "$ " + saldoAnterior +  "\n" + "Monto del servicio: " + "$ " + monto + "\n" + "Saldo actual: " + "$ " + saldoCuenta;
            break;
        case "transferir":
            mensaje = "Saldo antes de la operación: " + "$ " + saldoAnterior +  "\n" + "Dinero a transferir: " + "$ " + monto + "\n" + "Saldo actual: " + "$ " + saldoCuenta + "\n" + "Cuenta destino: " + opcional;
            break;
        default:
            mensaje = "Operación Invalida."
            break;
    }
    return mensaje;
}
//Para la Funcionalidad de extracción.
function verificarMultiplo(valorOperacion)
{
    if(valorOperacion % 100 !== 0)
    {
        alert("El monto ingresado debe ser multiplo de 100");
        return false;
    }
    return true;
}
//Para la Funcionalidad de Pago de servicios.
function obtenerServicio(valor)
{
    switch (true) {
        case (valor > 0 && valor <= serviciosMonto.length):
            return serviciosMonto[valor-1];
            break;
        default:
            alert("Servicio inexistente");
            return false;
            break;
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
        if(cuenta === cuentasAmigas[index])
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
    if (clave === codigoSeguridad)
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
    var elemento=document.getElementById("saldo-container");
    //Se agrego que si la cuenta tiene Saldo en $0, el contendor tenga color Rojo, en lugar del verde, si es mayor a 0, vuelve a su color.
    if (saldoCuenta === 0)
    {
        elemento.style.background  = 'red';
    }
    else
    {
        elemento.style.background = '#2cc197';
    }
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}
