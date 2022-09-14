import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'

const LoginContent = (props) => {
  const [focused, setFocused] = useState(false)
  const [savedUser, setSavedUser] = useState({})

  const saveUsernameEmail = (value) => {
    setSavedUser({ ...savedUser, usernameOrMail: value })
  }
  const savePass = (value) => {
    setSavedUser({ ...savedUser, pass: value })
  }

  const submit = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("user"))
    if (savedUser.usernameOrMail === user.emailAddress || user.username && savedUser.pass === user.pass) {
      console.log("Well done")
      props.navigation.navigate("Home")
    } else {
      alert("invalid Data")
    }
  }

  const go = props => props.navigation.navigate("Signup")
  return (
    <LinearGradient colors={['#6b1d1d', '#cf4d4d', '#802525e2']} style={styles.wrapper} >
      <View style={{ height: "80%",}}>
        <View style={{ marginHorizontal: 10, marginTop: 20, width: 300 }}>
          <Text style={{ fontSize: 35, textAlign: "center", }}>Login</Text>
        </View>
        <View style={{
          margin: 10,
          marginVertical: 20,
          alignItems: "center"
        }}>
          <Image style={{
            borderRadius: 15,
            width: 200,
            height: 200,
            display: focused ? "none" : "flex"
          }} source={require("../assets/signin.jpg")} />
        </View>
        <View style={{ margin: 10 }}>
          <Text style={{ color: "#ffff", fontSize: 20, marginVertical: 5, letterSpacing: -0.5 }}>Email Or Username</Text>
          <TextInput
            onChangeText={saveUsernameEmail}
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
        <TouchableOpacity onPress={() => submit()} style={styles.btn}>
          <Text style={{ color: "#ffff", letterSpacing: -0.75 }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => go(props)} style={{
          marginHorizontal: 10, paddingVertical: 10, fontSize: "600",
          fontWeight: 18 }}>
          <Text style={{ color: "#ffff", fontSize: 12 }}>do not have an account? Signup Now</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

export default LoginContent

const styles = StyleSheet.create({
  wrapper: {
    // paddingTop: 40,
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: "#da7b7b97",
    padding: 15,
    width: 100,
    borderRadius: 20,
    alignItems: "center",
  },
})