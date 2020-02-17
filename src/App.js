import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./components/styled_components/GlobalStyle";
import Main from "./components/Main";
import Footer from "./components/navigation/Footer";
import Navbar from "./components/navigation/Navbar";

import AuthState from "./components/context/auth/AuthState";
import AlertState from "./components/context/alert/AlertState";
import ExpanderState from "./components/context/expander/ExpanderState";

function App() {
  return (
    <AuthState>
      <AlertState>
        <ExpanderState>
          <Router>
            <div className="App">
              <GlobalStyle />
              <Navbar />
              <Main />
              <Footer />
            </div>
          </Router>
        </ExpanderState>
      </AlertState>
    </AuthState>
  );
}

export default App;
