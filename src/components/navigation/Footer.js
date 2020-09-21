import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavItem from './NavItem';
import NavLogo from './NavLogo';
import VisionXLogo from './VisionXLogo';

const FooterMain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 3rem 0 3rem 0;
  border-top: 2px solid white;
  height: 1rem;
  background-color: rgba(150, 150, 150, 0.5);
`;

const Footer = () => {
  const [state, setState] = useState({
    version: ''
  });

  useEffect(() => {
    window.ipcRenderer && window.ipcRenderer.send('app_version');
    window.ipcRenderer &&
      window.ipcRenderer.on('app_version', (event, arg) => {
        window.ipcRenderer.removeAllListeners('app_version');
        setState({ ...state, version: `Version ${arg.version}` });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.version]);

  let version_name;

  if (process.env.NODE_ENV === 'development') {
    version_name = 'Dev';
  } else {
    version_name = process.env.REACT_APP_VERSION;
  }

  return (
    <FooterMain data-testid="FooterComponent">
      <div style={{ fontSize: '1rem' }}>
        {version_name} {state.version}
      </div>
      <NavLogo dataTestId="FooterLogo" navLink="/#Start" width={'9%'} />
      <NavItem dataTestId="FooterItemHelp" head="Hilfe" navLink="/help" />
      <NavItem
        dataTestId="FooterItemGDPR"
        head="Datenschutz "
        navLink="/gdpr/#top"
      />
      <NavItem
        dataTestId="FooterItemImprint"
        head="Impressum"
        navLink="/imprint/#top"
      />
      <VisionXLogo width={'10%'} />
    </FooterMain>
  );
};

export default Footer;
