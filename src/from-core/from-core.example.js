import {
  computePosition,
  flip,
  shift,
  offset,
  arrow,
} from "@floating-ui/react";
import "./from-core.example.css";
import { useEffect, useRef, useState } from "react";

export function FromCoreExample() {
  console.log("rerendering");
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);
  const arrowRef = useRef(null);

  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [arrowPos, setArrowPos] = useState({ x: 0, y: 0 });
  const [staticSide, setStaticSide] = useState("bottom");

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

      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
      }[placement.split("-")[0]];
      setStaticSide(staticSide);

      const { x: arrowX, y: arrowY } = middlewareData.arrow || {};
      setArrowPos({ x: arrowX, y: arrowY });
    });
  }, []);

  const showTooltip = () => {
    console.log("showTooltip");
    setShow(true);
  };
  const hideTooltip = () => {
    console.log("hideTooltip");
    setShow(false);
  };

  return (
    <div className="App">
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button
        tabIndex={0}
        ref={buttonRef}
        id="button"
        aria-describedby="tooltip"
        style={{ margin: 5 }}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        My button
      </button>
      <div
        ref={tooltipRef}
        style={{ left: pos.x, top: pos.y, display: show ? "block" : "none" }}
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
    </div>
  );
}
