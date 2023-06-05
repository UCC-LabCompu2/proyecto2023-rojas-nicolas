const header = document.querySelector('.header');
const openModal = document.getElementById('open');
const modalBien = document.querySelector('.modalBien');
const modalMal = document.querySelector('.modalMal');
const closeModal = document.querySelectorAll('.modal_close');
const ganancia = document.getElementById('ganancia');
const tasa = document.getElementById('tasa');

/**
 * Realiza las acciones necesarias cuando se produce el evento 'scroll' en la ventana.
 * @method scrollEventHandler
 * @param {Event} event - El objeto del evento 'scroll'
 */
window.addEventListener('scroll', () => {
    if(window.scrollY > 100){
        header.classList.add('header-scrolled');
    } else if (window.scrollY <= 100){
        header.classList.remove('header-scrolled');
    }
})

/**
 * Verifica que los datos ingresados sean los correctos y muestra la ventana modal correspondiente.
 * @method openModal (funcion anonima)
 * @param {Event} e - El objeto del evento 'click';
 * @param {number} valor - Contiene el valor del input que ingreso el usuario
 */

openModal.addEventListener('click', function (e) {
    e.preventDefault();

    let gananciaValor = ganancia.value.replace(/[,$.]/g, '');
    let tasaValor = tasa.value.replace(/[,%]/g, '');

    if (gananciaValor === '' || tasaValor === '') {
        alert('Por favor, rellena ambos campos');
        return;
    }

    if (isNaN(gananciaValor) || isNaN(tasaValor)) {
        alert('El valor ingresado es incorrecto');
        ganancia.value = '';
        tasa.value = '';
    } else {
        gananciaValor = parseFloat(gananciaValor);
        tasaValor = parseFloat(tasaValor);

        if ((gananciaValor === 10000 || ganancia.value === '$10,000') && (tasaValor === 20 || tasa.value === '20%')) {
            modalBien.classList.add('modal_show');
            document.body.style.overflow = 'hidden';
            header.style.display = 'none';
            const canvas = document.getElementById('myCanvasBien');
            const context = canvas.getContext('2d');
            context.strokeStyle = 'green';
            context.lineWidth = 4;
            context.font = '100px Arial';
            const symbol = '✔️';
            const textWidth = context.measureText(symbol).width;
            const x = (canvas.width - textWidth) / 2; // Centrado horizontal
            context.fillText(symbol, x, 150);
        } else {
            modalMal.classList.add('modal_show');
            document.body.style.overflow = 'hidden';
            header.style.display = 'none';
            const canvas = document.getElementById('myCanvasMal');
            const context = canvas.getContext('2d');
            context.strokeStyle = 'red';
            context.lineWidth = 4;
            context.font = '100px Arial';
            const symbol = '❌';
            const textWidth = context.measureText(symbol).width;
            const x = (canvas.width - textWidth) / 2; // Centrado horizontal
            context.fillText(symbol, x, 150);
        }
    }
});

closeModal.forEach(function (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        modalBien.classList.remove('modal_show');
        modalMal.classList.remove('modal_show');
        header.style.display = 'flex';
        document.body.style.overflow = 'auto';
    });
});

