import {
  computePosition,
  flip,
  shift,
  offset,
  arrow,
} from "@floating-ui/react";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);
  const arrowRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [arrowPos, setArrowPos] = useState({ x: 0, y: 0 });
  const [placement, setPlacement] = useState("bottom");

  useEffect(() => {
    computePosition(buttonRef.current, tooltipRef.current, {
      middleware: [
        offset(5),
        flip(),
        shift({ padding: 10 }),
        arrow({ element: arrowRef.current }),
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      setPos({ x, y });
      setPlacement(placement);

      const { x: arrowX, y: arrowY } = middlewareData.arrow || {};
      setArrowPos({ x: arrowX, y: arrowY });
    });
  });

  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[placement.split("-")[0]];

  return (
    <div className="App">
      <header className="App-header">
        <button
          ref={buttonRef}
          id="button"
          aria-describedby="tooltip"
          style={{ margin: 5 }}
        >
          My button
        </button>
        <div
          ref={tooltipRef}
          style={{ left: pos.x, top: pos.y }}
          id="tooltip"
          role="tooltip"
        >
          My tooltip
          <div
            id="arrow"
            ref={arrowRef}
            style={{
              left: arrowPos.x,
              top: arrowPos.y,
              [staticSide]: -4,
            }}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
