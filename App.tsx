import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import List from './app/screens/List';
import Details from './app/screens/Details';
import Login from './app/screens/Login';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout(){
  return(
    <InsideStack.Navigator screenOptions={{
      headerShown: false 
    }}>
      <InsideStack.Screen name='List' component={List} />
      <InsideStack.Screen name="Details" component={Details} options={{headerShown:false}}/>
    </InsideStack.Navigator>
  )
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
