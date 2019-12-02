export class GameOfLifeMatrix {
  liveCells: number[][] = [];

  constructor(public gridSize: number) {}

  // Set a cell live, initializing a matrix row if needed
  private setCellLive = (cellMatrix: number[][], x: number, y: number) => {
    cellMatrix[y] = cellMatrix[y] || [];
    cellMatrix[y][x] = 1;
  };

  // Get a cell's state; it's alive status plus neighbour count
  private getCellState(x: number, y: number) {
    let isAlive = this.liveCells[y] && this.liveCells[y][x];
    let numNeighbours = 0;

    // Check a range from -1 to +1 from this cell, both axes
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }

        // Get neighbour cell position to check
        let nY = y + i;
        let nX = x + j;

        // If out of bounds, wrap around
        if (nY < 0) {
          nY = this.gridSize - 1;
        } else if (nY >= this.gridSize) {
          nY = 0;
        }
        if (nX < 0) {
          nX = this.gridSize - 1;
        } else if (nX >= this.gridSize) {
          nX = 0;
        }

        // If a neighbour exists here increment neighbour count
        if (this.liveCells[nY] && this.liveCells[nY][nX]) {
          numNeighbours++;
        }
      }
    }
    return { isAlive, numNeighbours };
  }

  // Perform an iteration, in life terms, a generation
  iterate() {
    const nextCells: number[][] = [];

    // Sweep the whole grid
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        // Get cell state
        const state = this.getCellState(j, i);

        if (
          // If it's alive with 2 or 3 neighbours, stay alive
          (state.isAlive &&
            state.numNeighbours >= 2 &&
            state.numNeighbours <= 3) ||
          // Or if not alive with 3 neighbours, spring into life
          (!state.isAlive && state.numNeighbours === 3)
        ) {
          this.setCellLive(nextCells, j, i);
        }
      }
    }

    this.liveCells = nextCells;
  }

  // Set a cell's state
  setCellState(x: number, y: number, alive: number) {
    let updateCells: number[][] = [];

    // Loop through the grid, clicked to live, keep live cells we didn't click
    for (let i = 0; i < this.gridSize; i++) {
      // Skip unclicked empty row
      if (!this.liveCells[i] && i !== y) {
        continue;
      }

      // Copy any existing row cells
      updateCells[i] = this.liveCells[i] || [];

      for (let j = 0; j < this.gridSize; j++) {
        if (i === y && j === x) {
          if (alive) {
            this.setCellLive(updateCells, j, i);
          } else if (updateCells[i]) {
            delete updateCells[i][j];
          }
        } else {
          if (this.liveCells[i] && this.liveCells[i][j]) {
            this.setCellLive(updateCells, j, i);
          }
        }
      }
    }

    this.liveCells = updateCells;
  }
}
