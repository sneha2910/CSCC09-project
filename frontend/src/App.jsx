import './App.css';
import {
  Route,
  Routes,
} from "react-router-dom";
import ULLogin from "./routes/ULLogin";
import ULSignUp from "./routes/ULSignUp";
import ULForgetPassword from './routes/ULForgetPassword';
import ULTOSPage from './routes/ULTOSPage';
import ULHomepage from './routes/ULHomepage';
import ULCredits from './routes/ULCredits';

function App() {
  return (
      <Routes>
        <Route path="/login" element={<ULLogin />} />
        <Route path="/signup" element={<ULSignUp />} />
        <Route path="/forgetPassword" element={<ULForgetPassword />} />
        <Route path="/TOSPage" element={<ULTOSPage />} />
        <Route path="/" element={<ULHomepage />} />
        <Route path="/credits" element={<ULCredits />} />
      </Routes>
  );
}

export default App;
