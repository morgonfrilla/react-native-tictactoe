import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import {
  Game,
  Main,
  NewGame,
  Settings,
  GameSummary
} from '../screens';


export const Tabs = TabNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      tabBarLabel: 'Main'
    },
  },
  NewGame: {
    screen: NewGame,
    navigationOptions: {
      tabBarLabel: 'New Game'
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings'
    },
  }
})

export const GameStack = StackNavigator({
  Game: {
    screen: Game,
  },
  GameSummary: {
    screen: GameSummary,
  }
});

export const Root = StackNavigator({
  Game: {
    screen: GameStack,
  },
  Tabs: {
    screen: Tabs,
  }
}, {
  mode: 'modal',
  headerMode: 'none',
});
