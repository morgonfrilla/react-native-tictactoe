import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});



class GameSummary extends Component {
  render() {
    const players = this.props.navigation.state.params.players;

    return (
      <View style={styles.container}>
        <Text>{`${players[0].symbol} : ${players[0].wins} ${players[0].name}`}</Text>
        <Text>{`${players[1].symbol} : ${players[1].wins} ${players[1].name}`}</Text>
      </View>
    );
  }
}

export default GameSummary;