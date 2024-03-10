import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { View ,Text, Button} from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";

interface RouterPros{
    navigation:NavigationProp<any,any>
}

const Details= ({navigation}:RouterPros)=>{
 
    return(
        <View>
            <Button title="go to list" onPress={()=> navigation.navigate("List")}/>
            <Button title="Log out" onPress={()=> FIREBASE_AUTH.signOut()}/>
        </View>
    )
}

export default Details;