const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const toolbar = document.getElementById('toolbar');
const saveImg = document.querySelector(".save-img");
const strokeInput = document.querySelector("#stroke");
const pencilBtn = document.querySelector("#pencilBtn");
const eraseBtn = document.querySelector("#eraseBtn");


let isPainting = false;
let lineWidth = 5;
let currentTool = 'pencil';
let originalStrokeStyle = '#000000'; //color por defecto


const lineWidthInput = document.querySelector('#lineWidth');
lineWidthInput.value = lineWidth;


// funcion de dibujar
const draw = (e) => {
    if (!isPainting) {
        return;
    }

    const canvasRect = canvas.getBoundingClientRect();

    ctx.lineTo(e.clientX - canvasRect.left, e.clientY - canvasRect.top);
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.stroke();
};




// controles de dibujo 

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;

    // obtenemos la posicion actualizada del canvas
    const canvasRect = canvas.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // cambia de herramienta
    if (e.target.id === 'pencilBtn') {
        currentTool = 'pencil';
        pencilBtn.classList.add('active');
        eraseBtn.classList.remove('active');
        ctx.globalCompositeOperation = 'source-over'; // restaura  el modo de dibujo
        ctx.strokeStyle = originalStrokeStyle; // restaura  el color del trazo
    } else if (e.target.id === 'eraseBtn') {
        currentTool = 'eraser';
        eraseBtn.classList.add('active');
        pencilBtn.classList.remove('active');
        ctx.globalCompositeOperation = 'destination-out'; // activamos el borrador
    }
});

// cambiamos el color 
toolbar.addEventListener('change', e => {
    if (e.target.id === 'stroke') {
        originalStrokeStyle = e.target.value;
        if (currentTool === 'pencil') {
            ctx.strokeStyle = originalStrokeStyle;
        }
    }
    if (e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
});






// guardamos la  imagen 
if (saveImg) {


    saveImg.addEventListener("click", () => {
        const link = document.createElement("a"); // creamos el elemento
        link.download = `my-paint${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}
// ajusta el tamaño del canvas
function resizeCanvas() {

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    const canvasRect = canvas.getBoundingClientRect();

    //guardamos el  contenido actual
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tempCtx.drawImage(canvas, 0, 0);

    // redimensiona  al nuevo tamaño
    canvas.width = canvasRect.width;
    canvas.height = canvasRect.height;

    // se adapta al  contenido antiguo al nuevo tamaño
    ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, canvas.width, canvas.height);

    // Restaurar propiedades de dibujo
    ctx.strokeStyle = originalStrokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";

}

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);