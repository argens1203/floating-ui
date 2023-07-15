import {
  useFloating,
  useListNavigation,
  useInteractions,
  useTypeahead,
} from "@floating-ui/react";
import { useState, useRef } from "react";
// Does not work!! typeahead crashes
const items = ["one", "two", "three"];
export function UseTypeaheadExample() {
  console.log("rerendering");
  const [activeIndex, setActiveIndex] = useState(null);
  const [value, setValue] = useState("");
  const { refs, floatingStyles, context } = useFloating({ open: true });
  const itemRef = useRef(items);
  const listRef = useRef([]);
  const typeahead = useTypeahead(context, {
    listRef,
    activeIndex,
    onMatch: setActiveIndex,
  });
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: (e) => {
      console.log(e);
      setActiveIndex(e);
    },
    findMatch: (list, typedString) => {
      console.log(list);
      console.log(typedString);
      return -1;
    },
    onTypingChange(isTyping) {
      console.log("isTyping", isTyping);
    },
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [listNavigation, typeahead]
  );
  return (
    <>
      <input />
      <div tabIndex={0} ref={refs.setReference} {...getReferenceProps()}>
        ReferenceError
      </div>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
      >
        {items.map((item, index) => (
          <div
            key={item}
            tabIndex={activeIndex === index ? 0 : -1}
            ref={(node) => {
              listRef.current[index] = node;
            }}
            {...getItemProps()}
          >
            {item}
            {/* {activeIndex === "index" ? "(selected)" : ""} */}
          </div>
        ))}
      </div>
    </>
  );
}
