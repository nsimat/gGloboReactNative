import {useEffect, useState} from "react";
import {View, StyleSheet, Text, Image, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";


export default function HeaderComponent(props) {

    const navigation = useNavigation();

    const [userStatus, setUserStatus] = useState({
        isLoggedIn: false,
        loggedUser: false
    });

    const toggleUser = () => {
        if(userStatus.isLoggedIn){
            AsyncStorage.setItem('userLoggedIn', 'none', (err, result) => {
                setUserStatus({isLoggedIn: false, loggedUser: false});
                Alert.alert('User logged out');
            })
        }
        else{
            navigation.navigate('LoginRT');
        }
    }

    useEffect(() => {
        AsyncStorage.getItem('userLoggedIn', (err, result) => {
            if(result === 'none'){
                console.log('NONE');
            }
            else if(result == null){
                AsyncStorage.setItem('userLoggedIn', 'none', (err, result) => {
                    console.log('Set user to NONE');
                })
            }
            else {
                setUserStatus({isLoggedIn: true, loggedUser: result});
            }
        });
    });

    let display = userStatus.isLoggedIn ? userStatus.loggedUser : props.message;

    return (
        <View style={styles.headStyle}>
            <Image
                style={styles.logoStyle}
                source={ require('./img/Globo_logo_REV.png')}
            />
            <Text
                style={styles.headText}
                onPress={() => toggleUser()}
            >
                {display}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headText: {
        textAlign: 'right',
        color: '#ffffff',
        fontSize: 20
    },
    headStyle: {
        paddingTop: 30,
        paddingRight: 10,
        backgroundColor: '#35605a',
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: '#000000'
    },
    logoStyle: {
        flex: 1,
        width: undefined,
        height: undefined
    }
});