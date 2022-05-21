import {Alert, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import HeaderComponent from "../sections/HeaderComponent";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";

//Types
type Contact = {
    msg: string,
    name: string,
    email: string
}

export default function ContactComponent() {

    const navigation = useNavigation();

    const [fields, setFields] = useState<Contact>({
        msg: 'Enter a message',
        name: 'Enter a name',
        email: 'Enter your Email Address'
    });

    const clearFields = () => {
        setFields({msg: '', name: '', email: ''});
    }

    const sendMessage = () => {
        Alert.alert(fields.name, fields.msg);
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <HeaderComponent navigation={navigation.navigate} message='Press to Login'/>
            <Text style={styles.heading}>Contact Us</Text>

            <TextInput
                style={styles.inputs}
                onChangeText={(text) => setFields({...fields, name:text}) }
                value={fields.name}
            />

            <TextInput
                style={styles.multiInput}
                onChangeText={(text) => setFields({...fields, msg:text}) }
                value={fields.msg}
                multiline={true}
                numberOfLines={4}
            />

            <TextInput
                style={styles.inputs}
                onChangeText={(text) => setFields({...fields, email:text}) }
                value={fields.email}
            />

            <TouchableHighlight
                onPress={ () => sendMessage() }
                underlayColor='#31e981'>
                <Text style = {styles.buttons}>
                   Send Message
                </Text>
            </TouchableHighlight>

            <TouchableHighlight
                onPress={ () => clearFields() }
                underlayColor='#31e981'>
                <Text style = {styles.buttons}>
                    Reset Form
                </Text>
            </TouchableHighlight>

        </View>
    );
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
    multiInput: {
        flex: 2,
        width: '80%',
        paddingTop: 20
    },
    buttons: {
        marginTop: 15,
        fontSize: 16
    }
});