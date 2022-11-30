const items = /* [
    {id: 1, clase: 'Ball',  nombre: 'Poke Ball', precio: 20, stock: 100, descripcion:'La ball más común. Sirve para capturar Pokémon salvajes.'},
    {id: 2, clase: 'Ball',  nombre: 'Super Ball', precio: 60, stock: 100, descripcion:'Es buena. Tiene más índice de éxito en capturas que la Poke Ball.'},
    {id: 3, clase: 'Ball', nombre: 'Ultra Ball', precio: 120, stock: 100, descripcion:'Es muy buena. Tiene más índice de éxito que la Super Ball.'},
    {id: 4, clase: 'Ball', nombre: 'Lujo Ball', precio: 100, stock: 100, descripcion:'Es muy acogedora. Hace a los Pokémon más simpáticos.'},
    {id: 5, clase: 'Ball', nombre: 'Honor Ball', precio: 20, stock: 100, descripcion:'Es muy particular. Se creó para una conmemoración.'},
    {id: 6, clase: 'Ball', nombre: 'Nido Ball', precio: 100, stock: 100, descripcion:'Es excelente para capturar Pokémon de menor nivel.'},
    {id: 7, clase: 'Ball', nombre: 'Malla Ball', precio: 100, stock: 100, descripcion:'Sirve especialmente para capturar Pokémon de tipo Agua y Bicho.'},
    {id: 8, clase: 'Ball', nombre: 'Turno Ball', precio: 100, stock: 100, descripcion:'Aumenta la eficacia de captura cuanto más avanzado esté el combate.'},
    {id: 9, clase: 'Ball', nombre: 'Buceo Ball', precio: 100, stock: 100, descripcion:'Aumenta la eficacia de captura con Pokémon del fondo del mar.'},
    {id: 10, clase: 'Ball', nombre: 'Acopio Ball', precio: 100, stock: 100, descripcion:'Aumenta la eficacia de captura con Pokémon de la misma especie a los capturados previamente.'},
    {id: 11, clase: 'Ball', nombre: 'Sana Ball', precio: 30, stock: 100, descripcion:'Es curativa. Restaura los Puntos de Salud del Pokémon capturado, y cura sus efectos de estado.'},
    {id: 12, clase: 'Ball', nombre: 'Ocaso Ball', precio: 100, stock: 100, descripcion:'Hace que sea más fácil capturar Pokémon en la oscuridad.'},
    {id: 13, clase: 'Ball', nombre: 'Veloz Ball', precio: 100, stock: 100, descripcion:'Tiene un índice de captura mayor si se utiliza al inicio de un encuentro con un Pokémon.'},
    {id: 14, clase: 'Ball', nombre: 'Master Ball', precio: 10000, stock: 100, descripcion:'La Ball definitiva. Atrapa sin fallar nunca.'},
    {id: 15, clase: 'Med', nombre: 'Poción', precio: 30, stock: 100, descripcion:'Restaura 20 Puntos de Salud a un Pokémon.'},
    {id: 16, clase: 'Med', nombre: 'Super Poción', precio: 70, stock: 100, descripcion:'Restaura 50 Puntos de Salud a un Pokémon.'},
    {id: 17, clase: 'Med', nombre: 'Hiper Poción', precio: 120, stock: 100, descripcion:'Restaura 200 Puntos de Salud a un Pokémon.'},
    {id: 18, clase: 'Med', nombre: 'Poción Máxima', precio: 250, stock: 100, descripcion:'Restaura todos los Puntos de Salud de un Pokémon.'},
    {id: 19, clase: 'Med', nombre: 'Restaura Todo', precio: 300, stock: 100, descripcion:'Restaura todos los Puntos de Salud y alivia todos los efectos de estado de un Pokémon.'},
    {id: 20, clase: 'Med', nombre: 'Antídoto', precio: 10, stock: 100, descripcion:'Cura el estado de envenenamiento.'},
    {id: 21, clase: 'Med', nombre: 'Antiparaliz', precio: 20, stock: 100, descripcion:'Cura el estado de parálisis.'},
    {id: 22, clase: 'Med', nombre: 'Antiquemar', precio: 25, stock: 100, descripcion:'Cura el estado de quemado.'},
    {id: 23, clase: 'Med', nombre: 'Antihielo', precio: 25, stock: 100, descripcion:'Cura el estado de congelamiento.'},
    {id: 24, clase: 'Med', nombre: 'Despertar', precio: 25, stock: 100, descripcion:'Cura el estado de dormido.'},
    {id: 25, clase: 'Med', nombre: 'Cura Total', precio: 60, stock: 100, descripcion:'Cura cualquier problema de estado.'},
    {id: 26, clase: 'Med', nombre: 'Revivir', precio: 150, stock: 100, descripcion:'Revive a un Pokémon debilitado y restaura la mitad de sus Puntos de Salud.'},

]; */ [];

