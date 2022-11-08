// Arrays

const items = [
    {id: 1, clase: 'Ball',  nombre: 'Poke Ball', precio: 20, stock: 0, descripcion:'La ball más común. Sirve para capturar Pokémon salvajes.'},
    {id: 2, clase: 'Ball',  nombre: 'Super Ball', precio: 60, stock: 0, descripcion:'Es buena. Tiene más índice de éxito en capturas que la Poke Ball.'},
    {id: 3, clase: 'Ball', nombre: 'Ultra Ball', precio: 120, stock: 0, descripcion:'Es muy buena. Tiene más índice de éxito que la Super Ball.'},
    {id: 4, clase: 'Ball', nombre: 'Lujo Ball', precio: 100, stock: 0, descripcion:'Es muy acogedora. Hace a los Pokémon más simpáticos.'},
    {id: 5, clase: 'Ball', nombre: 'Honor Ball', precio: 20, stock: 0, descripcion:'Es muy particular. Se creó para una conmemoración.'},
    {id: 6, clase: 'Ball', nombre: 'Nido Ball', precio: 100, stock: 0, descripcion:'Es excelente para capturar Pokémon de menor nivel.'},
    {id: 7, clase: 'Ball', nombre: 'Malla Ball', precio: 100, stock: 0, descripcion:'Sirve especialmente para capturar Pokémon de tipo Agua y Bicho.'},
    {id: 8, clase: 'Ball', nombre: 'Turno Ball', precio: 100, stock: 0, descripcion:'Aumenta la eficacia de captura cuanto más avanzado esté el combate.'},
    {id: 9, clase: 'Ball', nombre: 'Buceo Ball', precio: 100, stock: 0, descripcion:'Aumenta la eficacia de captura con Pokémon del fondo del mar.'},
    {id: 10, clase: 'Ball', nombre: 'Acopio Ball', precio: 100, stock: 0, descripcion:'Aumenta la eficacia de captura con Pokémon de la misma especie a los capturados previamente.'},
    {id: 11, clase: 'Ball', nombre: 'Sana Ball', precio: 30, stock: 0, descripcion:'Es curativa. Restaura los Puntos de Salud del Pokémon capturado, y cura sus efectos de estado.'},
    {id: 12, clase: 'Ball', nombre: 'Ocaso Ball', precio: 100, stock: 0, descripcion:'Hace que sea más fácil capturar Pokémon en la oscuridad.'},
    {id: 13, clase: 'Ball', nombre: 'Veloz Ball', precio: 100, stock: 0, descripcion:'Tiene un índice de captura mayor si se utiliza al inicio de un encuentro con un Pokémon.'},
    {id: 14, clase: 'Ball', nombre: 'Master Ball', precio: 10000, stock: 0, descripcion:'La Ball definitiva. Atrapa sin fallar nunca.'},
    {id: 15, clase: 'Med', nombre: 'Poción', precio: 30, stock: 0, descripcion:'Restaura 20 Puntos de Salud a un Pokémon.'},
    {id: 16, clase: 'Med', nombre: 'Super Poción', precio: 70, stock: 0, descripcion:'Restaura 50 Puntos de Salud a un Pokémon.'},
    {id: 17, clase: 'Med', nombre: 'Hiper Poción', precio: 120, stock: 0, descripcion:'Restaura 200 Puntos de Salud a un Pokémon.'},
    {id: 18, clase: 'Med', nombre: 'Poción Máxima', precio: 250, stock: 0, descripcion:'Restaura todos los Puntos de Salud de un Pokémon.'},
    {id: 19, clase: 'Med', nombre: 'Restaura Todo', precio: 300, stock: 0, descripcion:'Restaura todos los Puntos de Salud y alivia todos los efectos de estado de un Pokémon.'},
    {id: 20, clase: 'Med', nombre: 'Antídoto', precio: 10, stock: 0, descripcion:'Cura el estado de envenenamiento.'},
    {id: 21, clase: 'Med', nombre: 'Antiparaliz', precio: 20, stock: 0, descripcion:'Cura el estado de parálisis.'},
    {id: 22, clase: 'Med', nombre: 'Antiquemar', precio: 25, stock: 0, descripcion:'Cura el estado de quemado.'},
    {id: 23, clase: 'Med', nombre: 'Antihielo', precio: 25, stock: 0, descripcion:'Cura el estado de congelamiento.'},
    {id: 24, clase: 'Med', nombre: 'Despertar', precio: 25, stock: 0, descripcion:'Cura el estado de dormido.'},
    {id: 25, clase: 'Med', nombre: 'Cura Total', precio: 60, stock: 0, descripcion:'Cura cualquier problema de estado.'},
    {id: 26, clase: 'Med', nombre: 'Revivir', precio: 150, stock: 0, descripcion:'Revive a un Pokémon debilitado y restaura la mitad de sus Puntos de Salud.'},

];

