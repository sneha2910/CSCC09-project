import "./App.css";
import { Route, Routes } from "react-router-dom";
import ULLogin from "./routes/ULLogin";
import ULSignUp from "./routes/ULSignUp";
import ULTOSPage from "./routes/ULTOSPage";
import ULHomepage from "./routes/ULHomepage";
import ULCredits from "./routes/ULCredits";
import ULDesign from "./routes/ULDesign";
import ULProject from "./routes/ULProject";
import { UserContextProvider } from "./contexts/UserContext";
import ULPresentation from "./routes/ULPresentation";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  /* Parse the cookie and get the current user */
  return (
    <ChakraProvider>
      <UserContextProvider>
        <Routes>
          <Route path="/login" element={<ULLogin />} />
          <Route path="/signup" element={<ULSignUp />} />
          <Route path="/TOSPage" element={<ULTOSPage />} />
          <Route path="/" element={<ULHomepage />} />
          <Route path="/credits" element={<ULCredits />} />
          <Route path="/design" element={<ULDesign />} />
          <Route path="/project" element={<ULProject />} />
          <Route path="/presentation" element={<ULPresentation />} />
        </Routes>
      </UserContextProvider>
    </ChakraProvider>
  );
}

export default App;
