import React, { useContext } from "react";
import StyledLink from "./../styled_components/StyledLink";
import NavContext from "../context/navigation/navContext";

const NavItem = props => {
  const { navbarOpen, closeNav } = useContext(NavContext);

  return (
    <StyledLink
      onClick={() => {
        closeNav();
      }}
      to={props.navLink}
      scroll={el => el.scrollIntoView({ behavior: "smooth", block: "start" })}
      style={props.style}
    >
      {props.head}
    </StyledLink>
  );
};
export default NavItem;
