import {
  useFloating,
  useClick,
  useInteractions,
  useFocus,
  useDismiss,
  useListNavigation,
} from "@floating-ui/react";
import { useEffect, useRef, useState } from "react";

const items = ["apple", "orange", "pear"];

export function UseListNavigationExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selected, setSelected] = useState(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  const listRef = useRef([]);
  const click = useClick(context);
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: (e) => {
      console.log(e);
      setActiveIndex(e);
    },
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, focus, listNavigation, dismiss]
  );
  useEffect(() => {
    const enterListener = window.addEventListener("keyup", (e) => {
      if (e.code === "Enter") {
        setSelected(activeIndex);
      }
    });
    return () => {
      window.removeEventListener("keyup", enterListener);
    };
  }, [activeIndex]);
  return (
    <>
      <input />
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{ display: "inline" }}
        tabIndex={0}
      >
        {Number.isNaN(selected)
          ? "Shows popup when focused or clicked"
          : items[selected]}
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
          {items.map((i, idx) => (
            <div
              key={i}
              tabIndex={activeIndex === idx ? 0 : -1}
              ref={(node) => (listRef.current[idx] = node)}
              {...getItemProps()}
            >
              {i}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
