import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import Quiz from '../Quiz/Quiz';

import quizesList from '../data.json';

import './style.css';

const Quizes = (props) => {
    const renderQuizesList = () => {
        return quizesList.map(({quizName}) => {
            let url = quizName.replace(' ', '-');

            return (
                <NavLink key={url} to={`${props.match.url}/${url.toLowerCase()}`}><li>{quizName}</li></NavLink>
            );
        });
    }

    const renderQuizesRoutes = () => {
        return quizesList.map((quiz) => {
            const { quizName } = quiz;
            let url = quizName.replace(' ', '-');
            
            return (
                <Route key={url} exact path={`${props.match.url}/${url.toLowerCase()}`} render={(props) => <Quiz data={quiz} {...props} />} />
            );
        });
    }
    
    return (
        <section id="quizes-container">
            <nav id="side-menu">
                <ul>
                    {renderQuizesList()}
                </ul>
            </nav>
            <section id="quiz-container">
                {renderQuizesRoutes()}
            </section>
        </section>
    );
}

export default Quizes;