import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View ,Text, Button} from "react-native";
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
        <SafeAreaView>
            <Text>Email: {user ? user.email : "No user logged in"}</Text>
            <Text>{user?.email}</Text>
            <Button title="Go to List" onPress={() => navigation.navigate("List")} />
            <Button title="Log out" onPress={() => FIREBASE_AUTH.signOut()} />
        </SafeAreaView>
    );
}

export default Details;
