import React, { useState, useRef, useEffect } from 'react';

const Timer = ({ totalTime }) => {
    const [time, setTime] = useState(totalTime);
    const savedCallback = useRef();

    const callback = () => {
        setTime(time - 1);
    }

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        }
        console.count();
        let timer = setInterval(tick, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <p>Left:</p>
            <p>{`${Math.floor(time / 60)} minutes ${(time % 60).toFixed(0)} seconds`}</p>
        </div>
    );
}

export default Timer;