import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Signup from './Signup'
import { NavigationContainer } from '@react-navigation/native'
import LoginContent from './LoginContent'
import Home from "./Home"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator()
const TAB = createBottomTabNavigator()
const Login = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false,
      headerStyle: {
        backgroundColor: "#701515",borderWidth:0,elevation:0
        }
      }}>
        <Stack.Screen name='LoginContent' component={LoginContent} />
        <Stack.Screen name="Signup" component={Signup} options={{headerShown:true}} />
      </Stack.Navigator>
  )
}

export default Login

const styles = StyleSheet.create({
  
})