import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DatasetDictionary from "./pages/Datasetdictionary";
import Preprocessingintro from "./pages/Preprocessingintro";
import DelectedColumnsPreprocessing from "./pages/DelectedColumnsPreprocessing";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dataset-dictionary" element={<DatasetDictionary />} />
        <Route path="/preprocessingintro/:id" element={<Preprocessingintro />} />
        <Route path="/preprocessing/deleted-columns" element={<DelectedColumnsPreprocessing />} />
      </Routes>
    </Router>
  );
}