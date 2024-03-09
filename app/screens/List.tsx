import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, FlatList } from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";



const List = () => {
    const [todos, setTodos] = useState<any[]>([]);
    const [todo, setTodo] = useState("");

    useEffect(() => {
        const todoRef = collection(FIRESTORE_DB, 'todos');
        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                console.log("UPDATED");

                const todos: any[] = [];
                snapshot.docs.forEach((doc) => {
                    todos.push({
                        id: doc.id,
                        ...doc.data(),

                    });
                });
                setTodos(todos);
            }
        })
        return () => subscriber();
    }, [])

    const adTodo = async () => {
        console.log("ADD");
        const doc = await addDoc(collection(FIRESTORE_DB, 'todos'), { title: todo, done: false })
        setTodo("")
    }
    return (
        <View style={styles.container}>
            <View>
                <TextInput placeholder="Add New Todo " onChangeText={(text) => setTodo(text)}
                    value={todo} />
                <Button onPress={adTodo} title="Add" disabled={todo === ""} />

                {/* {todos.length > 0 && (
                    <View>
                        <FlatList
                            data={todos}
                            renderItem={}
                            keyExtractor={(todo) => todo.id}
                        />
                    </View>

                )} */}

            </View>
        </View>
    )
}

export default List;

const styles = StyleSheet.create({
    container: {

    }

})