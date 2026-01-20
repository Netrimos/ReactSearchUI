import { Routes, Route } from "react-router-dom";
import SearchHome from "./pages/SearchHome.jsx";
import Results from "./pages/Results.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchHome />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}