let carrito = [];

const btnVaciar = document.getElementById('btnVaciar')
const btnComprar = document.getElementById('btnComprar')

const btnAdd = [...document.querySelectorAll('.btnAdd')]
const inputAdd = [...document.querySelectorAll('.inputAdd')]
//const inputMinus = [...document.querySelectorAll('.inputMinus')]
//const inputPlus = [...document.querySelectorAll('.inputPlus')]

const domCarrito = document.getElementById('carrito')
const domTotal = document.getElementById('total')

const input1 = document.getElementById('input1')

document.addEventListener('DOMContentLoaded',()=>{   
    btnAdd.forEach((btn) => {
        btn.onclick = (evt) =>{
            evt.preventDefault()

            let id = evt.target.getAttribute('data-id')
            let counter = 0
            let i = 1 

            inputAdd.forEach((input) => {
               if (input.getAttribute('data-id') === id) {
                counter = input.value
               };
            });

            do {
                carrito.push(evt.target.getAttribute('data-id'))
                i++
            } while (i <= counter);

            renderizarCarrito()
            actualizarLocalStorage()
        };
    });

   /* inputMinus.forEach((btn) => {
        btn.onclick = (evt) => {
            evt.preventDefault
            evt.parentNode.stepDown()
        };
    });

    inputPlus.forEach((btn) => {
        btn.onclick = (evt) => {
            evt.preventDefault
            evt.parentNode.stepUp()
        };
    }); */


    btnVaciar.addEventListener('click',(evt)=>{
        evt.preventDefault()
        vaciarCarrito()
    });

    btnComprar.addEventListener('click',(evt)=>{
        evt.preventDefault()
        vaciarCarrito()
    });
});

const pedirItems = async () => {
    const resp = await
    fetch('../js/data.json')
    const data = await resp.json()

    data.forEach ( (item) => {
        items.push({id: item.id, nombre: item.nombre, precio: item.precio})
    }); 
    
    cargarLocalStorage()
};

function renderizarCarrito() {
    domCarrito.textContent = ''
    const carritoSinDuplicados = [...new Set(carrito)]

    carritoSinDuplicados.forEach((item) => {
        const miItem = items.filter((itemDatos) => {
            return itemDatos.id === parseInt(item)
        });

        const UnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total
        }, 0);

        const nodo = document.createElement('li')
        nodo.classList.add('list-group-item', 'text-right', 'mx-2')
        nodo.textContent = `${UnidadesItem} x ${miItem[0].nombre} - $${miItem[0].precio}`
        const boton = document.createElement('button')
        boton.classList.add('btn', 'btn-danger', 'mx-5')
        boton.textContent = 'X'
        boton.style.marginLeft = '1rem'
        boton.dataset.item = item
        boton.addEventListener('click', borrarItemCarrito)

        nodo.appendChild(boton)
        domCarrito.appendChild(nodo)
    });
    domTotal.textContent = `Total: \$${calcularTotal()}`
};

function borrarItemCarrito(evt){
    const id = evt.target.dataset.item
    carrito.splice(carrito.indexOf(id),1)
    renderizarCarrito()
    actualizarLocalStorage()
};

function calcularTotal(){
    return carrito.reduce((total, item) => {
        const miItem = items.filter((itemDatos) => {
            return itemDatos.id === parseInt(item)
        });
        return total + miItem[0].precio
    }, 0);
};

function actualizarLocalStorage(){
    localStorage.setItem('carrito',JSON.stringify(carrito))
};

function cargarLocalStorage(){
    if (localStorage.getItem('carrito')!== null) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        renderizarCarrito()
    };
};

function vaciarCarrito() {
    carrito = []
    renderizarCarrito()
    localStorage.clear()
};

pedirItems()
renderizarCarrito();