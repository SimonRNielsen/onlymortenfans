import { useState } from "react";

export function useInput(initialValue) {
    const [inputValue, setInputValue] = useState(initialValue);

    function handleChange(event) {
        setInputValue(event.target.value);
    }

    function reset() {
        setInputValue(initialValue);
    }

    return { value: inputValue, onChange: handleChange, reset};
}

export function useClick(url) {
    const [link, setLink] = useState(url);

    function handleClick(newURL) {
        setLink(newURL);
    }

    function reset() {
        setLink(null);
    }

    return { src: link, onClick: handleClick, reset}
}