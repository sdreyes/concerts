import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import AddShow from "./pages/AddShow.js"
import Home from "./pages/Home.js"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/addshow" element={<AddShow />}/>
      </Routes>
    </Router>
  );
}

export default App;
