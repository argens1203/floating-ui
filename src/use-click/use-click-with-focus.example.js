import {
  useFloating,
  useClick,
  useInteractions,
  useHover,
  useFocus,
} from "@floating-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";

export function UseClickWithFocusExample() {
  console.log("rerendering");
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  const focus = useFocus(context);
  // const hover = useHover(context);
  //Does not work with hover
  const click = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    focus,
    // hover,
    click,
  ]);
  return (
    <>
      <input />
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{ display: "inline" }}
        tabIndex={0}
        href=""
      >
        Shows popup when focused or clicked
      </button>
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
