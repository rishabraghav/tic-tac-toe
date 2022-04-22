import React from 'react';
import Board from './board'
import CalculateWinner from './CalculateWinner';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            isNextx: true,
            
        };
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(CalculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.isNextx ? 'x' : 'o';
        this.setState({history: history.concat([{
            squares: squares 
        }]),
        stepNumber: history.length,
        isNextx: !this.state.isNextx
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            isNextx: (step%2) === 0
        });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = CalculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? "Go to move " + move : "Start Again";

            return (<li>
                <button onClick= {() => this.jumpTo(move)}>{desc}</button>
            </li>)
        })

        let status;
        if(winner) {
            status = 'winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.isNextx ? 'X' : 'O') ;
        }
        
      return (
        <div className="game">
          <div className="game-board">
            <Board value = {current.squares}
                onClick ={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  export default Game;