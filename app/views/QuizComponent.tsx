import React, {useEffect, useState} from 'react';
import {QuizData} from "../data/QuizQuestionsComponent";
import {useNavigation} from "@react-navigation/native";
import { FlatList, TouchableHighlight, StyleSheet, View, Text} from "react-native";
import QuestionComponent from "../sections/QuestionComponent";

//Types
type Question = {
    question: string,
    answer1: string,
    answer2: string,
    answer3: string,
    answer4: string,
    correctAnswer: string,
    key: string
}

export default function QuizComponent() {

    const navigation = useNavigation();

    const [summary, setSummary] = useState({
        questLoaded: false,
        questionsList: [] as Question[],
        numberOfQuestions: 0,
        incorrect: 0,
        questionsAnswered: 0,
        totalScore: 100,
        completedQuiz: false
    });

    useEffect(() => {
        let listOfQuestions = Array.from(QuizData.questions);
        if(!summary.questLoaded){
            setSummary({
                ...summary,
                questionsList: listOfQuestions,
                questLoaded: true,
                numberOfQuestions: listOfQuestions.length
            });
        }
    }, [summary.questLoaded,summary.questionsList]);

    const updateScore = (penalty) => {
        let tempScore = summary.totalScore;
        let missed = summary.incorrect;
        let questionsTotal = summary.numberOfQuestions;
        let questionsDone = summary.questionsAnswered;

        let newScore = tempScore - penalty;
        let totalAnswered = questionsDone + 1;
        let totalMissed = penalty ? missed + 1 : missed;

        setSummary({
            ...summary,
            totalScore: newScore,
            incorrect: totalMissed,
            questionsAnswered: totalAnswered
        });

        console.log('Questions Answered -> ', summary.questionsAnswered);
        console.log('Quiz completed -> ', summary.completedQuiz);
        console.log('Total Missed -> ', totalMissed);
        console.log('Total questions -> ', questionsTotal);

        if (totalAnswered === questionsTotal) {
            setSummary({...summary, completedQuiz: true});
        }
    }

    const finishQuiz = () => {
        navigation.navigate('FinishRT', {
            score: summary.totalScore,
            missed: summary.incorrect,
            questions: summary.numberOfQuestions
        });
    }

    return (
        <View style={styles.container}>
            {summary.questLoaded && (
                <FlatList
                    data={summary.questionsList}
                    keyExtractor={item => item.key}
                    renderItem={({item}) =>
                        <QuestionComponent
                            question={item.question}
                            answer1={item.answer1}
                            answer2={item.answer2}
                            answer3={item.answer3}
                            answer4={item.answer4}
                            correctAnswer={item.correctAnswer}
                            scoreUpdate={updateScore}
                        />
                    }
                />
            )}

            {!summary.completedQuiz && (
                <TouchableHighlight style={styles.disabled}>
                    <Text>Answer all the questions</Text>
                </TouchableHighlight>
            )}

            {summary.completedQuiz && (
                <TouchableHighlight onPress={finishQuiz} style={styles.enabled}>
                    <Text>Finished</Text>
                </TouchableHighlight>
            )}

            { !summary.questLoaded && (
                <Text>LOADING...</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30
    },
    disabled: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d3d3d3',
        height: '10%'
    },
    enabled: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#90ee90',
        height: '10%'
    }
})