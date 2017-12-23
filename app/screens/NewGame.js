import React, { Component } from 'react';
import {
  Button,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import { settings } from '../config/data';


const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-around'
  },
  text: {
    fontSize: 20,
    paddingBottom: 5
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    borderBottomWidth: 1
  }
});

class NewGame extends Component {
  constructor() {
    super();

    this.state = {
      playerOneName: settings.playerOneName,
      playerTwoName: settings.playerTwoName
    };
  }

  onButtonPress() {
    this.props.navigation.navigate('Game', { ...this.state });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Player 1 default name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({playerOneName: text})}
            value={this.state.playerOneName}
          />
        </View>
        <View>
          <Text style={styles.text}>Player 2 default name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({playerTwoName: text})}
            value={this.state.playerTwoName}
          />
        </View>
        <Button
          onPress={() => this.onButtonPress()}
          title="Start game"
          color="#841584"
          accessibilityLabel="Start a new game of tic tac toe"
        />  
      </View>
    );
  }
}

export default NewGame;