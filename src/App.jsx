import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import AimPregame from './components/AimPregame';
import AimGame from "./components/AimGame";
import HomeButton from "./components/HomeButton";

function App() {
  return (
    <BrowserRouter>
      <HomeButton />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aimchallenge" element={<AimPregame />} />
        <Route path="/aimchallenge/play" element={<AimGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
