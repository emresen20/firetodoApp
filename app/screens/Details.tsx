import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity,Image } from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { User, onAuthStateChanged } from 'firebase/auth';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Details = ({ navigation }: RouterProps) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log("user", user);
            setUser(user);
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.firsview}>
                <Text style={styles.firsttext}>
                    {user?.email}
                </Text>
            </View>

            <View style={styles.secondview}>
                <TouchableOpacity  onPress={() => FIREBASE_AUTH.signOut()}>
                    <Image style={styles.logoutimage} source={require("../../assets/turn-off.png")}/>
                </TouchableOpacity>
            </View>
            {/* <Text>Email: {user ? user.email : "No user logged in"}</Text>
            <Text>{user?.email}</Text>
            <Button title="Go to List" onPress={() => navigation.navigate("List")} />
            <Button title="Log out" onPress={() => FIREBASE_AUTH.signOut()} /> */}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#edf6f9"

    },

    firsview: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"

    },
    secondview: {
        flex: 6,
        justifyContent:"center",
        alignItems:"center"

    },
    firsttext: {
        fontSize: 25,
        color:"black"
    },
    logoutimage:{
        height:150,
        width:150
    },
    backimage:{
        
        height:30,
        width:30
    }

})

export default Details;
