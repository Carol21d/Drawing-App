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


toolbar.addEventListener('click', e =>{
    if(e.target.id === 'clear'){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

// cambiar el color 
toolbar.addEventListener('change', e =>{
    if(e.target.id === 'stroke'){
        ctx.strokeStyle = e.target.value;
    }
    
    if(e.target.id === 'lineWidth'){
        lineWidth = e.target.value;
    }
});


// funcion de dibujar
const draw  = (e) => {
    if(!isPainting){
        return;
    }

    const canvasRect = canvas.getBoundingClientRect();

    ctx.lineTo(e.clientX - canvasRect.left, e.clientY - canvasRect.top);
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.stroke();
}

// controles de dibujo 

canvas.addEventListener('mousedown', (e) =>{
    isPainting = true;

    // obtenemos la posicion actualizada del canvas
    const canvasRect = canvas.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;
   
    ctx.beginPath();
    ctx.moveTo (x, y);
});


canvas.addEventListener('mouseup' , e =>{
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);


// ajusta el tamaño del canvas
function resizeCanvas(){
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // redimensionamos el color del trazado 
    ctx.strokeStyle = document.getElementById('stroke').value;

}

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);