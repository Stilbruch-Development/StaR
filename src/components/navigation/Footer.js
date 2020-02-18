import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavItem from "./NavItem";
import NavLogo from "./NavLogo";
import StilbruchLogo from "../../images/styled_images/StilbruchLogo";

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

const FooterVersion = styled.div`
  width: 20%;
`;

const Footer = () => {
  const [state, setState] = useState({
    version: ""
  });

  useEffect(() => {
    window.ipcRenderer.send("app_version");
    window.ipcRenderer.on("app_version", (event, arg) => {
      window.ipcRenderer.removeAllListeners("app_version");
      setState({ ...state, version: `Version ${arg.version}` });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.version]);

  const version_name = process.env.REACT_APP_VERSION;

  return (
    <FooterMain data-testid="FooterMain">
      <div style={{ fontSize: "1rem" }}>
        {version_name} {state.version}
      </div>
      <NavLogo dataTestId="FooterLogo" navLink="/#Start" width={"8%"} />
      <NavItem dataTestId="FooterItemKontakt" head="Hilfe" navLink="/help" />
      <NavItem
        dataTestId="FooterItemDatenschutz"
        head="Datenschutz "
        navLink="/datenschutz/#top"
      />
      <NavItem
        dataTestId="FooterItemImpressum"
        head="Impressum"
        navLink="/impressum/#top"
      />
      <FooterVersion>
        <StilbruchLogo />
      </FooterVersion>
    </FooterMain>
  );
};

export default Footer;
