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
            data,
            currentCardIndex: 0,

            userAnswers: new Array(data.length).fill(null),
            grade: null,

            isStarted: false,
            isTimerPaused: false,
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
        const isTimerPaused = this.state.currentCardIndex === this.state.data.length - 1;
        this.setState({
            currentCardIndex: this.state.currentCardIndex + 1,
            isTimerPaused
        });
    };

    handleTimeOut = () => {
        const grade = this.calculateGrade();
        this.setState({ grade });
    }

    handleDoneClick = () => {
        const { userAnswers } = this.state;

        let emptyAnswersIndexes = [];

        userAnswers.forEach((answer, index) => {
            if (answer === null) {
                emptyAnswersIndexes.push(index + 1);
            }
        });

        const calculate = () => {
            this.setState({ grade: this.calculateGrade() });
        }

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


    calculateGrade = () => {
        const { userAnswers, data } = this.state;
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
                if (answers[i][0] === correctCardAnswers[0]) {
                    correctUserAnswersNumber++;
                    console.log('+ 1');
                } else {
                    console.log('0');
                }
            } else {
                for (var j = 0; j < correctCardAnswers.length; j++) {
                    const cardCorrectAnswer = correctCardAnswers[j];
                    if (answers[i].length === 0) {
                        console.log('0');
                    }else if (answers[i].includes(cardCorrectAnswer)) {
                        correctUserAnswersNumber++;
                        console.log('+ 1');
                    } else {
                        console.log('- 10%');
                        correctUserAnswersNumber -= correctUserAnswersNumber/10;
                    }
                }
            }
        }

        let grade = (correctUserAnswersNumber / correctAnswersNumber * 100).toFixed(1);
        
        return grade;
    }

    render() {
        const {
            data,
            currentCardIndex,

            userAnswers,
            grade,

            isStarted,
            isTimerPaused,
        } = this.state;

        const isPrevDisabled = currentCardIndex === 0 ? true : false;
        const isDone = currentCardIndex === data.length - 1 ? true : false;

        // The Router can be used...? Extract components... Render routes...
        // Redux is comming...
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
                <TestTimer totalTime={60} isPaused={isTimerPaused} onTimeOut={this.handleTimeOut} />
                <H1 title={`Quiz: ${currentCardIndex + 1} of ${data.length}`} />
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
                    handleDoneClick={this.handleDoneClick}
                />
            </>
        );
    }
}

export default Quizes;