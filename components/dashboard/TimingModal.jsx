import React, { useState, useEffect } from 'react';

const TimingModal = ({ maxTime, Index }) => {
    const [currentTime, setCurrentTime] = useState(0.0);
    const [isEnd, setIsEnd] = useState(false);
    const [running, setRunning] = useState(true);
    const [isTenPorcent, setIsTenPorcent] = useState(false)

    useEffect(() => {
    
        const timer = setInterval(() => {
            setCurrentTime(prevTime => {
                if (running) {
                    if (prevTime + 0.25 > maxTime) {
                        clearInterval(timer);
                        setIsEnd(true);
                    } 
                    return prevTime + 0.25;
                }
            });
        }, 250);
    
        return () => clearInterval(timer);
    }, [maxTime, Index, running]);
    

    useEffect(() => {
        if (!isTenPorcent && ((currentTime / maxTime) * 100) >= 90){
            setIsTenPorcent(true)
        }
    },[currentTime])

    useEffect(() => {
        setIsEnd(false)
        setCurrentTime(0.0)
        setRunning(true)
        setIsTenPorcent(false)
    },[Index])

    return {
        currentTime,
        isEnd,
        setRunning,
        isTenPorcent,
        setIsEnd
    };
};

export default TimingModal;
