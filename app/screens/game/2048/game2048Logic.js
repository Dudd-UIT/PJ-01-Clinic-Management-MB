export const getEmptyBoard = () => {
  return [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
};

export const addRandomTile = (board) => {
  let emptyTiles = [];
  board.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      if (tile === 0) emptyTiles.push({ row: rowIndex, col: colIndex });
    });
  });

  if (emptyTiles.length === 0) return board;

  const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  board[randomTile.row][randomTile.col] = Math.random() < 0.9 ? 2 : 4;

  return board;
};

const rotateLeft = (matrix) => {
  const result = matrix[0].map((val, index) => matrix.map(row => row[index])).reverse();
  return result;
};

const rotateRight = (matrix) => {
  const result = matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
  return result;
};

const slideRowLeft = (row) => {
  const arr = row.filter(val => val);
  const missing = 4 - arr.length;
  const zeros = Array(missing).fill(0);
  return arr.concat(zeros);
};

const slideRowRight = (row) => {
  const arr = row.filter(val => val);
  const missing = 4 - arr.length;
  const zeros = Array(missing).fill(0);
  return zeros.concat(arr);
};

const combineRowLeft = (row) => {
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
    }
  }
  return row;
};

const combineRowRight = (row) => {
  for (let i = row.length - 1; i > 0; i--) {
    if (row[i] === row[i - 1]) {
      row[i] *= 2;
      row[i - 1] = 0;
    }
  }
  return row;
};

const moveLeft = (board) => {
  const newBoard = board.map(row => {
    row = slideRowLeft(row);
    row = combineRowLeft(row);
    row = slideRowLeft(row);
    return row;
  });
  return newBoard;
};

const moveRight = (board) => {
  const newBoard = board.map(row => {
    row = slideRowRight(row);
    row = combineRowRight(row);
    row = slideRowRight(row);
    return row;
  });
  return newBoard;
};

export const move = (board, direction) => {
  if (direction === 'up') {
    let rotated = rotateLeft(board);
    rotated = moveLeft(rotated);
    return rotateRight(rotated);
  }

  if (direction === 'down') {
    let rotated = rotateRight(board);
    rotated = moveLeft(rotated);
    return rotateLeft(rotated);
  }

  if (direction === 'left') {
    return moveLeft(board);
  }

  if (direction === 'right') {
    return moveRight(board);
  }
  
  return board;
};

export const isGameOver = (board) => {
  const directions = ['up', 'down', 'left', 'right'];
  for (let direction of directions) {
    const newBoard = move(board, direction);
    if (JSON.stringify(board) !== JSON.stringify(newBoard)) {
      return false;
    }
  }
  return true;
};