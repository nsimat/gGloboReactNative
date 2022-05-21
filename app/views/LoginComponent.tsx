import React, {useState} from 'react';
import {Alert, TextInput, TouchableHighlight, View, Text, StyleSheet} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function LoginComponent() {

    const navigation = useNavigation();
    const [login, setLogin] = useState({
        username: '',
        password: ''
    });

    const cancelLogin = () => {
        Alert.alert('Login cancelled');
        navigation.navigate('HomeRT');
    };

    const loginUser = () => {
        if (!login.username) {
            Alert.alert('Please enter a username');
        } else if (!login.password) {
            Alert.alert('Please enter a password');
        } else {
            AsyncStorage.getItem('userLoggedIn', (err, result) => {

                if (result !== 'none') {
                    Alert.alert('Someone already logged on');
                    navigation.navigate('HomeRT');
                } else {
                    AsyncStorage.getItem(login.username, (err, result) => {
                        if (result !== null) {
                            if (result !== login.password) {
                                Alert.alert('Password is incorrect!');
                            } else {
                                AsyncStorage.setItem('userLoggedIn', login.username, (err, result) => {
                                    Alert.alert(login.username + ' Logged in.');
                                    navigation.navigate('HomeRT');
                                });
                            }
                        } else {
                            Alert.alert('No account for ' + login.username);
                        }
                    })
                }
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Login</Text>

            <TextInput
                style={styles.inputs}
                onChangeText={(text) => setLogin({...login, username: text})}
                value={login.username}
            />
            <Text style={styles.labels}>Enter Username</Text>

            <TextInput
                style={styles.inputs}
                onChangeText={(text) => setLogin({...login, password: text})}
                value={login.password}
            />
            <Text style={styles.labels}>Enter Password</Text>

            <TouchableHighlight onPress={() => loginUser()} underlayColor='#31e981'>
                <Text style={styles.buttons}>
                    Login
                </Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => cancelLogin()} underlayColor='#31e981'>
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
        paddingTop: '10%'
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
        paddingTop: 10
    }
});