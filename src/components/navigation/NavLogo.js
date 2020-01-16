import React, { useContext } from "react";
import NavContext from "../context/navigation/navContext";
import NavLogoSVG from "../../images/styled_images/MainLogoSmall";
import StyledLink from "./../styled_components/StyledLink";

const NavLogo = props => {
  const { navbarOpen, closeNav } = useContext(NavContext);

  return (
    <StyledLink
      data-testid="NavLogo"
      onClick={() => {
        closeNav();
      }}
      style={{ width: props.width, height: "100%" }}
      to={props.navLink}
      scroll={el => el.scrollIntoView({ behavior: "smooth", block: "end" })}
    >
      <NavLogoSVG />
    </StyledLink>
  );
};

export default NavLogo;
