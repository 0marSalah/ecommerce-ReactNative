import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import Cart from './components/Cart';
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { Ionicons } from '@expo/vector-icons';
import Login from './components/Login';
export default function App() {
  const TAB = createBottomTabNavigator()

  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <TAB.Navigator initialRouteName='Home' screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#333",
            border: "none",
            position: "absolute",
            right: 10,
            left: 10,
            bottom: 8,
            borderRadius: 15,
            height: 80,
            elevation: 5
          },
          
        }} >
          <TAB.Screen name='Login' component={Login} options={{
            headerShown: false,
            tabBarIcon: ({ size, focused }) => (
              <Ionicons name='person' color={focused ? "#db1f1f" : "#ffff"} size={size} />
            )
          }} />
          <TAB.Screen name="Home" color={"#aa7422"} component={Home} options={{
            headerShown: false,
            tabBarIcon: ({ size, focused }) => (
              <Ionicons name='home' color={focused ? "#db1f1f" : "#ffff"} size={size} />
            ),
          }} />
          <TAB.Screen name='Cart' component={Cart} options={{
            headerStyle: { backgroundColor: "#881f1f", height:70, borderBottomColor: "transparent",elevation:0 },
            tabBarIcon: ({ size, focused }) => (
              <Ionicons name='cart' color={focused ? "#db1f1f" : "#ffff"} size={size} />
            ),
          }} />
          {/* <Stack.Screen name='Signup' component={Signup} /> */}

        </TAB.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
