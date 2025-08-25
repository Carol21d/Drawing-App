// Se obtiene el elemento <canvas> del DOM utilizando getElementById, y se obtiene su contexto de representación bidimensional ('2d') mediante getContext. El contexto es necesario para realizar operaciones de dibujo en el lienzo.
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');



// Variables para rastrear el estado del mouse
// Se declaran variables para rastrear el estado del mouse (isDrawing indica si se está dibujando), y las coordenadas lastX y lastY para almacenar la posición del mouse en el último evento.
let isDrawing = false;
let lastX = 0;
let lastY = 0;




// Se agregan cuato eventos del ratón
canvas.addEventListener('mousedown', startDrawing);//Inicio del dibujo
canvas.addEventListener('mousemove', draw);//dibujo continuo
canvas.addEventListener('mouseup', stopDrawing);//fin del dibujo
canvas.addEventListener('mouseout', stopDrawing);//cuando el ratón sale del area del canva, tambien se considera como fin del dibujo



// Función para comenzar a dibujar
function startDrawing(e) {
  isDrawing = true;
  [lastX, lastY] = [e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop];
}
//startDrawing se llama cuando se presiona el botón del mouse. Establece isDrawing en true y actualiza las coordenadas lastX y lastY con la posición actual del mouse relativa al canvas.



// Función para dibujar
function draw(e) {
  if (!isDrawing) return;
  const [x, y] = [e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop];

  // Configurar el estilo del trazo
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#000';

  // Comenzar el trazo
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);

  // Dibujar una línea hasta la posición actual
  ctx.lineTo(x, y);

  // Aplicar el trazo
  ctx.stroke();

  // Actualizar la última posición
  // draw se llama mientras el mouse se mueve. Si isDrawing es true, obtiene las coordenadas actuales del mouse, configura el estilo del trazo, comienza un nuevo trazo (beginPath), mueve el punto de inicio a la posición anterior (moveTo), dibuja una línea hasta la posición actual (lineTo), y aplica el trazo (stroke). Luego, actualiza las coordenadas lastX y lastY.
  [lastX, lastY] = [x, y];
}



// Función para dejar de dibujar
//stopDrawing se llama cuando el mouse se levanta o sale del área del canvas. Establece isDrawing en false, indicando que se ha completado el dibujo.
function stopDrawing() {
  isDrawing = false;
}