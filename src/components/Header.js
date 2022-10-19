import React from "react";

//import style
import "./scss_components/header.scss"

//import images
import sunImg from "../images/icon-sun.svg"
import moonImg from "../images/icon-moon.svg"

export default function Header() {
    //theme switcher
    const body = document.querySelector("body");
    let theme = JSON.parse(localStorage.getItem("theme")) || "dark-theme";
    body.classList.add(theme);

    //toggle between dark and light themes and save it to local storage
    function themeToggler() {
        let activeTheme = body.className;

        activeTheme === "light-theme"
            ? (body.className = "dark-theme") &&
            localStorage.setItem("theme", JSON.stringify("dark-theme"))
            : (body.className = "light-theme") &&
            localStorage.setItem("theme", JSON.stringify("light-theme"));
    }
    //


    return (
        <header className="header">
            <h1>
                <a className="header__title" href="index.html">Todo</a>
            </h1>
            <button className="header-bg-toggler" onClick={themeToggler}>
                <img src={sunImg} alt="sun" className="sun-img" />
                <img src={moonImg} alt="moon" className="moon-img" />
            </button>
        </header>
    )
}