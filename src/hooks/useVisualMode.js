import { useState } from "react";

const useVisualMode = (initalMode) => {
  const [mode, setMode] = useState(initalMode);

  const transition = (newMode) => {
    setMode(newMode);
  }
  
  return {mode, transition};
};



export default useVisualMode;