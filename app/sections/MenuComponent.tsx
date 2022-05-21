import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import {useNavigation} from "@react-navigation/native";


export default function MenuComponent(){

    const navigation = useNavigation();
    console.log('MENU NAVIGATION -> ', navigation);

    // @ts-ignore
    return (
        <View style={styles.container}>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.buttonStyles}
                    onPress={() => navigation.navigate('LessonsRT')}>
                    <Text style={styles.buttonText}>LESSONS</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonStyles}
                    onPress={() => navigation.navigate('RegisterRT')}>
                    <Text style={styles.buttonText}>REGISTER</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.buttonStyles}
                    onPress={() => navigation.navigate('BlogRT')}>
                    <Text style={styles.buttonText}>BLOG</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonStyles}
                    onPress={ () => navigation.navigate('ContactRT') }>
                    <Text style={styles.buttonText}>CONTACT</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.buttonStyles}
                    onPress={() => navigation.navigate('QuizRT')}>
                    <Text style={styles.buttonText}>QUIZ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonStyles}
                    onPress={() => Alert.alert('You tapped the button!')}>
                    <Text style={styles.buttonText}>ABOUT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 6,
        backgroundColor: '#35605a'
    },
    buttonRow: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ffffff',
        borderBottomWidth: 1
    },
    buttonStyles: {
        backgroundColor: '#35605a',
        width: '50%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18
    }
});