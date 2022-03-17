const carrito = [];
let total = 0;
let compra = "";
let local = [];

if (localStorage.getItem("carrito")) {
    console.log(localStorage.getItem("carrito"));
} else {
    let local = localStorage.setItem("carrito", "");
}

const listaMacetas = document.getElementById("listaMacetas");

async function getMacetasJSON() {
    const response = await fetch("/data.json");
    const macetasJson = await response.json();
    return macetasJson;
}

getMacetasJSON().then((macetas) => {
    macetas.forEach((maceta) => {
        const li = document.createElement(`li`);
        li.innerHTML = `
                <img class="imgMacetas" src="img/${maceta.nombre}.jpg"/>
                ${maceta.nombre}
                <button id="btn-${maceta.id}" class="btn">Agregar al carrito</button>
                `;
        listaMacetas.append(li);
        console.log(listaMacetas);
        console.log(document);
    });

    function agregarCarrito(id) {
        const maceta = macetas.find((p) => p.id == id);
        console.log("agrega", maceta);
        total += maceta.precio;
        carrito.push(maceta);
        // agrega la maceta al localStorage
        local.push(maceta.nombre);
        localStorage.setItem("carrito", local);

        Toastify({
            text: `agregaste ${maceta.nombre}. Click para cancelar`,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            className: "primero",
            onClick: () => {
                // saco el ultimo del array
                carrito.pop();
                console.log(carrito);
                local.pop();
                localStorage.setItem("carrito", local);
                document.getElementsByClassName("primero").duration = 0;
                Toastify({
                    text: `quitaste ${maceta.nombre}`,
                    duration: 3000,
                    gravity: "bottom",
                    position: "right",
                }).showToast();
            },
        }).showToast();
    }
    const btnRedonda = document.getElementById("btn-1");
    const btnCuadrada = document.getElementById("btn-2");
    const btnHexagonal = document.getElementById("btn-3");
    const btnBuda = document.getElementById("btn-4");
    const btnGrande = document.getElementById("btn-5");
    const btnPocillo = document.getElementById("btn-6");

    btnRedonda.onclick = () => agregarCarrito(1);
    btnCuadrada.onclick = () => agregarCarrito(2);
    btnHexagonal.onclick = () => agregarCarrito(3);
    btnBuda.onclick = () => agregarCarrito(4);
    btnGrande.onclick = () => agregarCarrito(5);
    btnPocillo.onclick = () => agregarCarrito(6);
});

function mostrarCarrito() {
    console.log(carrito);
    console.log(total);
    let listaCarritoHTML = "";
    for (const maceta of carrito) {
        listaCarritoHTML += `
            <p>${maceta.nombre} - $${maceta.precio}</p>
          
        `;
    }
    let compra = document.getElementById("compra");
    listaCarritoHTML += `<hr>
    <br>
    <p><strong>el total de su compra es de ${total}</strong></p>
    <br>
    <p>¡Gracias por su compra!</p>`;
    compra.innerHTML = listaCarritoHTML;
    Toastify({
        text: `Precio total ${total}. Gracias por su compra`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
    }).showToast();
    document.getElementById("btnCarrito").style.display = "none";
}

const btnCarrito = document.getElementById("btnCarrito");

btnCarrito.onclick = () => mostrarCarrito();
