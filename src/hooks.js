import { useState } from "react";

export function useInput(initialValue) {
    const [inputValue, setInputValue] = useState(initialValue);

    function handleChange(event) {
        setInputValue(event.target.value);
    }

    return { value: inputValue, onChange: handleChange};
}

export function useClick(url) {
    const [link, setLink] = useState(url);

    function handleClick(newURL) {
        setLink(newURL);
    }

    return { src: link, onClick: handleClick}
}