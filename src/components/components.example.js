import { Select } from "./select";
import { Option } from "./option";
import "./components.css";

export function ComponentsExample() {
  return (
    <>
      <h1>Floating UI - Select with Composable Children</h1>
      <input />
      <Select>
        <Option label="Apple" />
        <Option label="Blueberry" />
        <Option label="Watermelon" />
        <Option label="Banana" />
      </Select>
      <Select>
        <Option label="One" />
        <Option label="Two" />
        <Option label="Three" />
        <Option label="Four" />
      </Select>
    </>
  );
}
