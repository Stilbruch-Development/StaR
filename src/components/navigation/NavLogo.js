import React from 'react';
import NavLogoSVG from '../../images/styled_images/MainLogo';
import StyledLink from '../styled_components/StyledLink';

const NavLogo = (props) => {
  const { dataTestId, width, navLink } = props;
  return (
    <StyledLink
      data-testid={dataTestId}
      style={{ width: width }}
      to={navLink}
      scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'end' })}
    >
      <NavLogoSVG />
    </StyledLink>
  );
};

export default NavLogo;
