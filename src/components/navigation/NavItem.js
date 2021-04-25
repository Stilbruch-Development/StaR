import React from 'react';
import StyledLink from '../styled_components/StyledLink';

const NavItem = (props) => {
  const { dataTestId, navLink, style, head } = props;
  return (
    <StyledLink
      data-testid={dataTestId}
      to={navLink}
      scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      style={style}
    >
      {head}
    </StyledLink>
  );
};
export default NavItem;
