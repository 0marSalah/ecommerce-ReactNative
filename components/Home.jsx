import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const [savedProduct, setSaved] = useState([])
  const [price, setPrice] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data)
      setSaved(res.data)
    })
  }, [])

  useEffect(() => {
    set()
  }, [price])
  useEffect(() => handleSearch(), [search])

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

  const handleSearch = () => {
    const list = products.filter((p) => p.category.toLowerCase().includes(search.toLowerCase()))
    if(search.length > 0) {
      setProducts(list)
    } else {
      setProducts(savedProduct)
    }
    
  }

  return (
    <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#6b1d1d', '#cf4d4d', '#802525e2']} style={styles.wrapp}>
      <View style={styles.logo}>
        <Ionicons name='logo-amplify' size={60} color={"#333"} />
      </View>
      <View style={styles.searchCon}>
        <TextInput 
          style={styles.search}
          placeholder = "Search by category"
          value={search}
          onChangeText={(val) => { 
            setSearch(val)       
          }}
        />
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) =>
          <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#a84646', '#881f1f', '#701515']} style={styles.card}>
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
                <Text style={{ fontWeight: "600", color: "#fff", fontSize: 12, }}>Add To Cart</Text>
                </TouchableOpacity>
            </View>
          </LinearGradient>
        }
      />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  wrapp: {
    paddingTop: 40,
    paddingBottom:180,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    with:330,
    height:70,
    alignItems:"center",
    justifyContent:"flex-start"
  },
  card: {
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    marginBottom: 10,
    elevation:5
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
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#8a494989",
    position: "absolute",
    right: -0,
    bottom: -5
  },
  searchCon: {
    width: "100%",
    alignItems:"center",
    marginBottom: 20,
    flexDirection:"row",
    justifyContent:"center"
  },
  search: {
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderColor:"transparent",
    borderWidth:2,
    borderStyle:"solid",
    width: 330,
    borderRadius:40,
    backgroundColor:"#2a2b2c",
    color:"#fff",
    
  },
})