import React from 'react';

import Button from '../Button/Button';

const controls = ({
    isPrevDisabled,
    isDone,
    handlePrevClick,
    handleNextClick,
    handleCalculateGrade,
}) => {
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

    return (
        <div className="button-group">
            {PrevButton}
            {isDone ? DoneButton : NextButton}
        </div>
    );
}

export default controls;