import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator, KeyboardAvoidingView,Image } from "react-native";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response);
        } catch (error: any) {
            console.log(error);
            alert("registaration failed: " + error.messge);
        } finally {
            setLoading(false);
        }
    }
    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log(response);
            alert("check your emails!")
        } catch (error: any) {
            console.log(error);
            alert("registaration failed: " + error.messge);
        } finally {
            setLoading(false)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageview}>
                <Image style={styles.image} source={require("../../assets/ayi.png")}/>
                <Text style={styles.text}>Welcome!</Text>
                <Text style={styles.secondtext}>Please Login or Create Account</Text>
            </View>

            <View style={styles.secondview}>
                <TextInput 
                    style={styles.firsttextinput}
                    placeholder="Email " onChangeText={(text) => setEmail(text)}
                    value={email} />
                <TextInput 
                    style={styles.secondtextinput}
                    placeholder="Password " autoCapitalize="none"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true} />

                {loading ? (
                    <ActivityIndicator />
                ) : (
                    <>
                        <Button onPress={signUp} title="Create Account" />
                        <Button onPress={signIn} title="Sign in" />
                    </>
                )}

            </View>

        </SafeAreaView>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#0A0171"

    },
    imageview: {
        flex: 1,
       // backgroundColor:"red",
        justifyContent:"center",
        alignItems:"center"
    },
    secondview: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
        //backgroundColor:"red"
    },
    secondtext:{
        color:"white",
        fontSize:12,
        marginTop:10
    },
    image:{
        width:150,
        height:150,
    },
    text:{
        color:"white",
        fontSize:20,
        marginTop:5
    },
    firsttextinput:{
        borderWidth:2,
        borderColor:"white",
        height:50,
        width:300,
        borderRadius:20,
        padding:10,
        marginBottom:20,
        color:"white"

    },
    secondtextinput:{
        borderWidth:2,
        borderColor:"white",
        height:50,
        width:300,
        padding:10,
        borderRadius:20,
        color:"white"
    },
    flatlistview: {
        flexDirection: "row",
        backgroundColor: "red",
        flex: 1,
        marginVertical: 10
    },
    todocotainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 4,

    }
})

