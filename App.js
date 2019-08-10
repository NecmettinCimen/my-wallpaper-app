import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Main from './src/MainPage'
import Detail from './src/DetailPage'

const AppNavigator = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: ({ navigation }) => ({
      title: 'Wallpapers',
      headerLeft: null
    }),
  },
  Detail: {
    screen: Detail,
    navigationOptions: () => ({
      title: 'Wallpapers',
    })
  }
});

export default createAppContainer(AppNavigator);