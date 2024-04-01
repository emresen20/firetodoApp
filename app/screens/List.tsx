import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { View, Text, Button, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, Modal } from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionSheet from "react-native-actions-sheet";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export interface Todo {
    title: string;
    done: boolean;
    id: string;

}

interface RouterPros {
    navigation: NavigationProp<any, any>
}
const List = ({ navigation }: RouterPros) => {
    const actionSheetRef = useRef(null);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todo, setTodo] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [isVisible, setisVisible] = useState(false);

    const BottomSheetRef = useRef<BottomSheet>(null);
    const handleClosePress = () => BottomSheetRef.current?.close;

    const openModal=()=>{
        setModalVisible(true);
    }

    const handleOpenPress = () => BottomSheetRef.current?.expand;
    const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);


    const showmodal = () => {
        return (
            setModalVisible(true)
        )
    }


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
        setModalVisible(false)

    }
    const AddModal = () => {

        return (
            <Modal
                animationType="slide" // Modal animasyon tipi
                transparent={true} // Arka planı şeffaf yapar
                visible={modalVisible} // Modal'ın görünürlüğünü belirler
                onRequestClose={() => {
                    setModalVisible(!modalVisible); // Modal kapatıldığında yapılacak işlemler
                }}
            >
                <View style={styles.modalcontainer}>
                    <View style={{ backgroundColor: "red" }}>
                        <View style={styles.textinputview}>
                            <TextInput style={styles.firsttextinput}
                                placeholderTextColor={"white"}
                                placeholder="Add New Todo " onChangeText={(text) => setTodo(text)}
                                value={todo}

                            />
                        </View>
                        <TouchableOpacity style={styles.modalimageview} onPress={adTodo} disabled={todo === ""}>
                            <Image style={styles.modaliamge} source={require("../../assets/plus.png")} />
                        </TouchableOpacity>
                        <Button title="Close Modal" onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                </View>
            </Modal>
        );
    }

    const renderTodo = ({ item }: any) => {
        const ref = doc(FIRESTORE_DB, `todos/${item.id}`)

        const toggleDone = async () => {
            updateDoc(ref, { done: !item.done })

        }

        const deleteItem = async () => {
            deleteDoc(ref)

        }

        return (
            <View style={styles.flatlistview}>
                <TouchableOpacity style={styles.flatlistview} onPress={toggleDone}>
                    {item.done && <Ionicons name="checkmark-circle" size={30} color="#1e96fc" style={{paddingRight:10,alignSelf:"center",marginLeft:3}} />}
                    {!item.done && <Entypo name="circle" size={30} color="#1e96fc" style={{paddingRight:10,alignSelf:"center",marginLeft:3}} />}

                    <Text style={{alignSelf:"center",fontSize:15}}>{item.title}</Text>
                </TouchableOpacity>
                <Ionicons size={30} name="trash-bin-outline" onPress={deleteItem} style={{marginRight:10,alignSelf:"center"}} color="#1e96fc"/>
            </View>
        )
    };

    return (
        <SafeAreaView style={styles.container}>

            <Modal
                animationType="slide" // Modal animasyon tipi
                transparent={true} // Arka planı şeffaf yapar
                visible={modalVisible} // Modal'ın görünürlüğünü belirler
                onRequestClose={() => {
                    setModalVisible(!modalVisible); // Modal kapatıldığında yapılacak işlemler
                }}
            >
                <View style={styles.modalcontainer}>
                    <View >
                        <View style={styles.textinputview}>
                            <TextInput style={styles.firsttextinput}
                                placeholderTextColor={"white"}
                                placeholder="Add New Todo " onChangeText={(text) => setTodo(text)}
                                value={todo}

                            />
                        </View>
                        <View style={{flexDirection:"row",gap:50,justifyContent:"center",marginTop:7}}>
                        <TouchableOpacity style={styles.modalimageview} onPress={adTodo} disabled={todo === ""}>
                            <Image style={styles.modaliamge} source={require("../../assets/plus.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalimageview} onPress={() => setModalVisible(!modalVisible)}>
                            <Image style={styles.modaliamge} source={require("../../assets/close.png")} />
                        </TouchableOpacity>
                        </View>
            
                    </View>
                </View>
            </Modal>

            <View style={{ flex: 1 }}>
                {/* <View style={styles.textinputview}>
                    <TextInput style={styles.firsttextinput}
                        placeholderTextColor={"white"}
                        placeholder="Add New Todo " onChangeText={(text) => setTodo(text)}
                        value={todo} />
                </View> */}
                {/* <Button onPress={adTodo} title="Add" disabled={todo === ""} /> */}

                {/* <BottomSheet snapPoints={snapPoints} index={0}>
                <View style={{flex:1, backgroundColor: "red",alignItems:"center" }}>
                    <TextInput style={styles.firsttextinput}
                        placeholderTextColor={"white"}
                        placeholder="Add New Todo " onChangeText={(text) => setTodo(text)}
                        value={todo}

                    />
                    <TouchableOpacity style={styles.modalimageview} onPress={adTodo} disabled={todo === ""}>
                        <Image style={styles.modaliamge} source={require("../../assets/plus.png")} />
                    </TouchableOpacity>
                </View>
            </BottomSheet> */}

                {todos.length > 0 && (
                    <View style={styles.todocotainer}>
                        <FlatList
                            data={todos}
                            renderItem={(item) => renderTodo(item)}
                            keyExtractor={(todo: Todo) => todo.id}
                        />
                    </View>

                )}
                <TouchableOpacity style={styles.imageview} onPress={openModal}>
                    <View style={styles.plusimage}>
                        <Image style={styles.plusimage} source={require("../../assets/plusblue.png")} />
                    </View>

                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default List;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#edf6f9",
        justifyContent: 'flex-end',
        

    },

    flatlistview: {
        flexDirection: "row",
        alignSelf:"center",
        backgroundColor: "#fefcfb",
        flex: 1,
        width: "85%",
        height: 90,
        marginBottom: 5,
        borderRadius:20,
        marginTop:5

    },
    todocotainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,


    },
    firsttextinput: {
        borderWidth: 2,
        borderColor: "white",
        height: 53,
        width: 325,
        borderRadius: 20,
        padding: 10,
        marginBottom: 8,
        color: "white",
        justifyContent: "center"
    },
    plusimage: {
        width: 50,
        height: 50,
        backgroundColor: 'transparent'
    },
    imageview: {
        position: 'absolute',
        bottom: 10,
        right: 175,
        backgroundColor: 'transparent'


    },
    textinputview: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        borderRadius: 20,
    },
    modalcontainer: {
        width: ("90%"),
        height: ('40%'), 
        backgroundColor: "#1e96fc",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 100,
        borderRadius: 55
    },
    modaliamge: {
        width: 40,
        height: 40
    },
    modalimageview: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"row",
        gap:50
    }

})