import React, { useState } from "react";

export function useInput(initialValue) {
    const [inputValue, setInputValue] = useState(initialValue);

    function handleChange(event) {
        setInputValue(event.target.value);
    }

    return { value: inputValue, onChange: handleChange};
}