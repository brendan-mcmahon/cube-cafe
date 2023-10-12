import React, { useState } from "react";
import "./App.scss";
import Game from "./pages/Game.js";

import { GameProvider } from "./gameContext";
import DemoActionDisk from "./ActionDisk/ActionDisk";
import TangibleRulesModal from "./Components/TangibleRulesModal";

function App() {
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  return (
    <div className="app">
      <GameProvider>
        {/* <Game /> */}
        <button onClick={() => setRulesModalOpen(true)} >Rules</button>
        <DemoActionDisk />
        <TangibleRulesModal show={rulesModalOpen} setShow={setRulesModalOpen} />

      </GameProvider>
    </div>
  );
}

export default App;
