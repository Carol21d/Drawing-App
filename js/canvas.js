// Se obtiene el elemento <canvas> del DOM utilizando getElementById, y se obtiene su contexto de representación bidimensional ('2d') mediante getContext. El contexto es necesario para realizar operaciones de dibujo en el lienzo.
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const toolbar = document.getElementById('toolbar')



const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;


canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;


let isPainting = false;
let lineWidth = 5;
let startX;
let startY;


toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

// cambiar el color 
toolbar.addEventListener('change', e => {
    if (e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if (e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
});


// funcion de dibujar
const draw = (e) => {
    if (!isPainting) {
        return;
    }

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();
}


// controles de dibujo 

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});


canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);


// comprobamos si estamos dibujando o no