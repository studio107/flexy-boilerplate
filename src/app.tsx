import { h, render } from "preact";
import HelloWorld from "./HelloWorld";

render(<HelloWorld compiler="typescript" framework="preact" />, document.querySelector("#app"));
