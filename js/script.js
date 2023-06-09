const usuarioReg = [{
    idUsuario: 1001,
    tipoUsuario: 0,
    email: 'marsilidylan@gmail.com',
    password: '1234',
    nombre: 'Dylan',
    apellido: 'Marsili',
    pais: 'Argentina',
    estado: 'Buenos Aires',
    localidad: 'San Martin',
    direccion: 'San Martin 1923'

}]

let usuEncontrado = {
    idUsuario: "",
    email: "",
    nombre: "",
    apellido: "",
    pais: "",
    estado: "",
    localidad: "",
    direccion: ""
}

let carrito = {
    idCarrito: "",
    usuario: {},
    contenidoCarrito: [],
    total: 0,
    items: 0
}

const listaProductos = []
let prodSeleccionados = []
let indexUsuEncontrado
let password
let acceso = false
let listaProd = ''
let usuarioRegistrado




class Usuarios {
    constructor(idUsuario, tipoUsuario, email, password, nombre, apellido, pais, estado, localidad, direccion) {
        this.idUsuario = idUsuario
        this.tipoUsuario = tipoUsuario
        this.email = email
        this.password = password
        this.nombre = nombre
        this.apellido = apellido
        this.pais = pais
        this.estado = estado
        this.localidad = localidad
        this.direccion = direccion

    }
    insertarUsuario() {
        usuarioReg.push(this)
    }
}

class Productos {
    constructor(idProd, nombreProd, descripProd, precioProd, stockProd, imagenProd, valoracion, palclaves, busqueda) {
        this.idProd = idProd
        this.nombreProd = nombreProd
        this.descripProd = descripProd
        this.precioProd = precioProd
        this.stockProd = stockProd
        this.imagenProd = imagenProd
        this.valoracion = valoracion
        this.palclaves = palclaves
        this.busqueda = busqueda
    }

    cargarProducto() {
        listaProductos.push(this)
    }
}


function createListFromJson(){
    fetch('./productos.json')
    .then((res) => res.json())
    .then((data) => {
        data.forEach(element => {
            const producto = new Productos(
                element.idProd,
                element.nombreProd,
                element.descripProd,
                element.precioProd,
                element.stockProd,
                element.imagenProd,
                element.valoracion,
                element.palclaves,
              `${element.nombreProd} ${element.descripProd} ${element.palclaves}`
            );
            producto.cargarProducto();
        });
        generateProducts(listaProductos);
    });
}


const nuevoUsuario = new Usuarios(1002, 0, '12', '12', 'Pedro', 'Martinez', 'Argentina', 'buenos Aires', 'La Plata', 'Calle 13 452, entre 65 y 66');
nuevoUsuario.insertarUsuario()


window.onload = (e) => {
    createListFromJson()
    generateProducts(listaProductos)
    verifyOpenShop() 
}


function verifUsuario(val) {

    if (usuarioReg.some((usu) => usu.email === val)) {

        indexUsuEncontrado = usuarioReg.findIndex(function (usuEnc) {
            return usuEnc.email === val
        })

        return true
    }
    return false
}

function createNewUser(arrNewUser) {

    const formNuevoUsuario = new Usuarios(
        usuarioReg[usuarioReg.length - 1].idUsuario + 1,
        0,
        arrNewUser[0],
        arrNewUser[1],
        arrNewUser[2],
        arrNewUser[3],
        arrNewUser[4],
        arrNewUser[5],
        arrNewUser[6],
        arrNewUser[7],

    )
    formNuevoUsuario.insertarUsuario()
}
function cargarUsuarioEnCheckout() {

}



function borrarLocalStorage() {
    localStorage.clear()
    toast('success', 'Local Storage borrado Se volvera a cargar la página en 3 segundos')
    setTimeout(winReload, 3000)

}



function winReload() {
    window.location.reload()
}
function saveShop() {
    localStorage.setItem('carritoLocal', JSON.stringify(carrito))

}

function verifyOpenShop() {

    const carritoAbierto = JSON.parse(localStorage.getItem('carritoLocal'))
    if (carritoAbierto !== null) {

        if (carritoAbierto.idCarrito !== "") {
            carrito = carritoAbierto
            generarItemsCarrito()
            generarItemsCheckout()
            actualizaTotalCarrito()
        } else {
            carrito.idCarrito = Date.now()
            saveShop()
        }
    } else {
        carrito.idCarrito = Date.now()
        saveShop()

    }

}




