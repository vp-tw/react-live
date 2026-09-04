import assert from "node:assert/strict";
import test from "node:test";
import { transformLiveCode } from "../dist/react.mjs";

for (const [name, source] of [
  ["named function", "export default function Demo() { return <p />; }"],
  ["anonymous function", "export default function () { return <p />; }"],
  ["arrow function", "export default () => <p />"],
  ["class", "export default class Demo extends React.Component { render() { return <p />; } }"],
]) {
  test(`transforms a ${name} default export`, () => {
    const output = transformLiveCode(source);
    assert.doesNotMatch(output, /export default/);
    assert.match(output, /render\(React\.createElement/);
  });
}

test("preserves named declarations while removing export syntax", () => {
  const output = transformLiveCode(`
export const label = "Hello";
export default () => <p>{label}</p>;
`);
  assert.match(output, /const label = "Hello"/);
  assert.doesNotMatch(output, /export/);
});
