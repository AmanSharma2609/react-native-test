/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from "react-navigation";
import Login from './src/UI/Screens/Login'
import Signup from './src/UI/Screens/SignUp'
import DummyScreen from './src/UI/Screens/AuthScreen'
import Post from './src/UI/Screens/PostList'
import {Provider} from 'react-redux'
import { Root } from "native-base";
import {store} from './src/reduxStore'


const AppStack = createStackNavigator({
  Post:Post
})
const AuthStack = createStackNavigator(
  {Login:Login,
  Signup: Signup},

  {defaultNavigationOptions: () => ({
    header: null
  })}
)
let Navigation = createAppContainer(
  createSwitchNavigator(
    {
      DummyScreen:DummyScreen,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: "DummyScreen"
    }
  )
);
export default class App extends Component{
  render(){
    return(
      <Root>
      <Provider store={store}>
        <Navigation/>
      </Provider>
      </Root>
    )
  }
}