import React from "react";

const style = {
    display: "block",
    textAlign: "center",
    marginTop: 110 + "px",
    color: "var(--color-text-1)",
    transition: "color 600ms ease-in-out"
}

export default function App() {
    return(
        <span style={style}>Drag and drop to reorder list</span>
    )
}