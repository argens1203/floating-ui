import {
  safePolygon,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import { useState } from "react";

export function UseHoverExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  console.log(isMenu);
  const hover = useHover(
    context,
    isMenu
      ? {
          handleClose: safePolygon(),
        }
      : undefined
  );
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);
  return (
    <>
      <div style={{ padding: 20, display: "flex" }}>
        <p>Is Menu:</p>
        <input
          type="checkbox"
          checked={isMenu}
          onChange={(e) => {
            // console.log(e.target.value);
            setIsMenu((v) => !v);
          }}
        />
        <p>{"<--------- "} when checked, can hover over floating element</p>
      </div>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{ display: "inline" }}
      >
        Reference Element
      </div>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{
            background: "black",
            color: "white",
            padding: 20,
            margin: 20,
            ...floatingStyles,
          }}
          {...getFloatingProps}
        >
          Floating Element
        </div>
      )}
    </>
  );
}
