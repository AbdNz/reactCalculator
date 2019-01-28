/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import { createStackNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation';
import Calculator from './components/Calculator';
import History from './components/History';


const AppNavigator = createStackNavigator(
  { 
    Calculator: { 
      screen: Calculator,
      navigationOptions: () => ({
        title: `Calculator`,
        headerBackTitle: null,
      }),},
    History: {
      screen: History,
      navigationOptions: () => ({
        title: `History`,
        headerBackTitle: `Back`
      }),
    },
  },
  {
    initialRouteName: 'Calculator',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
)

const DrawerNavigator = createDrawerNavigator({
  Calculator: { screen: Calculator },
  History: { screen: History },
})

const AppContainer = createAppContainer(DrawerNavigator);

export default class App extends Component {

  static navigationOptions = {
    drawerLabel: 'Calculator',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./icons/hamburger-icon.png')}
        style={[{width: 24, height: 24}, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return(
      <AppContainer />
    )
  }
}

