import React, { useContext } from 'react';
import NavItem from './NavItem';
import NavLogo from './NavLogo';
import styled from 'styled-components';
import authContext from '../context/auth/authContext';
import ExpanderContext from '../context/expander/expanderContext';
import CardsContext from '../context/cards/cardsContext';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

const NavMain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: var(--theme-color);
  padding: 0.3rem 0.7rem 0.3rem 0.7rem;
  z-index: 11;
  position: sticky;
  top: 0;
  height: 5rem;

  // phone
  @media (max-width: 600px) {
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
  const { isAuthenticated, logout, user } = useContext(authContext);

  const { clearExpander } = useContext(ExpanderContext);

  const { clearCards, setCardsState } = useContext(CardsContext);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    setCardsState('cardsUserData', null);
    clearCards();
    clearExpander();
    handleCloseMenu();
    logout();
  };

  return (
    <NavMain id="NavMain" data-testid="NavbarComponent">
      <NavLeft>
        <NavLogo navLink="/" width="75%" />
        {isAuthenticated && (
          <>
            <NavItem head="Arbeitsplatz" navLink="/workplace" />
          </>
        )}
        {isAuthenticated && user && user.role && (
          <NavItem head="Admin" navLink="/admin" />
        )}
      </NavLeft>
      <NavRight>
        {isAuthenticated ? (
          <>
            <div onClick={handleClickMenu}>
              <NavItem
                head={user && `Hallo ${user.first_name}!`}
                navLink="#!"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClickMenu}
              />
            </div>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem
                style={{
                  fontFamily: 'inherit'
                }}
              >
                <Link
                  to="/user"
                  onClick={handleCloseMenu}
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    fontSize: '1.5rem'
                  }}
                >
                  Benutzerdaten
                </Link>
              </MenuItem>
              <MenuItem
                style={{
                  textDecoration: 'none',
                  fontFamily: 'inherit',
                  fontSize: '1.5rem'
                }}
                onClick={(e) => onLogout()}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <NavItem head="Login" navLink="/login" />
        )}
      </NavRight>
    </NavMain>
  );
};

export default Navbar;
