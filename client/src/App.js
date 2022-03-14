import React, {Fragment} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navigation from "./components/Navigation"
import AddShow from "./pages/AddShow.js"
import Home from "./pages/Home.js"

function App() {
  return (
    <Fragment>
      <Navigation />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/addshow" element={<AddShow />}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