function generateProducts(arrProd) {

    contenedor.innerHTML = ""


    arrProd.forEach((producto, indice) => {

        let card = document.createElement("div");

        card.id = 'producto' + producto.idProd
        card.classList.add("w-full", "relative", "hover:scale-105", "transition-transform", "max-w-sm", "bg-gray-50", "border", "border-gray-200", "rounded-lg", "shadow", "terciary", "dark:border-gray-700");
        producto.stockProd > 0 ? card.classList.add("conStock") : ""

        let estrellas = ''
        for (let i = 0; i < Math.round(producto.valoracion); i++) {
            estrellas += `
        <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <title>First star</title>
                        <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                        </path>
                    </svg>
        `

        }
        for (let i = Math.round(producto.valoracion); i < 5; i++) {
            estrellas += `
        <svg aria-hidden="true" class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <title>First star</title>
                        <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                        </path>
                    </svg>
        `

        }

        card.innerHTML = `
        <div id="" class="">
            <div class=" flex justify-center imgcontainer">
                <img class="p-4 mt-4 rounded-3xl producimg" src="./img/${producto.imagenProd}" alt="product image" />
            </div>

            <div class="px-5 pb-5 md:self-end">
                <div >
                    <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${producto.nombreProd}</h5>
                </div>
                    <p class="text-lg font-light tracking-tight text-gray-600 dark:text-white">${producto.descripProd}</p>
                    <div class="flex items-center mt-2.5 mb-5">
                    ${estrellas}
                    <span
                    class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">${producto.valoracion}
                    </span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-3xl font-bold text-gray-900 dark:text-white">$${producto.precioProd}</span>
                    <button onClick="comprar(${producto.idProd})" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Agregar al Carrito

                    </button>
                    
                </div>
            </div>

        </div>
        <div class="absolute inset-0 ">

            <div class=" bg-gray-700 opacity-60 absolute inset-0 rounded-lg cursor-not-allowed flex items-center">
            </div>
            <p class="text-primary-600 opacity-100 absolute top-[45%] left-[15%] cursor-not-allowed font-bold text-center mx-auto text-5xl -rotate-45" >Sin Stock</p>
            
        </div>

        `


        contenedor.appendChild(card);
    })

}

function devolver(id) {

    const prodSelec = listaProductos.find(obj => obj.idProd == id)

    if (carrito.contenidoCarrito.some(e => {
        return e[0].idProd == prodSelec.idProd
    })) {
        const indice2 = carrito.contenidoCarrito.find(e => {
            return e[0].idProd == prodSelec.idProd
        })
        if (indice2[1] > 1) {
            indice2[1]--
            toast('success', `una unidad de 
                ${prodSelec.nombreProd} retirada del carrito
                `
            )
            calcularTotal()

        } else {
            const indice3 = carrito.contenidoCarrito.findIndex(e => {
                return e[0].idProd == prodSelec.idProd
            })
            carrito.contenidoCarrito.splice(indice3, 1)
            calcularTotal()
        }
    }
}

function devolverTodo(id) {

    const prodSelec = listaProductos.find(obj => obj.idProd == id)
    const indice3 = carrito.contenidoCarrito.findIndex(e => {
        return e[0].idProd == prodSelec.idProd
    })
    confirmacion('error', `esta seguro que desea eliminar el producto ${prodSelec.nombreProd}?`, prodSelec.nombreProd)
        .then(() => {
            carrito.contenidoCarrito.splice(indice3, 1)
            calcularTotal()
        })
        .catch(() => {
            toast('success', 'Producto no eliminado')
        })
}

function vaciarCarrito(){
    carrito.contenidoCarrito.splice(0, carrito.contenidoCarrito.length)
    calcularTotal()
}

function comprar(id) {

    const prodSelec = listaProductos.find(obj => obj.idProd == id)

    if (carrito.contenidoCarrito.length === 0) {
        carrito.contenidoCarrito.push([prodSelec, 1])
        toast('success', `
                    ${prodSelec.nombreProd} agregado al carrito
                    `
        )
        calcularTotal()

    } else {
        if (carrito.contenidoCarrito.some(e => {
            return e[0].idProd == prodSelec.idProd
        })) {
            const indice2 = carrito.contenidoCarrito.find(e => {
                return e[0].idProd == prodSelec.idProd
            })
            if (indice2[1] < prodSelec.stockProd) {
                indice2[1]++
                toast('success', `
                    ${prodSelec.nombreProd} agregado al carrito
                    `
                )
                calcularTotal()

            } else {
                toast('error', 'Lo sentimos pero no queda mas Stock')
            }
        } else {
            carrito.contenidoCarrito.push([prodSelec, 1])
            toast('success', `
                    ${prodSelec.nombreProd} agregado al carrito
                    `)
            calcularTotal()

        }
    }

};

