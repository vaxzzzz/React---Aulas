import React, { useState, useEffect } from 'react';
import './DigitalClock.css';

export function DigitalClock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="clock-container">
      <span className="clock-display">{time}</span>
    </div>
  );
}

export default DigitalClock;