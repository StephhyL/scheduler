import { useState } from "react";

/** Custom hook that returns mode, transition function, and back function */
const useVisualMode = (initalMode) => {
  const [mode, setMode] = useState(initalMode);
  const [history, setHistory] = useState([initalMode]);

  /** Sets mode and history based on incoming mode, and replace value */
  const transition = (newMode, replace = false) => {
    // if replace=true, sets history with previous hx (minus last item in array), plus incoming mode, and sets mode to incoming mode
    if (replace) {
      setHistory((prevHistory) => {
        const copyOfHistory = [...prevHistory];
        copyOfHistory.pop();
        copyOfHistory.push(newMode);
        setMode(newMode);
        return copyOfHistory;
      });
      // Else, sets history with previous hx plus incoming mode, and sets mode to incoming mode
    } else {
      setHistory(() => {
        setMode(newMode);
        return [...history, newMode];
      });
    }
  };

  /** Set mode and history to the previous mode and history*/
  const back = () => {
    // only proceeds if there is a previous mode
    if (history.length > 1) {
      setHistory((prevHistory) => {
        const copyOfHistory = [...prevHistory];
        copyOfHistory.pop();
        const prevMode = copyOfHistory[copyOfHistory.length - 1];
        setMode(prevMode);
        return copyOfHistory;
      });
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;