function cuentaProductos() {
    itemsBotonCarrito.innerHTML = carrito.items
}

function calcularTotal() {
    let valorTotal = 0
    let itemsTotal = 0
    carrito.contenidoCarrito.forEach(element => {
        let valorParcial = 0
        for (let i = 0; i < element[1]; i++) {
            valorParcial += element[0].precioProd

        }
        valorTotal += valorParcial
        itemsTotal += element[1]

    })
    carrito.total = valorTotal
    carrito.items = itemsTotal
    carrito.items > 0 ? (itemsBotonCarrito.classList.remove('hidden'), itemsBotonCarrito.classList.add('inline-flex')) : ""
    carrito.items >= 10 ? itemsBotonCarrito.classList.add("w-6") : ""
    cuentaProductos()
    generarItemsCarrito()
    actualizaTotalCarrito()
    generarItemsCheckout()
    saveShop()


}


function generarItemsCheckout() {

    sectionProductosCheckout.innerHTML = ""
    let itemcheckout = document.createElement('div')
    itemcheckout.classList.add('flex', 'flex-col')

    let cadaItemCheckout = ""

    carrito.contenidoCarrito.forEach((prod) => {

        cadaItemCheckout +=
            `<div id="itemCheckout${prod[0].idProd}" class="flex flex-auto m-2 max-w-[100%]">
                     
        <div class="w-8 min-w-[2rem]  h-8 rounded-full overflow-hidden ">
          <img src="./img/${prod[0].imagenProd}" alt="">
        </div>
        <div class=" flex-grow max-w-full ml-2 text-gray-800 dark:text-white">
          <h4 class=" max-w-[100%]  mr-0.5">${prod[0].nombreProd} X ${prod[1]}</h4>
        

        </div>
        <div class="text-black dark:text-white font-extrabold">
        $${prod[0].precioProd}
        </div>

      </div>
      <hr class="bg-gray-300 h-0.5 mx-2">
        `

    })
    itemcheckout.innerHTML = cadaItemCheckout
    sectionProductosCheckout.appendChild(itemcheckout)

}


function generarItemsCarrito() {
    sectionProductos.innerHTML = ""
    let itemCarrito = document.createElement('div')

    let cadaItem = ""

    carrito.contenidoCarrito.forEach((prod, index) => {
        cadaItem +=
            `
        <div id="item${prod[0].idProd}" class="">
          <div class="flex justify-between m-2">
            <div class="w-16 min-w-[4rem] h-16 rounded-full overflow-hidden border border-gray-300">
              <img src="./img/${prod[0].imagenProd}" alt="">
            </div>
            <div class="flex-grow max-w-[110px] sm:max-w-[170px]  ml-2 text-gray-800 dark:text-white">
              <h4 class=" truncate mr-0.5">${prod[0].nombreProd}</h4>
              <h5 class="font-semibold ">$${prod[0].precioProd}</h5>
              <div class="flex">
                <div>
                  <button onclick="devolver(${prod[0].idProd})">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                    </svg>
                  </button>
                    
                </div>
                <div class=" mx-2">
                    ${prod[1]}
                </div>
                <div>
                  <button onclick="comprar(${prod[0].idProd})">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                  </button>
                    
                  
                </div>
              </div>
            </div>
            <div class="text-black dark:text-white font-extrabold">
              $${(prod[0].precioProd * prod[1])}
            </div>
            <div class="text-gray-800 dark:text-white mx-1">
              <button onclick="devolverTodo(${prod[0].idProd})">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
              
            </div>
          </div>
          <hr class="bg-gray-300 h-0.5 mx-2">
        </div>
    `
    })
    itemCarrito.innerHTML = cadaItem
    sectionProductos.appendChild(itemCarrito)

}

function actualizaTotalCarrito() {
    totalDiv.innerHTML = `$${carrito.total}`
    totalDivCheckout.innerHTML = `$${carrito.total}`
    toogleCarritoYTotales()
    saveShop()

}