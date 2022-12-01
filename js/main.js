const items = [];

let carrito = [];

const pedirItems = async () => {
    const resp = await
    fetch('../js/data.json')
    const data = await resp.json()

    data.forEach ( (item) => {
        items.push({id: item.id, nombre: item.nombre, precio: item.precio})

        if (item.clase === 'Ball'){
            domBall.innerHTML += `
                    <div class="col">
                        <div class="card h-100 items">
                            <img src="assets/images/${item.clase}/${item.nombre}.webp" class="card-img-top imagesSizeBalls" alt="Imagen de ${item.nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${item.nombre}</h5>
                                <p class="card-text">${item.descripcion}</p>
                                <p class="card-text">Precio: $${item.precio}</p>
                                <p class="card-text">Stock: ${item.stock}</p>

                                <p class="col-md-3 col-lg-3 col-xl-5 d-flex">
                                    <button class="btn btn-light px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                        -
                                    </button>

                                    <input class="inputAdd form-control form-control-sm" id="inputId${item.id}" data-id=${item.id} min="0" max="20" name="quantity" value="1" type="number" readonly/>
                                    
                                    <button class="btn btn-light px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                        +
                                    </button>
                                </p>

                                <button class="btn btn-primary btnAdd" data-id=${item.id}>Agregar al Carrito</button>                
                            </div>
                        </div>
                    </div>`
        } else {
            domMed.innerHTML += `
                    <div class="col">
                        <div class="card h-100 items">
                            <img src="assets/images/${item.clase}/${item.nombre}.webp" class="card-img-top imagesSizeMeds" alt="Imagen de ${item.nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${item.nombre}</h5>
                                <p class="card-text">${item.descripcion}</p>
                                <p class="card-text">Precio: $${item.precio}</p>
                                <p class="card-text">Stock: ${item.stock}</p>

                                <p class="col-md-3 col-lg-3 col-xl-5 d-flex">
                                    <button class="btn btn-light px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                        -
                                    </button>

                                    <input class="inputAdd form-control form-control-sm" id="inputId${item.id}" data-id=${item.id} min="0" max="20" name="quantity" value="1" type="number" readonly/>
                                    
                                    <button class="btn btn-light px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                        +
                                    </button>
                                </p>

                                <button class="btn btn-primary btnAdd" data-id=${item.id}>Agregar al Carrito</button>                
                            </div>
                        </div>
                    </div>`
                
        };

    }); 

    cargarLocalStorage()
};

const btnVaciar = document.getElementById('btnVaciar')
const btnComprar = document.getElementById('btnComprar')



const btnAdd = [...document.querySelectorAll('.btnAdd')]
const inputAdd = [...document.querySelectorAll('.inputAdd')]

//const inputMinus = [...document.querySelectorAll('.inputMinus')]
//const inputPlus = [...document.querySelectorAll('.inputPlus')]

const domCarrito = document.getElementById('carrito')
const domTotal = document.getElementById('total')

const domBall = document.getElementById('Ball')
const domMed = document.getElementById('Med')


document.addEventListener('DOMContentLoaded',()=>{  

   /* btnAdd.forEach((btn) => {
        btn.onclick = (evt) =>{
            evt.preventDefault()

            let id = evt.target.getAttribute('data-id')
            let counter = document.getElementById(`inputId${id}`)

            carrito.push(counter.value)

            renderizarCarrito()
            actualizarLocalStorage()
        };
    }); */

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


    domBall.addEventListener('click', agregarCarrito)
    domMed.addEventListener('click', agregarCarrito)

    btnVaciar.addEventListener('click',(evt)=>{
        evt.preventDefault()
        vaciarCarrito()
    });

    btnComprar.addEventListener('click',(evt)=>{
        evt.preventDefault()
        vaciarCarrito()
    });
});

function agregarCarrito(evt){
    if (evt.target.classList.contains("btnAdd")){
        evt.preventDefault()
        let id = evt.target.getAttribute('data-id')
        let counter = document.getElementById(`inputId${id}`).value  
        let i = 1     

        do {
            carrito.push(id)
            i++
        } while (i <= counter);

        renderizarCarrito()
        actualizarLocalStorage() 
    };  
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
        boton.textContent = '-'
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