import { useState } from "react";

const useVisualMode = (initalMode) => {
  const [mode, setMode] = useState(initalMode);
  const [history, setHistory] = useState([initalMode]);

  // console.log("HISTORY OUTSIDE---->", history)

  const transition = (newMode, replace = false) => {
    // history.push(newMode);
    // console.log("history inside transition-->", history)
    if(replace) {
      setHistory((prevHistory)=> {
        const copyOfHistory = [...prevHistory];
        copyOfHistory.pop();
        copyOfHistory.push(newMode);
        setMode(newMode);
        return copyOfHistory;
      })
      // history[history.length - 1] = newMode;
      // setMode(newMode); 
    } else {
      setHistory(()=> {
        setMode(newMode);
        return [...history, newMode];
      })
      // setHistory([...history, newMode]);
      // setMode(newMode);
    }
  }

  const back = () => {
    if (history.length > 1) {

      setHistory((prevHistory) => {
        // console.log("prevHistory--->", prevHistory)
        const copyOfHistory = [...prevHistory];
        copyOfHistory.pop();
        // console.log("copyOfHistory--->", copyOfHistory)

        const prevMode = copyOfHistory[copyOfHistory.length - 1];
        // console.log("prevMode--->", prevMode)
        setMode(prevMode);
        return copyOfHistory;
      })
      // console.log("prevHistory---->", prevHistory)
      // const copyOfHistory = [prevHistory];
      // console.log("copyOfHistory", copyOfHistory)
      // copyOfHistory.pop();
      // // console.log("history--->", history)
      // let prevMode = copyOfHistory[history.length - 1];
      // setMode(prevMode);
      // return copyOfHistory;

      //history.pop();
      // let prevMode = history[history.length - 1];
      // setMode(prevMode)


    }
  };
  
  return {mode, transition, back};
};



export default useVisualMode;