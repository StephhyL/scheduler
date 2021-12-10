import { useState } from "react";

const useVisualMode = (initalMode) => {
  const [mode, setMode] = useState(initalMode);
  const [history, setHistory] = useState([initalMode]);

  // console.log("HISTORY OUTSIDE---->", history)

  const transition = (newMode, replace = false) => {
    // history.push(newMode);
    // console.log("history inside transition-->", history)
    if(replace) {
      history[history.length - 1] = newMode;
      setMode(newMode); 
    } else {
      setHistory([...history, newMode]);
      setMode(newMode);
    }
  }

  const back = () => {
    if (history.length > 1) {
      history.pop();
      // console.log("history--->", history)
      let prevMode = history[history.length - 1];
      setMode(prevMode);
    }
  };
  
  return {mode, transition, back};
};



export default useVisualMode;