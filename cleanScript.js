const Player = (() => {
	function createPlayer(name, symbol) {
		let score = 0;

		const incrementScore = () => score++;

		const getScore = () => score;

		const getSymbol = () => symbol;

		const getName = () => name;

		return { incrementScore, getName, getSymbol, getScore };
	}

	function getFirstPlayer(player1, player2) {
		return Math.random() < 0.5 ? player1 : player2;
	}

	function getNextPlayer(currentPlayer, player1, player2) {
		return currentPlayer === player1 ? player2 : player1;
	}

	return { getFirstPlayer, createPlayer, getNextPlayer };
})();

const boardGame = (() => {
	let boardMatrix = [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	];

	function resetboard() {
		boardMatrix = [
			['', '', ''],
			['', '', ''],
			['', '', ''],
		];
	}

	function getBoardMatrix() {
		return boardMatrix.map((row) => row);
	}

	function isWinningLine(line) {
		return line[0] !== '' && line[0] === line[1] && line[1] === line[2];
	}

	function isMatrixFilled() {
		return !boardMatrix.some((row) => row.includes(''));
	}

	function getWinningSymbol() {
		for (let i = 0; i <= 2; i++) {
			let rowLine = [];
			for (let g = 0; g <= 2; g++) {
				rowLine.push(boardMatrix[i][g]);
			}
			if (isWinningLine(rowLine)) {
				return rowLine[0];
			}
		}

		for (let i = 0; i <= 2; i++) {
			let colLine = [];
			for (let g = 0; g <= 2; g++) {
				colLine.push(boardMatrix[g][i]);
			}
			if (isWinningLine(colLine)) {
				return colLine[0];
			}
		}

		let checkDiagonals = [];

		for (let i = 0; i <= 2; i++) {
			checkDiagonals.push(boardMatrix[i][i]);
		}
		if (isWinningLine(checkDiagonals)) {
			return checkDiagonals[0];
		}

		checkDiagonals = [];
		for (let i = 0; i <= 2; i++) {
			checkDiagonals.push(boardMatrix[i][2 - i]);
		}
		if (isWinningLine(checkDiagonals)) {
			return checkDiagonals[0];
		}
	}

	function getRoundResult() {
		const winnerSymbol = getWinningSymbol();
		const isBoardFilled = isMatrixFilled();
		if (winnerSymbol) return winnerSymbol;
		if (isBoardFilled) return 'Draw';
	}

	function getBlockCoordinates(blockIndex) {
		const row = Math.floor(blockIndex / 3);
		const column = blockIndex % 3;
		return { row, column };
	}

	function isBlockCoordinatesEmpty(row, column) {
		return boardMatrix[row][column] === '';
	}

	function updateMatrix(blockIndex, symbol) {
		const { row, column } = getBlockCoordinates(blockIndex);
		if (!isBlockCoordinatesEmpty(row, column)) return;
		boardMatrix[row][column] = symbol;
	}

	return {
		getBoardMatrix,
		resetboard,
		getRoundResult,
		updateMatrix,
		getBlockCoordinates,
	};
})();
