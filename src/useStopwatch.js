import { useState, useEffect, useRef } from 'react';

/* --------------------- useStopwatch ----------------------- */

export default function useStopwatch(settings) {
  const { autoStart } = settings || {};

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef();

  function addDay() {
    setDays((prevDays) => (prevDays + 1));
  }

  function addHour() {
    setHours((prevHours) => {
      if (prevHours === 23) {
        addDay();
        return 0;
      }
      return prevHours + 1;
    });
  }

  function addMinute() {
    setMinutes((prevMinutes) => {
      if (prevMinutes === 59) {
        addHour();
        return 0;
      }
      return prevMinutes + 1;
    });
  }

  function addSecond() {
    setSeconds((prevSeconds) => {
      if (prevSeconds === 59) {
        addMinute();
        return 0;
      }
      return prevSeconds + 1;
    });
  }

  function start() {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => addSecond(), 1000);
    }
  }

  function clearIntervalRef() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }

  function pause() {
    clearIntervalRef();
  }

  function reset() {
    clearIntervalRef();
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setDays(0);
  }

  useEffect(() => {
    if (autoStart) {
      start();
    }
    return clearIntervalRef;
  });

  return {
    seconds, minutes, hours, days, start, pause, reset,
  };
}
