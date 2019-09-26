import React from 'react';
import { Link } from 'react-router-dom';

const about = () => {
    const quizLink = <Link to="/quizes">Take the quiz</Link>

    return (
        <>
            <h1>About the quiz</h1>
            <p>Let me tell you about our quiz... Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id blanditiis nam magni commodi natus velit fugiat soluta libero facere praesentium doloremque, deserunt nostrum eos inventore nihil quisquam eius, eligendi non! {quizLink}</p>
        </>
    );
}

export default about;