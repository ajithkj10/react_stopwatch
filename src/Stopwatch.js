// import React, {useState,useEffect,useRef, useCallback} from 'react'

//  function Stopwatch() {
//     const [isRunning,setIsRunning]=useState(false);
//     const [elapasedTime,setElapasedTime]=useState(0);
//     const intervalIdRef=useRef(null);
//     const startTimeRef=useRef(0);
//     useEffect(()=>{
//         if(isRunning){
//          intervalIdRef.current= setInterval(()=>{
//                 setElapasedTime(Date.now() = startTimeRef.current );
//             },10)
//         }
//       return ()=>{
//         clearInterval( intervalIdRef.current);
//       }
//     },[isRunning]);
//     function start(){
// setIsRunning(true)
// startTimeRef.current = Date.now()= elapasedTime;
//     }
//     function stop(){
//         setIsRunning(false)
//     }
//     function reset(){
//         elapasedTime(0)
//         setIsRunning(false)
//     }
//     function formatTime(){
//         let hours=Math.floor(elapasedTime/(1000 * 60 * 60));
//         let minutes=Math.floor(elapasedTime/(1000 * 60) % 60);
//         let seconds=Math.floor(elapasedTime/(1000 ) % 60);
//         let milliseconds=Math.floor((elapasedTime % 1000)/10);

//         hours=String(hours).padStart(2,"0");
//         minutes=String(minutes).padStart(2,"0")
//         seconds=String(seconds).padStart(2,"0")
//         milliseconds=String(milliseconds).padStart(2,"0")

//         return `${minutes}:${seconds}:${milliseconds}`;
//     }

//    return (

//     <div className="stopwatch">
//         <div className="display">{formatTime()}</div>
//         <div className="controls">
//             <button onClick={start} className="start-button">Start</button>
//             <button onClick={stop} className="start-button">Start</button>
//             <button onClick={reset } className="start-button">Start</button>
//         </div>
//          </div>
//   )
// }
// export default Stopwatch;

import React, { useState, useEffect } from "react";
import "./Stopwatch.css";

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false); // Whether the stopwatch is running or not

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Update time every 10ms
      }, 10);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup on component unmount or when the effect re-runs
  }, [isRunning]);

  const formatTime = (time) => {
    const milliseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
    const seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
    const minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div>
      <h1>{formatTime(time)}</h1>
      <div>
        {!isRunning ? (
          <button onClick={() => setIsRunning(true)}>Start</button>
        ) : (
          <button onClick={() => setIsRunning(false)}>Pause</button>
        )}
        <button
          onClick={() => {
            setTime(0);
            setIsRunning(false);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
