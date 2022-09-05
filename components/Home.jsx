import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const [price, setPrice] = useState([])

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data)
    })
  }, [])

  useEffect(() => {
    set()
  }, [price])

  const set = async () => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(price))
    } catch (err) {
      console.log(err)
    }
  }

  const handleAdd = (item) => {
    setPrice([...price, {...item}])
    dispatch(setCart({ ...item, quantity: 1 }))
  }

  return (
    <View style={styles.wrapp}>
      <FlatList
        data={products}
        renderItem={({ item }) =>
          <View style={styles.card}>
            <View style={styles.imgCon}>
              <Image style={{
                width: 100,
                height: 100,
                borderRadius: 15,
                marginRight: 10}} source={{ uri: item.image }} />
            </View>
            <View style={styles.notImg}>
              <View>
                <Text style={{
                  fontWeight: "bold",
                  color: "#f8f8f8"
                }}>{item.category}</Text>
              </View>
              <View style={styles.txt}>
                <Text style={{ color: "#f8f8f8" }}>Price: {item.price} $</Text>
                <Text style={{ color: "#f8f8f8" }}>Rate: {item.rating.rate}</Text>
              </View>
                <TouchableOpacity style={styles.icon} 
                  onPress={() => handleAdd(item)}
                >
                <Text style={{fontWeight: "600", color: "#684b20", fontSize: 12, }}>Add To Cart</Text>
                </TouchableOpacity>
            </View>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapp: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d8a22e"
  },
  card: {
    padding: 10,
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
    paddingVertical: 10,
    marginVertical: 10,
    position: "relative",
    width: 200
  },
  txt: {
    marginTop: 10
  },
  icon: {
    width: 80,
    height: 30,
    // padding: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#d8a22e",
    position: "absolute",
    right: -0,
    bottom: -5
  },
})