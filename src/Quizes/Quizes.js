import React, { Component } from 'react';

import Card from '../Card/Card';

import data from '../data.json';

import './style.css';

class Quizes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data,
            currentCardIndex: 0,
            answers: new Array(data.length).fill(null),
            grade: null,
        };
    }

    handleAnswerChange = e => {
        const { data, answers, currentCardIndex } = this.state;

        const quiz = data[currentCardIndex];
        const hasOneAnswer = quiz.correctAnswers.length === 1;

        let _answers = [...answers];
        let cardAnswers = _answers[currentCardIndex];

        const value = e.target.value;

        if (cardAnswers === null) {
            cardAnswers = [];
            cardAnswers.push(value);
        } else {
            if (hasOneAnswer) {
                cardAnswers[0] = value;
            } else {
                const index = cardAnswers.indexOf(value);
                if (index === -1) {
                    cardAnswers.push(value);
                } else {
                    cardAnswers.splice(index, 1);
                }
            }
        }

        _answers[currentCardIndex] = cardAnswers;
        this.setState({ answers: _answers });
    };

    handlePrevClick = () => {
        this.setState({ currentCardIndex: this.state.currentCardIndex - 1 });
    };

    handleNextClick = () => {
        this.setState({ currentCardIndex: this.state.currentCardIndex + 1 });
    };

    handleCalculateGrade = () => {
        const { data, answers } = this.state;

        const calculate = () => {
            let userAnswers = [...answers];
            
            let correctAnswersNumber = 0;
            let correctUserAnswersNumber = 0;
            
            for (var i = 0; i < data.length; i++) {
                const correctCardAnswers = data[i].correctAnswers;
                correctAnswersNumber += correctCardAnswers.length;

                if (userAnswers[i] === null) {
                    userAnswers[i] = [];
                }

                if (correctCardAnswers.length === 1) {
                    userAnswers[i][0] === correctCardAnswers[0]
                        ? correctAnswersNumber++
                        : correctUserAnswersNumber -= correctUserAnswersNumber/10;
                } else {
                    for (var j = 0; j < correctCardAnswers.length; j++) {
                        const cardCorrectAnswer = correctCardAnswers[j];
                        if (userAnswers[i].includes(cardCorrectAnswer)) {
                            correctUserAnswersNumber++;
                        } else {
                            correctUserAnswersNumber -= correctUserAnswersNumber/10;
                        }
                    }
                }
            }

            let grade = (correctUserAnswersNumber / correctAnswersNumber * 100).toFixed(1);

            this.setState({ grade });
        }

        let emptyAnswersIndexes = [];

        answers.forEach((answer, index) => {
            if (answer === null) {
                emptyAnswersIndexes.push(index + 1);
            }
        });

        if (emptyAnswersIndexes.length === 0) {
            calculate();
        } else {
            const indexes = emptyAnswersIndexes.join(', ');
            const shouldCalculate = window.confirm(`The following questions were left without answers: ${indexes}. Are you sure you want to calculate your grade?`);
            if (shouldCalculate) {
                calculate();
            } else {
                this.setState({
                    currentCardIndex: emptyAnswersIndexes[0] - 1
                });
            }
        }
    };

    handleRestart = () => {
        this.setState({
            currentCardIndex: 0,
            answers: new Array(data.length).fill(null),
            grade: null,
        })
    }

    render() {
        const {
            data,
            currentCardIndex,
            answers,
            grade,
        } = this.state;

        return (
            <Card
                data={data}
                currentCardIndex={currentCardIndex}
                answers={answers}
                grade={grade}
                handleAnswerChange={this.handleAnswerChange}
                handlePrevClick={this.handlePrevClick}
                handleNextClick={this.handleNextClick}
                handleCalculateGrade={this.handleCalculateGrade}
                handleRestart={this.handleRestart}
            />
        );
    }
}

export default Quizes;