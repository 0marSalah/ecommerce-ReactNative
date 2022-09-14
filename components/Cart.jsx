import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { setQuantity } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
export default function Cart(props) {
  const cart = useSelector((state) => state.cart)
  const [s, setS] = useState([])
  const [total, setTotal] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    get()
    getTotal()
  }, [cart, total])

  const getTotal = () => {
    const t = cart.reduce((acc, cur) => acc + Number(cur.price), 0)
    setTotal(Number(t))
    // console.log(Number(t))
  }

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
    } catch (err) {
      console.log(err)
    }
  }

  return (
    (cart.length > 0) ?
      <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#6b1d1d', '#cf4d4d', '#802525e2']} style={styles.wrapp}>
        <FlatList
        style={{borderRadius:15}}
          data={cart}
          renderItem={({ item }) =>
            <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#8b2222', '#a11a1a', '#701515']} style={styles.card}>
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
                    color: "#ffff",
                    fontWeight: "600"
                  }}>{item.category}</Text>
                </View>
                <View style={styles.txt}>
                  <Text style={{ color: "#f8f8f8" }}>Price: {item.price} $</Text>
                  <Text style={{ color: "#f8f8f8" }}>Rate: {item.rating.rate}</Text>
                </View>
                <View style={styles.q}>
                  <TouchableOpacity onPress={() => dec(item)}>
                    <Ionicons name="remove-circle-outline" size={30} color="#f51717" />
                  </ TouchableOpacity>
                  <Text style={{ color: "#f6f3f5", marginHorizontal: 10 }}>{item.quantity}</Text>
                  < TouchableOpacity onPress={() => inc(item)} >
                    <Ionicons name="ios-add-circle-outline" size={30} color="#f51717" />
                  </TouchableOpacity>
                </View >
              </View>
            </LinearGradient>
          }
        />
        <View style={styles.footer}>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Ionicons name={"wallet-outline"} size={35} color={"#f51717"} />
            <Text style={styles.tot}>Total : </Text><Text style={styles.num}>{String(Number(total).toFixed(2))} $</Text>
          </View>
          <TouchableOpacity style={styles.btnW}>
            <Text style={styles.btn}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient> : <LinearGradient start={{x: 0, y:1}} end={{x: 1, y: 0}} colors={['#cea16e', '#d49750', '#cc7f28']} style={styles.empty}>
        <Image style={{width:300,height:300,borderRadius:50}} source = { require("../assets/emptyCart.jpg") } />
        <Text style={styles.mt} >Your cart is empty</Text>
      </LinearGradient>
  )
}

const styles = StyleSheet.create({
  wrapp: {
    paddingTop: 15,
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  logo: {
    padding: 15,
  },
  card: {
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
    marginBottom: 10,
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
  empty: {
    alignItems:"center",
    justifyContent:"space-evenly",
    height:"100%",
    width:"100%",
    textAlign:"center",
    paddingBottom:200
  },
  mt: {
    fontSize: 30,
    color: "#f51717",
  },
  q: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    width: 370, flexDirection: "row", alignItems: 'center', justifyContent: "space-between", marginBottom: 100,
    backgroundColor: "#333",
    borderRadius: 15,
    height: 80,
    paddingHorizontal: 20,
    marginTop: 15
  },
  tot: {
    fontSize: 21,
    fontWeight: "600",
    marginLeft: 10,
  },
  btnW: {
    backgroundColor:"#881f1f",
    padding:10,
    borderRadius:30
  }, btn: {

  },
  num: {
    fontSize: 22,
    fontWeight: "600",
    color: "#881f1f",
    marginLeft: 5
  }
})
