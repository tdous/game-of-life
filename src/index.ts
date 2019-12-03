import { AnimLoopEngine } from 'anim-loop-engine';
import { Easel } from 'easel-js';

import { GameOfLifeMatrix } from './GOLMatrix';
import { drawBgGrid, drawLiveCells } from './GOLDrawingUtils';
import { getPreset } from './GOLPresets';

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
const btnTextActive = 'PAUSE';
const btnTextInactive = 'RUN';
const GOL = new GameOfLifeMatrix(gridSize);
const btnToggle = <HTMLButtonElement>document.getElementById('btn-toggle-sim');
const txtGridSize = <HTMLInputElement>document.getElementById('txt-grid-size');
const txtInterval = <HTMLInputElement>document.getElementById('txt-interval');

// Instantiate canvases and anim engine
const bgEasel = new Easel('g-o-l-bg');
const easel = new Easel('g-o-l');
const engine = new AnimLoopEngine();

// Assign defaults to control input fields
txtGridSize.value = gridSize.toString();
txtInterval.value = loopInterval.toString();

// Set grid cell size based on canvas width and number of divisions
cellSize = easel.w / gridSize;

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
      cellSize = easel.w / gridSize;
      GOL.gridSize = gridSize;
      drawBgGrid(bgEasel, gridSize, cellSize);
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
const presetBtns = document.getElementsByClassName('btn-preset');
for (let i = 0; i < presetBtns.length; i++) {
  const btn = presetBtns[i] as HTMLButtonElement;
  btn.onclick = (e: any) => {
    GOL.liveCells = getPreset(
      e.currentTarget.id.replace('preset-', ''),
      e.currentTarget.dataset.pad ? parseInt(e.currentTarget.dataset.pad) : null
    );
    drawLiveCells(easel, GOL.liveCells, cellSize);
  };
}
// <<< Presets

// Window blur stops animation, just in case
window.onblur = () => {
  stop();
};

// Handle cell clicks on the grid
const handleMouseDraw = (e: MouseEvent) => {
  if (mouseBtn !== 0) {
    const gridX = Math.floor((e.clientX - easel.rt.left) / cellSize);
    const gridY = Math.floor((e.clientY - easel.rt.top) / cellSize);

    if (gridX !== drawX || gridY !== drawY || mouseBtn !== lastMouseBtn) {
      drawX = gridX;
      drawY = gridY;

      let state = mouseBtn < 0 ? 1 : 0;

      // Toggle a cell's alive state
      GOL.setCellState(gridX, gridY, state);
      drawLiveCells(easel, GOL.liveCells, cellSize);
    }

    lastMouseBtn = mouseBtn;
  }
};
easel.cv.addEventListener('contextmenu', e => e.preventDefault());
easel.cv.onmousedown = (e: MouseEvent) => {
  mouseBtn = e.button === 0 ? -1 : 1;
  handleMouseDraw(e);
};
easel.cv.onmousemove = handleMouseDraw;
window.onmouseup = () => (mouseBtn = 0);

// Game update loop, receives timestamp from AnimLoopEngine
let tsFrom = 0;
const update = (ts: number = 0) => {
  if (ts - tsFrom >= loopInterval) {
    GOL.iterate();
    drawLiveCells(easel, GOL.liveCells, cellSize);
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
drawBgGrid(bgEasel, gridSize, cellSize);

// Add update task to engine
engine.addTask(update);

// Everything is initialized
