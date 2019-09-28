import React from "react";

import LabeledRadioInput from "../LabeledRadioInput/LabeledRadioInput";
import LabeledCheckboxInput from "../LabeledCheckboxInput/LabeledCheckboxInput";

import "./style.css";

const quiz = props => {
  const { quiz, onInputChange, currentValue } = props;

  let answers;

  if (quiz.correctAnswers.length === 1) {
    answers = renderCheckboxes(quiz, currentValue, onInputChange);
  } else {
    answers = renderRadioButtons(quiz, currentValue, onInputChange);
  }

  return (
    <>
      <p className="question">{quiz.question}</p>
      <div className="radio-group">
        {answers}
      </div>
    </>
  );
};

const renderCheckboxes = (quiz, currentValue, onInputChange) => {
  return quiz.answers.map(answer => <LabeledCheckboxInput
    key={answer}
    id={answer}
    name={quiz.question}
    value={answer}
    currentValue={currentValue}
    onChange={onInputChange}
  />);
}

const renderRadioButtons = (quiz, currentValue, onInputChange) => {
  return quiz.answers.map(answer => <LabeledRadioInput
    key={answer}
    id={answer}
    name={quiz.question}
    value={answer}
    currentValue={currentValue}
    onChange={onInputChange}
  />);
}

export default quiz;
