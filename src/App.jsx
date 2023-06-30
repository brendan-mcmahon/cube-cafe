import "./App.css";
import Game from "./Game";

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
