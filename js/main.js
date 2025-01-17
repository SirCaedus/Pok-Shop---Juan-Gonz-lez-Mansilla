const items = [];

let carrito = [];

const pedirItems = async () => {
    const resp = await
    fetch('js/data.json')
    const data = await resp.json()

    data.forEach ( (item) => {
        items.push({id: item.id, nombre: item.nombre, precio: item.precio})

        if (item.clase === 'Ball'){
            domBall.innerHTML += `
                    <div class="col">
                        <div class="card h-100 border-info text-center">
                            <img src="assets/images/${item.clase}/${item.nombre}.webp" class="card-img-top imagesSize" alt="Imagen de ${item.nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${item.nombre}</h5>
                                <p class="card-text">${item.descripcion}</p>
                                <p class="card-text">Precio: $${item.precio}</p>
                            </div>
                            <div class="card-footer bg-transparent border-info">
                                <p class="d-flex">
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
                        <div class="card h-100 border-info text-center">
                            <img src="assets/images/${item.clase}/${item.nombre}.webp" class="card-img-top imagesSize" alt="Imagen de ${item.nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${item.nombre}</h5>
                                <p class="card-text">${item.descripcion}</p>
                                <p class="card-text">Precio: $${item.precio}</p>
                            </div>
                            <div class="card-footer bg-transparent border-info">
                                <p class="d-flex">
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
                
        };

    }); 

    cargarLocalStorage()
};

const btnVaciar = document.getElementById('btnVaciar')
const btnComprar = document.getElementById('btnComprar')

const domCarrito = document.getElementById('carrito')
const domCountCarrito = document.getElementById('countCarrito')
const domDisplayCarrito = document.getElementById('displayCarrito')
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
        comprarCarrito()
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
                    <li class="list-group-item text-right">
                        ${item.cantidad} x ${items[id-1].nombre} - $${items[id-1].precio}
                        <button class="btn btn-danger" data-item=${id} style="margin-left: 1rem;">-</button>
                    </li>
        `
    });
    domTotal.textContent = `Total: \$${calcularTotal()}`
    domCountCarrito.textContent = `${contarTotal()}`
    
    if (btnVaciar.classList.contains('disabled')){
        btnVaciar.classList.remove('disabled')
        btnComprar.classList.remove('disabled')
    };
    
    if (carrito.length === 0){
        btnVaciar.classList.add('disabled')
        btnComprar.classList.add('disabled')
    };
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

function contarTotal(){
    let total = 0
    if ((carrito.length)!== 0) {
        carrito.forEach ((item) => {
            total += item.cantidad
        });
    };
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
    Swal.fire({
        title: '¿Estás seguro que deseas borrar el contenido del carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#0d6efd',
        confirmButtonText: '¡Vaciemos el carrito!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = []
            renderizarCarrito()
            localStorage.clear()
            Swal.fire({
                title: '¡Listo!',
                text: 'El carrito ha sido vaciado',
                icon: 'success'
            })
        };
    })
};

function comprarCarrito() {
    Swal.fire({
        title: '¿Estás seguro que deseas comprar estos objetos?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#0d6efd',
        confirmButtonText: '¡Compremos!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Procesando...',
                text: 'Espere unos segundos',
                showConfirmButton: false
            })
            setTimeout (() => {
                carrito = []
                renderizarCarrito()
                localStorage.clear() 
                Swal.fire({
                    title: '¡Listo!',
                    text: 'Espero que disfrutes tu compra',
                    icon: 'success'
                }) 
            },2000)
        };
    })
};

function visibilidad (){
    domDisplayCarrito.classList.toggle('visibilityFalse')
    domDisplayCarrito.classList.toggle('visibilityTrue')
};

pedirItems()
renderizarCarrito();