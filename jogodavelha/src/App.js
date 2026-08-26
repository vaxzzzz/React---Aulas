import { useState } from 'react';
import './App.css';

// Componente de cada quadrado
function Square({ valor, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {valor}
    </button>
  );
}

// Componente do tabuleiro
function Tabuleiro({ xIsNext, squares, onPlay }) {

  function handleClick(i) {
    // Não permite jogar em casa ocupada
    // e nem depois que alguém venceu
    if (squares[i] || calculaVencedor(squares)) {
      return;
    }

    // Faz uma cópia do tabuleiro
    const nextSquares = squares.slice();

    // Define X ou O
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    // Envia o novo tabuleiro para o Game
    onPlay(nextSquares);
  }

  // Verifica vencedor
  const vencedor = calculaVencedor(squares);

  let status;

  if (vencedor) {
    status = 'Vencedor: ' + vencedor;
  } else if (!squares.includes(null)) {
    status = 'Empate!';
  } else {
    status = 'Próximo jogador: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>

      <div className="board-row">
        <Square
          valor={squares[0]}
          onSquareClick={() => handleClick(0)}
        />

        <Square
          valor={squares[1]}
          onSquareClick={() => handleClick(1)}
        />

        <Square
          valor={squares[2]}
          onSquareClick={() => handleClick(2)}
        />
      </div>

      <div className="board-row">
        <Square
          valor={squares[3]}
          onSquareClick={() => handleClick(3)}
        />

        <Square
          valor={squares[4]}
          onSquareClick={() => handleClick(4)}
        />

        <Square
          valor={squares[5]}
          onSquareClick={() => handleClick(5)}
        />
      </div>

      <div className="board-row">
        <Square
          valor={squares[6]}
          onSquareClick={() => handleClick(6)}
        />

        <Square
          valor={squares[7]}
          onSquareClick={() => handleClick(7)}
        />

        <Square
          valor={squares[8]}
          onSquareClick={() => handleClick(8)}
        />
      </div>
    </>
  );
}

// Componente principal
export default function Game() {

  // Histórico das jogadas
  const [history, setHistory] = useState([
    Array(9).fill(null)
  ]);

  // Movimento atual
  const [currentMove, setCurrentMove] = useState(0);

  // Se o movimento for par, X joga
  const xIsNext = currentMove % 2 === 0;

  // Tabuleiro atual
  const currentSquares = history[currentMove];

  // Executa uma jogada
  function handlePlay(nextSquares) {

    // Remove o futuro caso o jogador volte no histórico
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      nextSquares
    ];

    setHistory(nextHistory);

    setCurrentMove(nextHistory.length - 1);
  }

  // Voltar para uma jogada anterior
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Cria os botões do histórico
  const moves = history.map((squares, move) => {

    let description;

    if (move > 0) {
      description = 'Vai para o movimento #' + move;
    } else {
      description = 'Vai para o início do jogo';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">

      <div className="game-board">
        <Tabuleiro
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>

      <div className="game-info">
        <ol>{moves}</ol>
      </div>

    </div>
  );
}

// Função que verifica o vencedor
function calculaVencedor(squares) {

  const lines = [
    // Horizontais
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Verticais
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonais
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {

    const [a, b, c] = lines[i];

    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  return null;
}