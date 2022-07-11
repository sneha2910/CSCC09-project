import "./App.css";
import React from "react";
import ULHomepage from "./ULHomepage";
import ULCreditsPage from "./ULCreditsPage";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<ULHomepage />} />
        <Route path="/credits" element={<ULCreditsPage />} />
      </Routes>
    );
  }
}

export default App;
