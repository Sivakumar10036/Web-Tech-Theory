import React from "react";
import Counter from "./components/Counter";
import "./App.css";

function App()
{
    return (
        <div className="appContainer">
            <h1>React Counter App</h1>

            <Counter />

            <footer className="footer">
                © 2026 All Rights Reserved | Developed by <span>Rajavarapu Siva Kumar</span>
            </footer>
        </div>
    );
}

export default App;