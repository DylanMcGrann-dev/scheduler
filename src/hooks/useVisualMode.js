import {useState} from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = function(newMode, replace) {
    if (replace) {
      back();
    }
    setMode(newMode);
    setHistory([...history, newMode]);
  };

  const back = function() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
      setHistory(history);
    }
  }
  return { transition, mode, back };
}