import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <p className="text-[48px]">Afri Food Archive</p>
    </div>
  );
}

export default App;
