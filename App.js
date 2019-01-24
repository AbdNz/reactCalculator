/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createStackNavigator, createAppContainer} from 'react-navigation';
import Calculator from './Components/Calculator';

const AppNavigator = createStackNavigator({
  Home: Calculator
})

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return(
      <AppContainer />
    )
  }
}