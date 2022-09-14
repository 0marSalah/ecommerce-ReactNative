import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient';

let mailR = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
let passR = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

const Signup = (props) => {
  const [user, setUser] = useState({})
  const [focused, setFocused] = useState(false)

  const saveEmail = (value) => {
    setUser({ ...user, emailAddress: value })
  }
  const saveUsername = (value) => {
    setUser({ ...user, username: value })
  }
  const savePass = (value) => {
    setUser({ ...user, pass: value })
  }

  const submit = async (props) => {
    if (mailR.test(user.emailAddress) && passR.test(user.pass)) {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      props.navigation.goBack()
    } else {
      alert("Password must have Minimum eight characters, at least one letter and one number OR this is not a valid email")
    }
    
  }

  return (
    <LinearGradient colors={['#6b1d1d', '#cf4d4d', '#802525e2']} style={styles.wrapper} >
      <View style={{ height: focused ? "95%" : "70%" }}>
        <View style={{ margin: 10 }}>
          <Text style={{ color: "#ffff", fontSize: 20, marginVertical: 5, letterSpacing: -0.5 }}>Email</Text>
          <TextInput
            onChangeText={saveEmail}
            placeholder=''
            style={styles.user}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </View>
        <View style={{ margin: 10 }}>
          <Text style={{ color: "#ffff", fontSize: 20, marginVertical: 5, letterSpacing: -0.5 }}>Username</Text>
          <TextInput
            onChangeText={saveUsername}
            placeholder=''
            style={styles.user}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </View>
        <View style={{ margin: 10 }}>
          <Text style={{ color: "#ffff", fontSize: 20, marginVertical: 5 }}>Password</Text>
          <TextInput
            onChangeText={savePass}
            placeholder=''
            style={styles.user}
            secureTextEntry={true}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </View>
        <TouchableOpacity onPress={() => submit(props)} style={styles.btn}>
          <Text style={{ color: "#ffff", letterSpacing: -0.75 }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

export default Signup

const styles = StyleSheet.create({
  wrapper: {
    // paddingTop: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ca934b",
    height: "100%"
  },
  user: {
    borderColor: "#333",
    borderBottomWidth: 2,
    width: 300,
    paddingVertical: 10,
    fontSize: 18,
    borderStyle: "solid",
  },
  btn: {
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: "#333333ca",
    padding: 15,
    width: 100,
    borderRadius: 20,
    alignItems: "center",

  },
})