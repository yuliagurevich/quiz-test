import React from 'react';

import Quiz from '../Quiz/Quiz';
import Button from '../Button/Button';

const card = ({
    currentCardIndex,
    data,
    answers,
    grade,
    handleAnswerChange,
    handlePrevClick,
    handleNextClick,
    handleCalculateGrade,
    handleRestart,
}) => {
    const isPrevDisabled = currentCardIndex === 0 ? true : false;
    const isDone = currentCardIndex === data.length - 1 ? true : false;

    const PrevButton = <Button
        text="Previous"
        isDisabled={isPrevDisabled}
        onClick={handlePrevClick}
    />;

    const NextButton = <Button
        text="Next"
        onClick={handleNextClick}
    />;

    const DoneButton = <Button
        text="Done"
        onClick={handleCalculateGrade}
    />;

    const TryAgainButton = <Button
        text="Try again"
        onClick={handleRestart}
    />;

    const QuizCard = <div className="card">
        <h1 className="header">Quiz: {currentCardIndex + 1} of {data.length}</h1>
        <Quiz
            quiz={data[currentCardIndex]}
            currentValue={answers[currentCardIndex]}
            onInputChange={handleAnswerChange}
        />
        <div className="button-group">
            {PrevButton}
            {isDone ? DoneButton : NextButton}
        </div>
    </div>

    const ResultCard = <div className="card">
        <h1 className="header">Result</h1>
        <p className="result">Your grade is: {grade}</p>
        <div className="button-group">
            {TryAgainButton}
        </div>
    </div>

    if (grade !== null) return ResultCard;

    return (
        QuizCard
    );
}

export default card;