import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";


export default function QuestionComponent( props ){

    const [questioning, setQuestioning] = useState({
        selected: false,
        correct: false
    });

    const chooseAnswer= (ans) => {
        let worth = 25;
        if( ans === props.correctAnswer ){
            setQuestioning({...questioning,selected: true, correct: true});
            props.scoreUpdate(0);
        }
        else{
            setQuestioning({...questioning, selected: true});
            props.scoreUpdate(worth);
        }
    }

    return(
        <View style={styles.container}>
            {!questioning.selected && (
                <View style={styles.container}>
                    <Text style={styles.questionText}>{props.question}</Text>

                    <TouchableHighlight underlayColor='#d3d3d3' onPress={() => chooseAnswer('answer1')}>
                        <Text style={styles.answerText}>{props.answer1}</Text>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor='#d3d3d3' onPress={() => chooseAnswer('answer2')}>
                        <Text style={styles.answerText}>{props.answer2}</Text>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor='#d3d3d3' onPress={() => chooseAnswer('answer3')}>
                        <Text style={styles.answerText}>{props.answer3}</Text>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor='#d3d3d3' onPress={() => chooseAnswer('answer4')}>
                        <Text style={styles.answerText}>{props.answer4}</Text>
                    </TouchableHighlight>
                </View>
            )}
            { questioning.selected && questioning.correct && (
                <View style={styles.correctContainer}>
                    <Text style={styles.questionText}>{props.question}</Text>
                    <Text style={styles.answerText}>{props.answer1}</Text>
                    <Text style={styles.answerText}>{props.answer2}</Text>
                    <Text style={styles.answerText}>{props.answer3}</Text>
                    <Text style={styles.answerText}>{props.answer4}</Text>
                    <Text style={styles.answerText}>CORRECT</Text>
                </View>
            )}
            { questioning.selected && !questioning.correct && (
                <View style={styles.wrongContainer}>
                    <Text style={styles.questionText}>{props.question}</Text>
                    <Text style={styles.answerText}>{props.answer1}</Text>
                    <Text style={styles.answerText}>{props.answer2}</Text>
                    <Text style={styles.answerText}>{props.answer3}</Text>
                    <Text style={styles.answerText}>{props.answer4}</Text>
                    <Text style={styles.answerText}>INCORRECT</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    correctContainer: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#008000'
    },
    wrongContainer: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#ff0000'
    },
    questionText: {
        flex: 2,
        padding: 15,
        fontSize: 20
    },
    answerText: {
        flex: 2,
        padding: 15,
        fontSize: 20,
        textAlign: 'center'
    }
})