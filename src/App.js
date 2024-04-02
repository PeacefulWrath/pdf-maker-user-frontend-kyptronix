import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PdfList from "./PdfList"; // Your main component
import PdfDetails from "./PdfDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PdfList />} />
        <Route path="/pdfDetails" element={<PdfDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
