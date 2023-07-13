import { computePosition } from "@floating-ui/react";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    computePosition(buttonRef.current, tooltipRef.current).then((pos) =>
      setPos(pos)
    );
  });

  return (
    <div className="App">
      <header className="App-header">
        <button ref={buttonRef} id="button" aria-describedby="tooltip">
          My button
        </button>
        <div
          ref={tooltipRef}
          style={{ left: pos.x, top: pos.y }}
          id="tooltip"
          role="tooltip"
        >
          My tooltip
        </div>
      </header>
    </div>
  );
}

export default App;
