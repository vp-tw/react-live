import { useState } from "react";
import { Button } from "./Button";
export default function Counter() { const [count, setCount] = useState(0); return <Button onClick={() => setCount(count + 1)}>Vite count: {count}</Button>; }
