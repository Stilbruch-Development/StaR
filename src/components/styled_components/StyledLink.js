import styled from 'styled-components';
import { HashLink as Link } from 'react-router-hash-link';

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: rgba(0, 174, 228, 0);
  text-align: center;
  color: black;
  text-decoration: none;
  font-size: 1.5rem;
  padding: 0rem 1rem 0rem 1rem;

  :hover {
    text-shadow: 4px 3px 5px rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }

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

export default StyledLink;
