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
        const { answers, currentCardIndex } = this.state;

        const userAnswer = e.target.value;

        let _answers = [...answers];
        _answers[currentCardIndex] = userAnswer;

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
            const correctAnswers = data.map((quiz) => quiz.correctAnswer);

            let _answers = [...answers];
            _answers = _answers.filter((answer, index) => answer === correctAnswers[index]);

            const questionsNumber = this.state.data.length;
            let grade = _answers.length / questionsNumber * 100;

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