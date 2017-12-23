import React, { Component } from 'react';
import {
  Picker,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput
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

class Settings extends Component {
  render() {
    const playerOneName = this.props.playerOneName
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Theme</Text>
          <Picker
            selectedValue={settings.theme}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            <Picker.Item label="Light" value="light" />
            <Picker.Item label="Dark" value="dark" />
          </Picker>
        </View>
        <View>
          <Text style={styles.text}>Player 1 default name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({text})}
            value={settings.playerOneName}
          />
        </View>
        <View>
          <Text style={styles.text}>Player 2 default name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({text})}
            value={settings.playerTwoName}
          />
        </View>       
      </View>
    );
  }
}

export default Settings;