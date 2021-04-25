import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './components/styled_components/GlobalStyle';
import Main from './components/Main';
import Footer from './components/navigation/Footer';
import Navbar from './components/navigation/Navbar';

import AuthState from './components/context/auth/AuthState';
import AlertState from './components/context/alert/AlertState';
import ExpanderState from './components/context/expander/ExpanderState';
import NavigationState from './components/context/navigation/NavState';
import CardsState from './components/context/cards/CardsState';

import useHandleException from './hooks/useHandleException';

function App() {
  const [handleException] = useHandleException();
  handleException();
  return (
    <AlertState>
      <AuthState>
        <NavigationState>
          <ExpanderState>
            <CardsState>
              <Router>
                <div className="App" data-testid="AppComponent">
                  <GlobalStyle />
                  <Navbar />
                  <Main />
                  <Footer />
                </div>
              </Router>
            </CardsState>
          </ExpanderState>
        </NavigationState>
      </AuthState>
    </AlertState>
  );
}

export default App;
