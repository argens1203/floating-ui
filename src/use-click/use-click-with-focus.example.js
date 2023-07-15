import {
  useFloating,
  useClick,
  useInteractions,
  useHover,
  useFocus,
  useRole,
  useDismiss,
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
  const dismiss = useDismiss(context);
  // useRole does not work
  // const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    focus,
    // hover,
    // role,
    dismiss,
    click,
  ]);
  return (
    <>
      <input />
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{ display: "inline" }}
        tabIndex={0}
      >
        Shows popup when focused or clicked, Escape to close
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
