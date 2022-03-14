const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
})

function buscarClima(e) {
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === ""|| pais === "") {
      mostrarError('Todos los campos son obligatorios');
        return;
    }

consultarAPI(ciudad,pais);

}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta) {

        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100','border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `

            <strong class = "font-bold">Error</strong>
            <span class = "block">${mensaje}</span>

        `
        container.appendChild(alerta);

        //Se elimina la alerta despues de 2segundos

        setTimeout(() => {
            alerta.remove();
        }, 2000);
    }

    
}

function consultarAPI(ciudad, pais) {

    const appId = 'f7b144a35ac82400dfaac93446ad1ce8';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos);
            if (datos.cod === "404") {
                mostrarError('Ciudad no encontrada')
            }
        })
}