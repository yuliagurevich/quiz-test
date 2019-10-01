import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import Quiz from '../Quiz/Quiz';

import quizesList from '../data.json';

const Quizes = (props) => {
    const renderQuizesList = () => {
        return quizesList.map(({quizName}) => {
            let url = quizName.replace(' ', '-');

            return (
                <li><NavLink to={`${props.match.url}/${url.toLowerCase()}`}>{quizName}</NavLink></li>
            );
        });
    }

    const renderQuizesRoutes = () => {
        return quizesList.map((quiz) => {
            const { quizName } = quiz;

            let url = quizName.replace(' ', '-');

            console.log(`${props.match.url}/${url.toLowerCase()}`);
            
            return (
                <Route exact path={`${props.match.url}/${url.toLowerCase()}`} render={(props) => <Quiz data={quiz} {...props} />} />
            );
        });
    }
    
    return (
        <>
            <nav id="side-menu">
                <ul>
                    {renderQuizesList()}
                </ul>
            </nav>
            <section id="section-container">
                {renderQuizesRoutes()}
            </section>
        </>
    );
}

export default Quizes;