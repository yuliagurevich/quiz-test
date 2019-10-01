import React from 'react';
import { Link } from 'react-router-dom';

import H1 from "../H1/H1";

import './style.css';

const About = () => {
    const quizLink = <Link to="/quizes">Take the quiz</Link>

    return (
        <section id="about-container">
            <H1 title="About the quiz" />
            <p>Let me tell you about our quiz... Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id blanditiis nam magni commodi natus velit fugiat soluta libero facere praesentium doloremque, deserunt nostrum eos inventore nihil quisquam eius, eligendi non! {quizLink}</p>
        </section>
    );
}

export default About;