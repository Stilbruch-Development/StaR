import React, { useState, useEffect, useContext } from "react";
import NavItem from "./NavItem";
import NavLogo from "./NavLogo";
import NavMenu from "./NavMenu";
import styled from "styled-components";
import NavContext from "../context/navigation/navContext";
import authContext from "../context/auth/authContext";
import ExpanderContext from "../context/expander/expanderContext";

const NavMain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 80, 120, 0.8);
  padding: 0.3rem 0.7rem 0.3rem 0.7rem;
  z-index: 1;
  position: sticky;
  top: 0;

  // phone
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    padding: 1vw 15vw 1vw 15vw;
    font-size: 0.1rem;
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

const NavLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const NavRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Navbar = () => {
  const { navbarOpen, closeNav } = useContext(NavContext);

  const { isAuthenticated, logout, user } = useContext(authContext);

  const { clearExpander } = useContext(ExpanderContext);

  const [mobileViewState, setMobileViewState] = useState({ mobileView: false });

  const handleResize = () => {
    var viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;

    if (viewportWidth > 600) {
      setMobileViewState({ mobileView: false });
      closeNav();
    } else {
      setMobileViewState({ mobileView: true });
      closeNav();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    // eslint-disable-next-line
  }, []);

  window.addEventListener("load", function() {
    const body = document.querySelector("body");
    const navbar = document.querySelector(NavMain);

    function logScroll() {
      const navBottom = navbar.getBoundingClientRect().bottom;

      const element = document.getElementsByClassName("navChange");
      for (let i = 0; i < element.length; i += 1) {
        const elementTop = element[i].getBoundingClientRect().top;
        const elementBottom = element[i].getBoundingClientRect().bottom;

        if (elementTop <= navBottom && elementBottom >= 0) {
          navbar.style.background = "rgba(0, 80, 120, 0.2)";
          break;
        }

        navbar.style.background = "rgba(0, 80, 120, 0.8)";
      }
    }

    body.onscroll = logScroll;
  });

  const onLogout = () => {
    clearExpander();
    logout();
  };

  return (
    <>
      {mobileViewState.mobileView === false || navbarOpen === true ? (
        <NavMain id="NavMain">
          <NavLeft data-testid="NavbarComponent">
            <NavLogo navLink="/#Start" width={"15%"} />
            <NavItem head="Arbeitsplatz" navLink="/workplace" />
            <NavItem head="Einstellungen" navLink="/settings" />
            <NavItem head="Hilfe" navLink="/help" />
          </NavLeft>
          <NavRight>
            {isAuthenticated ? (
              <>
                <NavItem
                  style={{
                    textDecoration: "none",
                    textShadow: "none",
                    cursor: "default"
                  }}
                  head={user && `Hallo ${user.first_name}`}
                  navLink="#!"
                />
                <div onClick={onLogout}>
                  <NavItem
                    onClick={e => onLogout()}
                    head="Ausloggen"
                    navLink="/"
                  />
                </div>
              </>
            ) : (
              <>
                <NavItem head="Anmelden" navLink="/register" />
                <NavItem head="Login" navLink="/login" />
              </>
            )}
          </NavRight>
        </NavMain>
      ) : null}

      {mobileViewState.mobileView && (
        <NavMain data-testid="NavbarComponent">
          <NavMenu />
        </NavMain>
      )}
    </>
  );
};

export default Navbar;
