import { useFloating, useClick, useInteractions } from "@floating-ui/react";
import { useState } from "react";

export function UseClickExample() {
  console.log("rerendering");
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  const click = useClick(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click]);
  return (
    <>
      <input />
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{ display: "inline" }}
        tabIndex={0}
        href=""
      >
        Shows popup when clicked
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
          {...getFloatingProps()}
        >
          Floating Element
        </div>
      )}
    </>
  );
}
