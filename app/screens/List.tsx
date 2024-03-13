import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, FlatList, TouchableOpacity } from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface Todo {
    title:string;
    done:boolean;
    id:string;
     
}

interface RouterPros{
    navigation:NavigationProp<any,any>
}
const List = ({navigation}:RouterPros) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todo, setTodo] = useState("");

    useEffect(() => {
        const todoRef = collection(FIRESTORE_DB, 'todos');
        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                console.log("UPDATED");

                const todos: Todo[] = [];
                snapshot.docs.forEach((doc) => {
                    todos.push({
                        id: doc.id,
                        ...doc.data(),

                    } as Todo);
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

    const renderTodo=({item}:any) =>{
        const ref = doc(FIRESTORE_DB,`todos/${item.id}`)

        const toggleDone=async()=>{
            updateDoc(ref,{done:!item.done})

        }

        const deleteItem=async()=>{
            deleteDoc(ref)
            
        }
        return(
            <View style={styles.flatlistview}>
                <TouchableOpacity style={styles.flatlistview}onPress={toggleDone}>
                    {item.done && <Ionicons name="checkmark-circle" size={24} color="green" /> }
                    {!item.done && <Entypo name="circle" size={24} color="black" /> }
                    
                    <Text>{item.title}</Text>
                </TouchableOpacity>
                <Ionicons name="trash-bin-outline" onPress={deleteItem} />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TextInput placeholder="Add New Todo " onChangeText={(text) => setTodo(text)}
                    value={todo} />
                <Button onPress={adTodo} title="Add" disabled={todo === ""} />
                
                 {todos.length > 0 && (
                    <View style={styles.todocotainer}>
                        <FlatList
                            data={todos}
                            renderItem={(item)=> renderTodo(item)}
                            keyExtractor={(todo: Todo) => todo.id}
                        />
                    </View>

                )} 

            </View>
         <Button onPress={()=>navigation.navigate("Details")} title="Go to Log out"  />
        </SafeAreaView>
    )
}

export default List;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#0A0171"
        
    },

    flatlistview:{
        flexDirection:"row",
        backgroundColor:"red",
        flex:1,
        marginVertical:5
    },
    todocotainer:{
        flexDirection:"row",
        alignItems:"center",
        marginVertical:1

    }
})