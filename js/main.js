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

                                    <input class="form-control form-control-sm" id="inputId${item.id}" data-id=${item.id} min="1" max="20" name="quantity" value="1" type="number" readonly/>
                                    
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

                                    <input class="form-control form-control-sm" id="inputId${item.id}" data-id=${item.id} min="1" max="20" name="quantity" value="1" type="number" readonly/>
                                    
                                    <button class="btn btn-light px-2 onclick="this.parentNode.querySelector('input[type=number]').stepUp()"">
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

const domCarrito = document.getElementById('carrito')
const domTotal = document.getElementById('total')

const domBall = document.getElementById('Ball')
const domMed = document.getElementById('Med')


document.addEventListener('DOMContentLoaded',()=>{  
    domBall.addEventListener('click', agregarCarrito)
    domMed.addEventListener('click', agregarCarrito)
    domCarrito.addEventListener('click',borrarItemCarrito)

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
        id = parseInt(id)
        let counter = document.getElementById(`inputId${id}`).value
        counter = parseInt(counter)   
        if (carrito.some(item => item.id === id)){
            for (const productos of carrito) {
                if (productos.id === id){
                    productos.cantidad += counter
                };
            };
        } else {
            carrito.push({id: id, cantidad: counter})
        };   

        renderizarCarrito()
        actualizarLocalStorage() 
    };
};

function renderizarCarrito() {
    domCarrito.textContent = ''
    carrito.forEach((item) => {
        let id = item.id
        id = parseInt(id)
        domCarrito.innerHTML +=`
                    <li class="list-group-item text-right mx-2">
                        ${item.cantidad} x ${items[id-1].nombre} - $${items[id-1].precio}
                        <button class="btn btn-danger mx-5" data-item=${id} style="margin-left: 1rem;">-</button>
                    </li>
        `
    });
    domTotal.textContent = `Total: \$${calcularTotal()}`
};

function borrarItemCarrito(evt){
    if (evt.target.classList.contains("btn")){
        let id = evt.target.dataset.item
        id = parseInt(id)
        carrito.forEach((item) => {
            if (item.id === id) {
                item.cantidad -= 1 
                if (item.cantidad === 0) {
                    let index = carrito.indexOf(item)
                    carrito.splice(index,1)       
                };
            };
        });
    
        renderizarCarrito()
        actualizarLocalStorage()
    };
};

function calcularTotal(){
    let total = 0
    carrito.forEach((item) => {
        let id = item.id
        const resultado = items.find( (it) => it.id === id)
        let precioProd = resultado.precio
        total += item.cantidad * precioProd
    });
    return total
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