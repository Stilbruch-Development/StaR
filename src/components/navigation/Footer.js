import React from "react";
import styled from "styled-components";
import NavItem from "./NavItem";
import NavLogo from "./NavLogo";

const FooterMain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 3rem 0 3rem 0;
  border: 1px solid white;
`;

const Footer = () => {
  return (
    <FooterMain data-testid="FooterMain">
      <NavLogo dataTestId="FooterLogo" navLink="/#Start" width={"7%"} />
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
    </FooterMain>
  );
};

export default Footer;
