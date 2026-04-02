import React, { useState, useEffect, useRef } from "react";
import clickAudio from "../sounds/mixkit-mouse-click-close-1113.wav";

function Counter()
{
    const [counterValue, setCounterValue] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [history, setHistory] = useState([]);
    const [autoMode, setAutoMode] = useState("none");

    const clickSound = useRef(new Audio(clickAudio));

    function playClick()
    {
        const soundClone = clickSound.current.cloneNode();
        soundClone.play();

        if (navigator.vibrate)
        {
            navigator.vibrate(30);
        }
    }

    useEffect(() =>
    {
        document.body.className = isDarkMode ? "dark" : "";
    }, [isDarkMode]);

    /* AUTO MODE */
    useEffect(() =>
    {
        let interval;

        if (autoMode === "inc")
        {
            interval = setInterval(() =>
            {
                setCounterValue((prev) =>
                {
                    const newValue = prev + 1;

                    playClick();

                    setHistory((hist) =>
                    {
                        const updated = [newValue, ...hist];
                        return updated.slice(0, 5);
                    });

                    return newValue;
                });
            }, 1000);
        }
        else if (autoMode === "dec")
        {
            interval = setInterval(() =>
            {
                setCounterValue((prev) =>
                {
                    const newValue = prev - 1; // ✅ allows negative

                    playClick();

                    setHistory((hist) =>
                    {
                        const updated = [newValue, ...hist];
                        return updated.slice(0, 5);
                    });

                    return newValue;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [autoMode]);

    /* KEYBOARD */
    useEffect(() =>
    {
        function handleKeyPress(event)
        {
            if (event.key === "ArrowUp")
            {
                playClick();
                updateCounter(counterValue + 1);
            }
            else if (event.key === "ArrowDown")
            {
                playClick();
                updateCounter(counterValue - 1); // ✅ negative allowed
            }
        }

        window.addEventListener("keydown", handleKeyPress);

        return () =>
        {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [counterValue]);

    function updateCounter(newValue)
    {
        playClick();

        setCounterValue(newValue);

        setHistory((previous) =>
        {
            const updated = [newValue, ...previous];
            return updated.slice(0, 5);
        });
    }

    function resetCounter()
    {
        playClick();
        setCounterValue(0);
        setHistory([]);
        setAutoMode("none");
    }

    return (
        <div className="counterBox">
            <h2 className="counterValue">{counterValue}</h2>

            <div className="progressBar">
                <div
                    className="progressFill"
                    style={{ width: `${Math.abs(counterValue) % 100}%` }} // ✅ FIX for negative
                ></div>
            </div>

            <div className="buttonGroup">
                <button onClick={() => updateCounter(counterValue + 1)}>+1</button>
                <button onClick={() => updateCounter(counterValue - 1)}>-1</button>
            </div>

            <div className="buttonGroup">
                <button onClick={() => updateCounter(counterValue + 5)}>+5</button>
                <button onClick={() => updateCounter(counterValue - 5)}>-5</button>
            </div>

            <button className="resetButton" onClick={resetCounter}>
                Reset
            </button>

            <button className="toggleButton" onClick={() => { playClick(); setIsDarkMode(!isDarkMode); }}>
                {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <div className="buttonGroup">
                <button className="autoInc"
                    onClick={() =>
                    {
                        playClick();
                        setAutoMode(autoMode === "inc" ? "none" : "inc");
                    }}>
                    {autoMode === "inc" ? "Stop Increment" : "Start Increment"}
                </button>

                <button className="autoDec"
                    onClick={() =>
                    {
                        playClick();
                        setAutoMode(autoMode === "dec" ? "none" : "dec");
                    }}>
                    {autoMode === "dec" ? "Stop Decrement" : "Start Decrement"}
                </button>
            </div>

            <div className="historyBox">
                <h4>History (Last 5)</h4>
                {history.length === 0
                    ? <p>No history</p>
                    : history.map((value, index) =>
                    {
                        return <p key={index}>{value}</p>;
                    })
                }
            </div>
        </div>
    );
}

export default Counter;