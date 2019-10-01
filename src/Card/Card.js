import React from 'react';

import LabeledRadioInput from "../LabeledRadioInput/LabeledRadioInput";
import LabeledCheckboxInput from "../LabeledCheckboxInput/LabeledCheckboxInput";


const Card = ({
    data,
    currentCardIndex,
    userAnswers,
    onInputChange,
}) => {
    let quiz = data[currentCardIndex];
    let currentValue = userAnswers[currentCardIndex];
    let answers;

    if (quiz.correctAnswers === undefined) return null;

    if (quiz.correctAnswers.length !== 1) {
        answers = renderCheckboxes(quiz, currentValue, onInputChange);
    } else {
        answers = renderRadioButtons(quiz, currentValue, onInputChange);
    }

    return (
        <div className="card">
            <p className="question">{quiz.question}</p>
            <div className="radio-group">
                {answers}
            </div>
        </div>
    );
}

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

export default Card;