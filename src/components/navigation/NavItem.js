import React from "react";
import StyledLink from "./../styled_components/StyledLink";

const NavItem = (props) => {
  return (
    <StyledLink
      data-testid={props.dataTestId}
      to={props.navLink}
      scroll={(el) => el.scrollIntoView({ behavior: "smooth", block: "start" })}
      style={props.style}
    >
      {props.head}
    </StyledLink>
  );
};
export default NavItem;
