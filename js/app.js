// variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];




cargarEventListeners();
function cargarEventListeners() {
    // cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso)


    // elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)


    // vaciar el carrito 
    carrito.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el arreglo

        limpiarHTML(); // eliminamos todo el HTML
    })
}


// Funciones 
function agregarCurso(e) {
    e.preventDefault();


    if (e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }

}

// elimina un curso del carrito 
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML() // iterar sobre el carrito y mostrar su HTML
    }
}


// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso

function leerDatosCurso(curso) {
    //console.log(curso);

    // crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1

    }

    // Revisa si un elemento ya existe en el carrito 

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id) 
    if(existe) {
        //actualizamos la cantidad 
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++; // retorna el objeto actualizado
                return curso;
            }else {
                return curso; // retorna los objetos no duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else {
        //agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
 

    console.log(articulosCarrito);

    carritoHTML();
}


// Muestra el carrito de compras en el HTML

function  carritoHTML() {

    // limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        console.log(curso);
        const row = document.createElement('tr');
        row.innerHTML = `

           <td><img src="${curso.imagen}" width = "100"></td>
           <td>${curso.titulo}</td>
           <td>${curso.precio}</td>
           <td>${curso.cantidad}</td>
           <td>
              
             <a href="#" class ="borrar-curso" data-id ="${curso.id}"> X </a>
           
           </td>

        `;

        // agg el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row); 
        
    })
}


// elimina los cursos del tbody

function limpiarHTML() {
   // contenedorCarrito.innerHTML = '';


    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}


