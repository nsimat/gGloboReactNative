import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from "react-native";


export default function FinishQuizComponent({ route, navigation }){

    const exitQuiz = () => {
        navigation.navigate('HomeRT');
    }
    const { score, missed, questions } = route.params;
    let userScore = score;
    let questionsMissed = missed;
    let totalQuestions = questions;


    return(
        <View style={styles.container}>
            <Text>Your quiz score was {score}.</Text>
            <Text>You missed on {missed} out of {questions} questions.</Text>

            <TouchableHighlight onPress={exitQuiz} style={styles.button}>
                <Text>Finish Quiz</Text>
            </TouchableHighlight>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '10%'
    }
})