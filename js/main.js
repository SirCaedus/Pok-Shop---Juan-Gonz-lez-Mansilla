// Constantes y Variables globales

const ballValor = 20
const medValor = 15

let menuFlag = true
let compraFlag = false
let entrada = 0 


// Función para calcular el precio final
let calcularPrecio = (objeto, cantidad) => {
    let salida = ""
    if (objeto === "1"){
        salida = "El valor a pagar es de " + (ballValor * cantidad) + "$";
        console.log("coste: " + ballValor * cantidad);
    } else {
        salida = "El valor a pagar es de " + (medValor * cantidad) + "$";
        console.log("coste: " + medValor * cantidad);
    };

    alert(salida);
}

// Ciclo menú para seleccionar qué se quiere comprar. Se repite hasta que se elija una opción válida
do {
    entrada = prompt("¡Bienvenido a PokéShop! para comprar Pokéballs, ingrese 1. Para comprar medicina, ingrese 2. Para salir, pulse 3.");
    switch (entrada){
        case "1":
            console.log("Pokéballs, 1")
            menuFlag = false
            compraFlag = true;
            break;

        case "2":
            console.log("Medicina, 2")
            menuFlag = false
            compraFlag = true;
            break;
        
        case "3":
            console.log("Salida, 3")
            alert("¡Esperamos que vuelva pronto!")
            menuFlag = false;
            break;

        default:
            console.log("Entrada no válida")
            alert("ingrese un valor válido");
            break;
    }
} while (menuFlag);

// Ciclo donde se pide la cantidad del objeto elegido, y se repite hasta obtener un valor válido.
// Se entra al ciclo únicamente si se elije la opción 1 o 2 en el ciclo anterior.
if (compraFlag) {
    let cantidad = -1
    do {
        if (entrada === "1"){
            cantidad = prompt("Ingrese la cantidad de Pokéballs a comprar, ingresando un número del 1 al 20. Cada una tiene un valor de 20$. Ingrese 0 para salir.");
        } else {
            cantidad = prompt("Ingrese la cantidad de Medicinas a comprar, ingresando un número del 1 al 20. Cada una tiene un valor de 15$. Ingrese 0 para salir.");
        };
                
        if ((cantidad > "20") || (cantidad < "0")){
            console.log("valor no válido")
            alert("Valor no válido");
        } else {
            if (cantidad === "0"){
                console.log("Salida, 0")
                alert("¡Esperamos que vuelva pronto!")
                compraFlag = false;
            } else {
                console.log("entradas exitosas")
                console.log("cantidad de compra: " + cantidad)
                calcularPrecio(entrada,cantidad)
                compraFlag = false;
            }
        };

    } while (compraFlag);

};