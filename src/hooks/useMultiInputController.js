import { useState } from "react";

export function useMultiInput(initialInputs) {
    const [multiInputs, setMultiInputs] = useState(initialInputs);
  
    function removeInputs(inputId) {
      setMultiInputs((prev) => {
        const d = Object.keys(prev).reduce((acc, key) => {
          if (key !== inputId.toString()) acc[key] = prev[key];
          return acc;
        }, {});
  
        return d;
      });
    }
  
    function addInputs(newInput) {
      const inputId = newInput.props.id;
  
      setMultiInputs((prev) => {
        return {
          ...prev,
          [inputId]: newInput,
        };
      });
    }
  
    return { multiInputs, addInputs, removeInputs };
  }