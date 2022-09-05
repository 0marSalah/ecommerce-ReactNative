import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { setQuantity } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart() {
  const cart = useSelector((state) => state.cart)
  const [s, setS] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    get()
  }, [cart])

  const inc = (item) => {
    var index = cart.findIndex(ele => ele.id == item.id)
    cart[index].quantity += 1
    cart[index].price = (cart[index].quantity * s[index].price).toFixed(2)
    dispatch(setQuantity(cart))
  }

  const dec = (item) => {
    var index = cart.findIndex(ele => ele.id == item.id)
    cart[index].quantity -= 1
    cart[index].price = (cart[index].quantity * s[index].price).toFixed(2)
    dispatch(setQuantity(cart))
  }

  const get = async () => {
    try {
      const data = JSON.parse(await AsyncStorage.getItem("cart"))
      setS(data)
      // console.log(s)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    (cart.length > 0) ?
      <View style={styles.wrapp}>
        <FlatList
          data={cart}
          renderItem={({ item }) =>
            <View style={styles.card}>
              <View style={styles.imgCon}>
                <Image style={{
                  width: 100,
                  height: 100,
                  borderRadius: 15,
                  marginRight: 25
                }} source={{ uri: item.image }} />
              </View>
              <View style={styles.notImg}>
                <View>
                  <Text style={{
                    color: "#f6f7f3",
                    fontWeight: "600"
                  }}>{item.category}</Text>
                </View>
                <View style={styles.txt}>
                  <Text style={{ color: "#f8f8f8" }}>Price: {item.price} $</Text>
                  <Text style={{ color: "#f8f8f8" }}>Rate: {item.rating.rate}</Text>
                </View>
                <View style={styles.q}>
                  <TouchableOpacity onPress={() => dec(item)}>
                    <Ionicons name="remove-circle-outline" size={30} color="#ffa43b" />
                  </ TouchableOpacity>
                  <Text style={{color: "#f6f3f5", marginHorizontal: 10 }}>{item.quantity}</Text>

                  < TouchableOpacity onPress={() => inc(item)} >
                    <Ionicons name="ios-add-circle-outline" size={30} color="#ffa43b" />
                  </TouchableOpacity>
                </View >
              </View>
            </View>
          }
        />
      </View> : <Text style={styles.mt} >Your cart is empty</Text>
  )
}

const styles = StyleSheet.create({
  wrapp: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d8a22e",
    height: "100%"
  },
  card: {
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#aa7422",
    marginBottom: 10
  },
  imgCon: {
    justifyContent: "center",
    alignItems: "center",
  },
  notImg: {
    paddingVertical: 0,
    marginVertical: 10,
    position: "relative",
    width: 150
  },
  txt: {
    marginTop: 10
  },
  mt: {
    color: "#f73842",
    paddingVertical: 300,
    paddingHorizontal: 60,
    fontSize: 30
  },
  q: {
    flexDirection: "row",
    alignItems: "center",
  }
})
