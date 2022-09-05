import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import Cart from './components/Cart';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const TAB = createBottomTabNavigator()
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TAB.Navigator screenOptions={({ route }) =>
        ({
          tabBarIcon: ({ focused, size, color }) => {
            var icon;
            if (route.name == "Home") {
              icon = "home"
              size = focused ? 25 : 20
              color = focused ? "#aa7422" : "grey"
            }
            else if (route.name == "Cart") {
              icon = "cart"
              size = focused ? 25 : 20;
              color = focused ? "#aa7422" : "grey"
            }
            return <Ionicons name={icon} size={size} color={color} />
          }
        })}>
          
          <TAB.Screen name="Home" color={"#aa7422"} component={Home} />
            <TAB.Screen name='Cart' component={Cart}  />
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
});
