import "./App.css";
import React from "react";
import ULHomepage from "./routes/ULHomepage";
import ULCredits from "./routes/ULCredits";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<ULHomepage />} />
        <Route path="/credits" element={<ULCredits />} />
      </Routes>
    );
  }
}

export default App;
