import { useState, useRef, useEffect } from "react";
import { FaArrowUp, FaArrowDown, FaRedoAlt, FaPlay, FaPause } from "react-icons/fa";
import "./App.css";

function App() {
  const [timer, setTimer] = useState("25:00");
  const [isPlaying, setIsPlaying] = useState(false);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [isSession, setIsSession] = useState(true);

  const ref = useRef(null);

  const getDeadTime = (duration) => {
    let deadline = new Date();
    deadline.setMinutes(deadline.getMinutes() + duration);
    return deadline;
  };

  const getTimerRemaining = (deadline) => {
    const total = Date.parse(deadline) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (deadline) => {
    let { total, minutes, seconds } = getTimerRemaining(deadline);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } else {
      clearInterval(ref.current);
      if (isSession) {
        startBreak();
      } else {
        startSession();
      }
    }
  };

  const clearTimer = (deadline) => {
    if (ref.current) clearInterval(ref.current);
    const id = setInterval(() => {
      startTimer(deadline);
    }, 1000);
    ref.current = id;
  };

  const startSession = () => {
    clearTimer(getDeadTime(sessionLength));
    setIsSession(true);
  };

  const startBreak = () => {
    clearTimer(getDeadTime(breakLength));
    setIsSession(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    if (ref.current) clearInterval(ref.current);
    setIsPlaying(false);
    setTimer("25:00");
    setBreakLength(5);
    setSessionLength(25);
    setIsSession(true);
  };


  useEffect(() => {
    if (isPlaying) {
      startSession();
    } else {
      if (ref.current) clearInterval(ref.current);
    }
  }, [isPlaying]);
  return (
    <>
      <div id="header">25 + 5 Clock</div>
      <div id="handle">
        <div id="break">
          <p>Break Length</p>
          <div id="break-handler">
            <FaArrowUp onClick={() => setBreakLength((prev) => Math.min(prev + 1, 60))}/>
          <p>{breakLength}</p>
            <FaArrowDown onClick={() => setBreakLength((prev) => Math.max(prev - 1, 1))}/>
        </div>
        </div>
        <div id="session">
          <p>Session Length</p>
          <div id="break-handler">
            <FaArrowUp onClick={() => setSessionLength((prev) => Math.min(prev + 1, 60))}/>
          <p>{sessionLength}</p>
            <FaArrowDown onClick={() => setSessionLength((prev) => Math.max(prev - 1, 1))}/>
          </div>
        </div>
      </div>
      <div className="circle-container">
      <div className="hour">Achieve</div>
      <div className="hour">Focus</div>
      <div className="hour">Breathe</div>
      <div className="hour">Go!</div>
      <div className="hour">Push</div>
      <div className="hour">Power</div>
      <div className="hour">Focus</div>
      <div className="hour">Believe</div>
      <div className="hour">Persist</div>
      <div className="hour">Grow</div>
      <div className="hour">Relax</div>
      <div className="hour">Finish</div>
        <div className="radius"></div>
        <div id="display">{timer}</div>
        <div id="reset-play">
      <div onClick={togglePlayPause} className="interactive-btn">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </div>
      <FaRedoAlt onClick={reset} className="interactive-btn"/>
      </div>
      </div>
      <p id="me">Designed and coded by Tinsae J.</p>
      
    </>
  );
}

export default App;
