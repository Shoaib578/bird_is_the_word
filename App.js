import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import {View,Text} from 'react-native'
import RootNavigator from './Routes'


export default class App extends React.Component {
  render(){
    return(
     <NavigationContainer>
      <RootNavigator />
     </NavigationContainer>
    )
  }
}