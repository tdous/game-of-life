import { AnimLoopEngine } from 'anim-loop-engine';

import { GameOfLifeMatrix } from './GOLMatrix';
import { clearCells, drawBgGrid, drawLiveCells } from './GOLDrawingUtils';
import { getPreset } from './GOLPresets';

const engine = new AnimLoopEngine();

// Defaults, declarations and elements
let cellSize: number;
let lastMouseBtn = 0;
let mouseBtn = 0;
let running = false;
let loopInterval = 150;
let gridSize = 20;
let drawX = 0;
let drawY = 0;
let onChangeTimeoutId: number = 0;
const GOL = new GameOfLifeMatrix(gridSize);
const btnTextActive = 'PAUSE';
const btnTextInactive = 'RUN';
const btnToggle = <HTMLButtonElement>document.getElementById('btn-toggle-sim');
const txtGridSize = <HTMLInputElement>document.getElementById('txt-grid-size');
const txtInterval = <HTMLInputElement>document.getElementById('txt-interval');
const bgCanvas = <HTMLCanvasElement>document.getElementById('g-o-l-bg');
const canvas = <HTMLCanvasElement>document.getElementById('g-o-l');
const bgCtx: CanvasRenderingContext2D = bgCanvas.getContext('2d')!;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

// Assign defaults to control input fields
txtGridSize.value = gridSize.toString();
txtInterval.value = loopInterval.toString();

// >>> Setup canvas
const rect = canvas.getBoundingClientRect();
const canvasStyle: any = window.getComputedStyle(canvas);
const W = parseInt(canvasStyle.width);
const H = parseInt(canvasStyle.height);
bgCanvas.setAttribute('width', canvasStyle.width);
canvas.setAttribute('width', canvasStyle.width);
if (W < H) {
  bgCanvas.style.height = canvasStyle.width;
  canvas.style.height = canvasStyle.width;
  bgCanvas.setAttribute('height', canvasStyle.width);
  canvas.setAttribute('height', canvasStyle.width);
} else {
  bgCanvas.setAttribute('height', canvasStyle.height);
  canvas.setAttribute('height', canvasStyle.height);
}

// Set grid cell size based on canvas width and number of divisions
cellSize = W / gridSize;

// >>> Game control events
// Run/pause button toggle
btnToggle.onclick = () => {
  if (!running) {
    start();
  } else {
    stop();
  }
};

// Grid size value change
txtGridSize.onkeyup = (e: any) => {
  clearTimeout(onChangeTimeoutId);
  onChangeTimeoutId = setTimeout(() => {
    let newGridSize = parseInt(e.target.value);
    if (newGridSize !== gridSize) {
      gridSize = newGridSize;
      cellSize = W / gridSize;
      GOL.gridSize = gridSize;
      clearCells(bgCtx, W, H);
      drawBgGrid(bgCtx, gridSize, cellSize);
    }
  }, 1000);
};

// Animation interval value change
txtInterval.onkeyup = (e: any) => {
  clearTimeout(onChangeTimeoutId);
  onChangeTimeoutId = setTimeout(() => {
    loopInterval = e.target.value;
  }, 1000);
};
// <<<  Game control events

// >>> Presets
const loadPreset = (preset: string) => {
  GOL.liveCells = getPreset(preset);
  clearCells(ctx, W, H);
  drawLiveCells(ctx, GOL.liveCells, cellSize);
};
const presetBtns = document.getElementsByClassName('btn-preset');
for (let i = 0; i < presetBtns.length; i++) {
  const btn = presetBtns[i] as HTMLButtonElement;
  btn.onclick = e => {
    loadPreset((<HTMLElement>e.currentTarget).id.replace('preset-', ''));
  }
}
// <<< Presets

// Window blur stops animation, just in case
window.onblur = () => {
  stop();
};

// Handle cell clicks on the grid
const handleMouseDraw = (e: MouseEvent) => {
  if (mouseBtn !== 0) {
    const gridX = Math.floor((e.clientX - rect.left) / cellSize);
    const gridY = Math.floor((e.clientY - rect.top) / cellSize);

    if (gridX !== drawX || gridY !== drawY || mouseBtn !== lastMouseBtn) {
      drawX = gridX;
      drawY = gridY;

      let state = mouseBtn < 0 ? 1 : 0;

      // Toggle a cell's alive state
      GOL.setCellState(gridX, gridY, state);
      clearCells(ctx, W, H);
      drawLiveCells(ctx, GOL.liveCells, cellSize);
    }

    lastMouseBtn = mouseBtn;
  }
};
canvas.addEventListener('contextmenu', e => e.preventDefault());
canvas.onmousedown = (e: MouseEvent) => {
  mouseBtn = e.button === 0 ? -1 : 1;
  handleMouseDraw(e);
};
canvas.onmousemove = handleMouseDraw;
window.onmouseup = () => (mouseBtn = 0);

// Game update loop, receives timestamp from AnimLoopEngine
let tsFrom = 0;
const update = (ts: number = 0) => {
  if (ts - tsFrom >= loopInterval) {
    GOL.iterate();
    clearCells(ctx, W, H);
    drawLiveCells(ctx, GOL.liveCells, cellSize);
    tsFrom = ts;
  }
};

// Start/stop
const start = () => {
  engine.start();
  btnToggle.innerHTML = btnTextActive;
  running = true;
};
const stop = () => {
  engine.stop();
  btnToggle.innerHTML = btnTextInactive;
  running = false;
};

// Draw the BG grid
drawBgGrid(bgCtx, gridSize, cellSize);

// Add update task to engine
engine.addTask(update);

// Everything is initialized
