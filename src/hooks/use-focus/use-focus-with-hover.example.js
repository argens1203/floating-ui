import {
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import { useState } from "react";

export function UseFocusWithHoverExample() {
  console.log("rerendering");
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  const hover = useHover(context);
  const focus = useFocus(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    focus,
    hover,
  ]);
  return (
    <>
      <input />
      <a
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{ display: "inline" }}
        tabIndex={0}
        href=""
      >
        Shows popup when focused or hovered
      </a>
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
