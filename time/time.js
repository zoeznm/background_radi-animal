const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const dotCount = 3000;
const size = 4;
const f = 3;
const dots = [];
const v = 128; 
const l = 127; 
const rot = 80;
let w = 0;
let h = 0;
let cX = 0;
let cY = 0;
let mD = 0;
let mouseDown = false;

let nX = 0;
let nY = 0;
let sX = 0;
let sY = 0;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  cX = w / 2;
  cY = h / 2;
  mD = Math.sqrt((cX * cX) + (cY * cY));
  
  nX = Math.sqrt((w / h * dotCount) + ((w - h) * (w - h) / ((4 * h) * (4 * h)))) - ((w - h) / (2 * h));
  nY = dotCount / nX;
  sX = w / (nX - 1);
  sY = h / (nY - 1);
  
  for (let i = 0; i < dotCount; i++) {
    const x = sX * (i % nX);
    const y = sY * (i / nX | 0);
    const t = Math.random() * 3000;
    const c = Math.random() * 360 | 0;
    dots[i] = { x, y, oX: x, oY: y, t, c };
  }
}

window.addEventListener('resize', resize);
window.addEventListener('mousedown', () => { mouseDown = true });
document.addEventListener('touchstart', () => { mouseDown = true });
window.addEventListener('mouseup', () => { mouseDown = false });
document.addEventListener('touchend', () => { mouseDown = false });
resize();

function draw(time = 0) {
  ctx.clearRect(0, 0, w, h);

  for (let i = 0; i < dotCount; i++) {
    const d = dots[i];
    const t = (d.t + time) * 0.005;
    const a = Math.sin(t);
    
    if (Math.abs(d.x - d.oX) > f || Math.abs(d.y - d.oY) > f) {
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    } else {
      ctx.fillStyle = `rgba(0, 255, 1, ${a})`;
    }
    
    
    ctx.fillRect(d.x, d.y, size, size);
  }
  requestAnimationFrame(draw);
}

draw();
