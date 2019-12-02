const bgColor = '#DDD';

// Draw a single cell
const drawBgCell = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  cellSize: number
) => {
  ctx.beginPath();
  ctx.rect(x * cellSize, y * cellSize, cellSize, cellSize);
  ctx.fill();
};

// Clear canvas
export const clearCells = (
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number
) => {
  ctx.clearRect(0, 0, W, H);
};

// Generate background grid
export const drawBgGrid = (
  ctx: CanvasRenderingContext2D,
  gridSize: number,
  cellSize: number
) => {
  ctx.fillStyle = bgColor;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (i % 2 === 0) {
        if (j % 2 === 0) {
          drawBgCell(ctx, i, j, cellSize);
        }
      } else {
        if (j % 2 !== 0) {
          drawBgCell(ctx, i, j, cellSize);
        }
      }
    }
  }
};

// Draw live cells
export const drawLiveCells = (
  ctx: CanvasRenderingContext2D,
  liveCells: number[][],
  cellSize: number
) => {
  ctx.fillStyle = '#484';
  for (let i in liveCells) {
    for (let j in liveCells[i]) {
      const numI = parseInt(i);
      const numJ = parseInt(j);

      drawBgCell(ctx, numJ, numI, cellSize);
    }
  }
};
