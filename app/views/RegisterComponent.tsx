import React, {useState} from 'react';
import {Alert, View, Text, StyleSheet, TextInput, TouchableHighlight} from "react-native";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function RegisterComponent() {

    const navigation = useNavigation();
    const [userLogin, setUserLogin] = useState({
        username: "",
        password: "",
        passwordConfirmation: ""
    });

    const cancelRegister = () => {
        Alert.alert('Registration cancelled');
        // @ts-ignore
        navigation.navigate('HomeRT');
    }

    const registerAccount = () => {
        if (!userLogin.username) {
            Alert.alert('Please enter a username');
        } else if (userLogin.password !== userLogin.passwordConfirmation) {
            Alert.alert('Passwords do not match!');
        } else {
            AsyncStorage.getItem(userLogin.username, (_err, result) => {
                if (result !== null) {
                    console.log(result);
                    Alert.alert(userLogin.username + ' already exists.');
                } else {
                    AsyncStorage.setItem(userLogin.username,
                        userLogin.password,
                        (err, result) => {
                        console.log(userLogin.username);
                        console.log(userLogin.password);
                        Alert.alert(userLogin.username + ' account created.');
                        navigation.navigate('HomeRT');
                    });
                }
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Register Account</Text>

            <TextInput
                style={styles.inputs}
                onChangeText={(text) => setUserLogin({...userLogin, username: text})}
                value={userLogin.username}
            />
            <Text style={styles.labels}>Enter Username</Text>

            <TextInput
                style={styles.inputs}
                onChangeText={(text) => setUserLogin({...userLogin, password: text})}
                value={userLogin.password}
                secureTextEntry={true}
            />
            <Text style={styles.labels}>Enter Password</Text>

            <TextInput
                style={styles.inputs}
                onChangeText={(text) => setUserLogin({...userLogin, passwordConfirmation: text})}
                value={userLogin.passwordConfirmation}
                secureTextEntry={true}
            />
            <Text style={styles.labels}>Enter Password</Text>

            <TouchableHighlight onPress={() => registerAccount()} underlayColor='#31e981'>
                <Text style={styles.buttons}>
                    Register
                </Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => cancelRegister()} underlayColor='#31e981'>
                <Text style={styles.buttons}>
                    Cancel
                </Text>
            </TouchableHighlight>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: '45%',
        paddingTop: '10%',
    },
    heading: {
        fontSize: 16,
        flex: 1
    },
    inputs: {
        flex: 1,
        width: '80%',
        padding: 10
    },
    buttons: {
        marginTop: 15,
        fontSize: 16
    },
    labels: {
        paddingBottom: 10
    }
});