const carrito = [];

// Variables Globales

let menuFlag = true
let entrada = 0
let cantidadMax = 0 
let precioProducto = 0 
let itemElegido = -1
let stringProducto = ''


//Funcion para asignar stock aleatorio entre 1 a 50 para cada objeto

let asignarStock = (objeto) => {
    objeto.stock = Math.ceil(Math.random() * 50)
};  

//Función para agregar items al carrito

let agregarCarrito = (id, cantidad, subtotal) => {
    if (carrito.some(producto => producto.id === id)) {
        for (const productos of carrito) {
            if (productos.id == id){
                productos.cantidad += cantidad
                productos.subtotal += subtotal
                break;
            };
        };
    } else {
        carrito.push({id: id, cantidad: cantidad, subtotal: subtotal})
    };
};

let removerStock = (id,cantidad) => {
    for (const productos of items){
        if (productos.id == id){
            productos.stock -= cantidad
            console.log(items[productos])
            break;
        };
    };

};


items.forEach ( (objeto) =>{
    asignarStock(objeto)
});

// Ciclo menú para seleccionar qué se quiere comprar. Se repite hasta que se elija una opción válida
do {
    entrada = prompt("¡Bienvenido a PokéShop! para ver el catálogo y comprar, ingrese 1. Para ver el carrito y pagar, ingrese 2. Para salir, ingrese 3.");
    switch (entrada){
        case "1": //Caso de compra
            let compraFlag = true

            do{
                itemElegido = prompt("Ingrese un valor del 1 al 26 para ver información del objeto elegido, ingrese 0 para salir.");
                console.log(itemElegido)
                itemElegido = parseInt(itemElegido)

                if (itemElegido === 0) {
                    break;
                };
                
                let flag = true
                let findFlag = false
                
                if ((itemElegido < "0") || (itemElegido > "26")){
                    alert("Valor no válido.")
                    flag = false
                } else {
                    const resultado = items.find((elemento) => elemento.id === itemElegido)
                    if (resultado != undefined){
                        findFlag = true
                        stringProducto = resultado.nombre + ' id: ' + resultado.id + ' precio: $' + resultado.precio + ' stock: ' + resultado.stock + ' descripción: ' + resultado.descripcion
                        cantidadMax = resultado.stock
                        precioProducto = resultado.precio
                        console.log("cantidad " + cantidadMax)
                        console.log("precio " + precioProducto)

                    };

                    if (!findFlag){
                        alert("Valor no válido.")
                        flag = false
                    };
    
                    while (flag) {
                        let cantidad = 0
                        cantidad = prompt(`${stringProducto}  si desea agregar al carrito este producto, ingrese la cantidad que desea comprar, con un máximo de ${cantidadMax}. Si desea salir, ingrese 0.`)
                        cantidad = parseInt(cantidad)
                        console.log(cantidad)

                        if (cantidad === 0) {
                            break;
                        };
                        if (isNaN(cantidad)){
                            alert("valor no válido.")
                        } else {
                            if ((cantidad < "0") || (cantidad > cantidadMax)){
                                alert("valor no válido.")
                            } else {
                                let subtotal = precioProducto * cantidad
                                console.log("subtotal: " + subtotal)
                                removerStock(itemElegido,cantidad)
                                agregarCarrito(itemElegido,cantidad,subtotal)
                                console.log(carrito)
                                alert("objeto añadido satisfactoriamente al carrito.")
                                flag = false;
                            }; 
                        };
                    };
                };
            }while (compraFlag);
            break;

        case "2": //Mirar carrito
            decision = 0
            console.log(carrito)
            let total = carrito.reduce((acumulador,elemento) => acumulador + elemento.subtotal,0);
            decision = prompt(`el valor de compra del carrito es de: $${total}. Si quiere pagar, ingrese 1. Si quiere vaciar el carrito, ingrese 2. Si quiere salir, pulse 3.`);
            switch(decision){
                case "1":
                    console.log("pagado: $" + total)
                    alert("¡Gracias! esperamos que vuelva pronto.")
                    menuFlag = false
                    break;
                
                case "2":
                    carrito.splice(0,(carrito.length))
                    console.log(carrito)
                    alert("Carrito eliminado.")
                    break;
                
                case "3":
                    break;
                
                default:
                    console.log("Entrada no válida")
                    alert("ingrese un valor válido")
                    break;
            };
            break;
        
        case "3":
            alert("¡Esperamos que vuelva pronto!")
            menuFlag = false;
            break;

        default:
            console.log("Entrada no válida")
            alert("ingrese un valor válido");
            break;
    };
    
} while (menuFlag);