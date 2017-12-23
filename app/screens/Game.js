import React, { Component } from 'react';
import {
  Platform,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Button
} from 'react-native';

import Square from '../presentation/square';


const styles = StyleSheet.create({
  centerCol: {
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  infoText: {
    fontSize: 30
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  score: {
    fontSize: 20,
    textAlign: 'center'
  },
  square: {
    borderColor: '#000',
    borderWidth: 1,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  squareSymbol: {
    fontSize: 40
  }
})


class Game extends Component {
  constructor() {
    super();

    this.state = {
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ],
      currentPlayer: 0,
      draw: 0,
      emptySquares: 9,
      gameOver: false,
      players: [
        {
          name: 'Player 1',
          symbol: 'x',
          wins: 0,
        }, {
          name: 'Player 2',
          symbol: 'o',
          wins: 0
        }
      ],
      playerStarted: 0,
      winner: ''
    };
  }

  /**
   * Check for a winner
   */
  isWinner(board, symbol) {
    const colWin = this.checkColumns(board, symbol);
    const rowWin = this.checkRows(board, symbol);
    const diagWin = this.checkDiagonals(board, symbol);

    return colWin || rowWin || diagWin;
  }

  /**
   * Checks columns
   */
  checkColumns(board, symbol) {
    for (let c = 0; c < 3; c++) {
      let winner = true;
      
      for (let r = 0; r < 3; r++) {
        winner &= board[r][c] === symbol;        
      }

      if (winner) {
        return true;
      }
    }

    return false;
  }

  /**
   * Checks columns
   */
  checkRows(board, symbol) {
    for (let r = 0; r < 3; r++) {
      let winner = true;
      
      for (let c = 0; c < 3; c++) {
        winner &= board[r][c] === symbol;        
      }

      if (winner) {
        return true;
      }
    }

    return false;
  }

  /**
   * Checks columns
   */
  checkDiagonals(board, symbol) {
    // Left top to bottom right
    let leftToRightWinner = true;

    for (let i = 0; i < 3; i++) {
      leftToRightWinner &= board[i][i] === symbol;        
    }

    // Right top to bottom left
    let rightToLeftWinner = true;
    rightToLeftWinner &= board[0][2] === symbol;
    rightToLeftWinner &= board[1][1] === symbol;
    rightToLeftWinner &= board[2][0] === symbol;        

    if (leftToRightWinner || rightToLeftWinner) {
      return true;
    }

    return false;
  }

  /**
   * Update the board
   */
  onPress(rowIndex, colIndex, symbol){
    const { board, currentPlayer, emptySquares, players } = this.state;
    board[rowIndex][colIndex] = symbol;
    
    // Check if winner
    const isWinner = this.isWinner(board, symbol);
    const newPlayers = players;
    if (isWinner) {
      newPlayers[currentPlayer].wins += 1;
    }
    
    // Update player
    const newPlayer = currentPlayer === 0 ? 1 : 0;
    
    // Check if game is finished
    const newEmptySquares = emptySquares - 1;

    this.setState({
      board,
      currentPlayer: newPlayer,
      emptySquares: newEmptySquares,
      gameOver: newEmptySquares < 1 || isWinner,
      players: newPlayers
    })
  };

  /**
   * Navigate to the game summary view
   */
  goToSummary(players) {
    this.props.navigation.navigate('GameSummary', { players });
  }

  /**
   * Resets board data for rematch
   */
  rematch(){
    const newPlayerStarted = this.state.playerStarted === 0 ? 1 : 0;

    this.setState({
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ],
      currentPlayer: newPlayerStarted,
      emptySquares: 9,
      gameOver: false,
      playerStarted: newPlayerStarted,
      winner: '',
    })
  }


  render() {
    const { board, currentPlayer, gameOver, players, winner } = this.state;
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const infoText = gameOver ? 'Game over' : `Your move ${players[currentPlayer].name}`;

    return (
      <View style={styles.container}>
        {winner !== '' &&
          <Text>{Winner}</Text>
        }
        <View>
          <View style={styles.centerRow}>
            <View style={styles.centerCol}>
              <Text style={styles.score}>{`${players[0].wins}`}</Text>
              <Text>{`${players[0].name}`}</Text>
            </View>
            <View style={styles.centerCol}>
              <Text style={styles.score}>{`${players[1].wins}`}</Text>
              <Text>{`${players[1].name}`}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.infoText}>{infoText}</Text>

        <View>
          {board.map((row, rowIndex) => (
            <View 
              key={rowIndex}
              style={styles.row}
            >
              {row.map((val, colIndex) => (
                <Touchable
                  disabled={val !== '' || gameOver}
                  key={colIndex}
                  onPress={() => this.onPress(rowIndex, colIndex, players[currentPlayer].symbol)}
                >
                  <View style={styles.square}>
                    <Text style={styles.squareSymbol}>{val}</Text>
                  </View>
                </Touchable>
              ))}
            </View>
          ))}
        </View>

        
        {gameOver &&
          <View>
            <Button
              onPress={() => this.rematch(players)}
              title="Rematch"
            />
            <Button
              onPress={() => this.goToSummary(players)}
              title="Go to summary"
            />
          </View>
        }

      </View>
    );
  }
}

export default Game;