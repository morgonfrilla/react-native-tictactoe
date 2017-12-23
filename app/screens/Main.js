import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';


const styles = StyleSheet.create({
  content: {
    flex: 1,
  }
});


class Main extends Component {
  onLearnMore = (user) => {
    // this.props.navigation.navigate('Details', { ...user });
  };

  render() {
    return (
      <View style={styles.content}>
        <Text>Main</Text>
      </View>
    );
  }
}

export default Main;