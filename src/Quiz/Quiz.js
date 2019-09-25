import React from "react";
import LabeledRadioInput from "../LabeledRadioInput/LabeledRadioInput";

import "./style.css";

const quiz = props => {
  const { quiz, onRadioChange, currentValue } = props;

  return (
    <>
      <p className="question">{quiz.question}</p>
      <div className="radio-group">
        {renderAnswers(quiz, currentValue, onRadioChange)}
      </div>
    </>
  );
};

const renderAnswers = (quiz, currentValue, onRadioChange) => {
  return quiz.answers.map(answer => (
    <LabeledRadioInput
      key={answer}
      id={answer}
      name={quiz.question}
      value={answer}
      currentValue={currentValue}
      onRadioChange={onRadioChange}
    />
  ));
};

export default quiz;
