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
            isNextx: true
        };
    }
    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(CalculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.isNextx ? 'x' : 'o';
        this.setState({history: history.concat([{
            squares: squares 
        }]),
        isNextx: !this.state.isNextx
        });
    }
    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = CalculateWinner(current.squares);
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
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  export default Game;