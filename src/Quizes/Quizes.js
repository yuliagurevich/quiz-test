import React, { Component } from 'react';

import H1 from '../H1/H1';
import TestTimer from '../Timer/Timer';
import Card from '../Card/Card';
import Button from '../Button/Button';
import Controls from '../Controls/Controls';

import data from '../data.json';

import './style.css';

class Quizes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isStarted: false,
            data,
            currentCardIndex: 0,
            userAnswers: new Array(data.length).fill(null),
            grade: null,
        };
    }

    handleStart = () => {
        this.setState({ isStarted: true });
    };

    handleAnswerChange = e => {
        const { data, currentCardIndex, userAnswers } = this.state;

        const quiz = data[currentCardIndex];
        const hasOneAnswer = quiz.correctAnswers.length === 1;

        let _userAnswers = [...userAnswers];
        let _cardAnswers = _userAnswers[currentCardIndex];

        const value = e.target.value;

        if (_cardAnswers === null) {
            _cardAnswers = [];
            _cardAnswers.push(value);
        } else {
            if (hasOneAnswer) {
                _cardAnswers[0] = value;
            } else {
                const index = _cardAnswers.indexOf(value);
                if (index === -1) {
                    _cardAnswers.push(value);
                } else {
                    _cardAnswers.splice(index, 1);
                }
            }
        }

        _userAnswers[currentCardIndex] = _cardAnswers;
        this.setState({ userAnswers: _userAnswers });
    };

    handlePrevClick = () => {
        this.setState({ currentCardIndex: this.state.currentCardIndex - 1 });
    };

    handleNextClick = () => {
        this.setState({ currentCardIndex: this.state.currentCardIndex + 1 });
    };

    handleCalculateGrade = () => {
        const { data, userAnswers } = this.state;

        const calculate = () => {
            let answers = [...userAnswers];
            
            let correctAnswersNumber = 0;
            let correctUserAnswersNumber = 0;
            
            for (var i = 0; i < data.length; i++) {
                const correctCardAnswers = data[i].correctAnswers;
                correctAnswersNumber += correctCardAnswers.length;

                if (answers[i] === null) {
                    answers[i] = [];
                }

                if (correctCardAnswers.length === 1) {
                    answers[i][0] === correctCardAnswers[0]
                        ? correctAnswersNumber++
                        : correctUserAnswersNumber -= correctUserAnswersNumber/10;
                } else {
                    for (var j = 0; j < correctCardAnswers.length; j++) {
                        const cardCorrectAnswer = correctCardAnswers[j];
                        if (answers[i].includes(cardCorrectAnswer)) {
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

        userAnswers.forEach((answer, index) => {
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
            userAnswers: new Array(data.length).fill(null),
            grade: null,
        })
    };

    render() {
        const {
            data,
            currentCardIndex,
            userAnswers,
            grade,
            isStarted,
        } = this.state;

        const isPrevDisabled = currentCardIndex === 0 ? true : false;
        const isDone = currentCardIndex === data.length - 1 ? true : false;

        if (!isStarted) {
            return (
                <>
                    <p>Are you ready to start?</p>
                    <Button text="Start" onClick={this.handleStart} />
                </>
            );
        }

        if (grade !== null) return (
            <>
                <H1 title="Result" />
                <p className="result">Your grade is: {grade}</p>
                <div className="button-group">
                    <Button text="Try again" onClick={this.handleRestart} />
                </div>
            </>

        );
    
        return (
            <>
                <H1 title={`Quiz: ${currentCardIndex + 1} of ${data.length}`} />
                <TestTimer totalTime={300} />
                <Card
                    data={data}
                    currentCardIndex={currentCardIndex}
                    userAnswers={userAnswers}
                    onInputChange={this.handleAnswerChange}
                />
                <Controls
                    isPrevDisabled={isPrevDisabled}
                    isDone={isDone}
                    handlePrevClick={this.handlePrevClick}
                    handleNextClick={this.handleNextClick}
                    handleCalculateGrade={this.handleCalculateGrade}
                />
            </>
        );
    }
}

export default Quizes;