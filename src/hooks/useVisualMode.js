import { useState } from "react";

const useVisualMode = (initalMode) => {
  const [mode, setMode] = useState(initalMode);
  
  return {mode};
};

export default useVisualMode;