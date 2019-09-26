import React, { Component } from "react";

import data from './data.json';

import Quiz from "./Quiz/Quiz";
import Button from "./Button/Button";

import "./App.css";

class App extends Component {
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
    const { data, currentCardIndex, answers, grade } = this.state;

    const isPrevDisabled = currentCardIndex === 0 ? true : false;
    const isDone = currentCardIndex === data.length - 1 ? true : false;

    const PrevButton = <Button
      text="Previous"
      isDisabled={isPrevDisabled}
      onClick={this.handlePrevClick}
    />;

    const NextButton = <Button
      text="Next"
      onClick={this.handleNextClick}
    />;

    const DoneButton = <Button
      text="Done"
      onClick={this.handleCalculateGrade}
    />;

    const TryAgainButton = <Button
      text="Try again"
      onClick={this.handleRestart}
    />;

    if (grade !== null) return (
      <>
        <div className="card">
          <h1 className="header">Result</h1>
          <p className="result">Your grade is: {grade}</p>
          <div className="button-group">
            {TryAgainButton}
          </div>
        </div>
      </>
    );

    return (
      <>
        <div className="card">
          <h1 className="header">Quiz: {currentCardIndex + 1} of {data.length}</h1>
          <Quiz
            quiz={data[currentCardIndex]}
            currentValue={answers[currentCardIndex]}
            onRadioChange={this.handleAnswerChange}
          />
          <div className="button-group">
            {PrevButton}
            {isDone ? DoneButton : NextButton}
          </div>
        </div>
      </>
    );
  }
}

export default App;
