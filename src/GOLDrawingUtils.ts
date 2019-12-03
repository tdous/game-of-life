import { Easel } from 'easel-js';
import { rect } from 'easel-js/lib/draw/rect';

const aliveColor = '#484';
const bgColor = '#DDD';

// Generate background grid
export const drawBgGrid = (
  easel: Easel,
  gridSize: number,
  cellSize: number
) => {
  easel.cx.fillStyle = bgColor;
  easel.wipe();
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      switch (true) {
        case i % 2 === 0 && j % 2 === 0:
        case i % 2 !== 0 && j % 2 !== 0:
          rect(easel.cx, j * cellSize, i * cellSize, cellSize, cellSize, 'f');
      }
    }
  }
};

// Draw live cells
export const drawLiveCells = (
  easel: Easel,
  liveCells: number[][],
  cellSize: number
) => {
  easel.cx.fillStyle = aliveColor;
  easel.wipe();
  for (let i in liveCells) {
    for (let j in liveCells[i]) {
      rect(
        easel.cx,
        parseInt(j) * cellSize,
        parseInt(i) * cellSize,
        cellSize,
        cellSize,
        'f'
      );
    }
  }
};
