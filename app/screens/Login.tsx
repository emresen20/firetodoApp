import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { FIREBASE_AUTH } from "../../firebaseConfig";

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
        <View>
            <KeyboardAvoidingView behavior="padding">
                <TextInput placeholder="Email " onChangeText={(text) => setEmail(text)}
                    value={email} />
                <TextInput placeholder="Password " autoCapitalize="none"
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


            </KeyboardAvoidingView>


        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 5

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

