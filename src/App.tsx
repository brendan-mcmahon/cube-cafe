import React from "react";
import "./App.scss";
import Game from "./pages/Game.js";

import { GameProvider } from "./gameContext";

function App() {
  return (
    <div className="app">
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
}

export default App;
