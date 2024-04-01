import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import List from './app/screens/List';
import Details from './app/screens/Details';
import Login from './app/screens/Login';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function InsideLayout() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false, tabBarActiveTintColor: 'black',tabBarInactiveTintColor: 'black' }  }>
        <Tab.Screen
        name="List"
        component={List}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={"#edf6f9"} size={size} style={{color:"blue",}} />
          ),
        }}
      />
       <Tab.Screen
        name="Settings"
        component={Details}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={"blue"} size={size} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}

export default function App() {
  const[user,setUser]= useState<User | null>(null);

  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH,(user)=>{
      console.log("user",user);
      setUser(user)
    })
  },[])
  return (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Login'>
        {user? (
          <Stack.Screen name="InsideLayout" component={InsideLayout} options={{headerShown:false}} />

        ) :(
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        )}
        {/* <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Login" component={Login} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  </GestureHandlerRootView>
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
