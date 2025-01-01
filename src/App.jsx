import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Favourites from "./pages/Favourites/Favourites";
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/favourites" element={<Favourites />} />
    </Routes>
  );
}

export default App;
