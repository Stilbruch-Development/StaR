import React, { useContext } from "react";
import NavContext from "../context/navigation/navContext";
import NavCancel from "../../images/styled_images/NavCancel";
import NavMenuIcon from "../../images/styled_images/NavMenu";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background: rgba(0, 174, 228, 0);
  text-align: center;
  color: black;
  text-decoration: none;
  font-size: 2rem;
  min-width: 20%;
  height: 3.5rem;
  padding-bottom: 0.2vw;

  :hover {
    background: rgba(95, 95, 95, 0.7);
    box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.8);
    cursor: pointer;
  }

  // phone
  @media (max-width: 600px) {
    font-size: 8rem;
    min-width: 100%;
    height: 8vw;
    margin: 1vw 0 1vw 0;
  }
  // tablet portrait
  @media (max-width: 900px) {
  }
  // tablet landscape
  @media (max-width: 1200px) {
  }
  // desktop
  @media (max-width: 1800px) {
  }
  // >1800px = wide screen
`;

const NavMenu = () => {
  const { navbarOpen, switchNav } = useContext(NavContext);
  return (
    <Menu
      onClick={() => {
        switchNav();
      }}
    >
      {navbarOpen ? <NavCancel /> : <NavMenuIcon />}
    </Menu>
  );
};

export default NavMenu;
