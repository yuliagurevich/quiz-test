import React, { useState, useRef, useEffect } from 'react';

const Timer = ({ totalTime, isPaused, onTimeOut }) => {
    const [time, setTime] = useState(totalTime);
    const savedCallback = useRef();
    let delay = isPaused ? Number.MAX_SAFE_INTEGER : 1000;

    const callback = () => {
        setTime(time - 1);
    }

    useEffect(() => {
        if (time === 0) {
            onTimeOut();
        }
        savedCallback.current = callback;
    });

    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        }
        console.count();
        let timer = setInterval(tick, delay);
        return () => clearInterval(timer);
    }, [delay]);

    return (
        <div id="timer">
            <p>Left:</p>
            <p>{`${Math.floor(time / 60)} minutes ${(time % 60).toFixed(0)} seconds`}</p>
        </div>
    );
}

export default Timer;