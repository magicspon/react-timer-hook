import { useEffect } from 'react';
import useTimer from './useTimer';
import useStopwatch from './useStopwatch';
import useTime from './useTime';


export {
  useTimer,
  useStopwatch,
  useTime,
};


// This deprecated default export is just to avoid breaking old versions code before v1.1.0
export default function useTimerDeprecated(settings) {
  // didMount effect
  useEffect(() => {
    console.warn('react-timer-hook: default export useTimer is deprecated, use named exports { useTimer, useStopwatch, useTime } instead'); // eslint-disable-line
  }, []);

  /*
    We disable react hook condition lint error here, because older versions can either
    pass useTimer or useStopwatch settings, this means this condition is static
    for any specific component
  */

  if (settings.expiryTimestamp) {
    const values = useTimer(settings); // eslint-disable-line
    return {
      ...values, startTimer: values.start, stopTimer: values.pause, resetTimer: () => {},
    };
  }

  const values = useStopwatch(settings); // eslint-disable-line
  return {
    ...values, startTimer: values.start, stopTimer: values.pause, resetTimer: values.reset,
  };
}
