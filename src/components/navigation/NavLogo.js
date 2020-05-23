import React from "react";
import NavLogoSVG from "../../images/styled_images/MainLogo";
import StyledLink from "./../styled_components/StyledLink";

const NavLogo = (props) => {
  return (
    <StyledLink
      data-testid="NavLogo"
      style={{ width: props.width }}
      to={props.navLink}
      scroll={(el) => el.scrollIntoView({ behavior: "smooth", block: "end" })}
    >
      <NavLogoSVG />
    </StyledLink>
  );
};

export default NavLogo;
