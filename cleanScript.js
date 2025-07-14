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

const domController = (() => {
	const DomElements = {
		gameBoard: document.querySelector('.game-board'),
		boardBlocks: document.querySelectorAll('.board-block'),
		toggledElements: document.querySelectorAll('.game-off'),
		startButton: document.querySelector('#start-round'),
		refreshButton: document.querySelector('#refresh-round'),
		firstPlayer: document.querySelector('#player1'),
		secPlayer: document.querySelector('#player2'),
		score: document.querySelector('.score'),
	};

	DomElements.startButton.addEventListener('click', () => toggleGameAccess());
	DomElements.refreshButton.addEventListener('click', () => {
		boardGame.resetboard();
		updateBoardDisplay();
		console.log(boardGame.getBoardMatrix());
	});

	function updateBlocksDisplay(boardMatrix, getBlockCoordinates) {
		DomElements.boardBlocks.forEach((block, index) => {
			const { row, column } = getBlockCoordinates(index);
			block.textContent = `${boardMatrix[row][column]}`;
		});
	}

	function updateBoardDisplay() {
		updateBlocksDisplay(
			boardGame.getBoardMatrix(),
			boardGame.getBlockCoordinates
		);
	}

	function handlePlayerClick(actionFunc) {
		DomElements.boardBlocks.forEach((block, index) => {
			block.addEventListener('click', () => {
				actionFunc(index);
			});
		});
	}

	function updateScore(player1, player2) {
		DomElements.score.textContent = `${player1.getScore()} / ${player2.getScore()}`;
	}

	function toggleGameAccess() {
		DomElements.toggledElements.forEach((element) => {
			element.classList.toggle('game-off');
		});
		DomElements.startButton.classList.toggle('game-off');
	}

	function setPlayersName(player1Name, player2Name) {
		DomElements.firstPlayer.textContent = player1Name;
		DomElements.secPlayer.textContent = player2Name;
	}

	function focusOnPlayer(currentPlayer) {
		const symbol = currentPlayer.getSymbol();
		if (symbol === 'X') {
			DomElements.secPlayer.classList.remove('scale-up');
			DomElements.firstPlayer.classList.add('scale-up');
			return;
		}
		DomElements.firstPlayer.classList.remove('scale-up');
		DomElements.secPlayer.classList.add('scale-up');
	}

	return {
		handlePlayerClick,
		updateScore,
		toggleGameAccess,
		setPlayersName,
		updateBoardDisplay,
		focusOnPlayer,
	};
})();
