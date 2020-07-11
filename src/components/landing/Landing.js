import React, { useEffect } from "react";
import styled from "styled-components";
import MainLogo from "../../images/styled_images/MainLogo";
import useAutoUpdater from "../../hooks/useAutoUpdater";
import { Link } from "react-router-dom";

const LandingMain = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const LandingSub = styled.div`
  font-size: 3rem;
  letter-spacing: 1rem;
  margin: 2rem;

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

const Landing = () => {
  const [autoUpdater] = useAutoUpdater();

  useEffect(() => {
    autoUpdater();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoUpdater]);

  return (
    <LandingMain id="Start" data-testid="LandingComponent">
      <div className="navChange" style={{ width: "40%", padding: "4rem" }}>
        <Link to="/login">
          <MainLogo />
        </Link>
      </div>
      <LandingSub className="navChange">Standards der Radiologie</LandingSub>
    </LandingMain>
  );
};

export default Landing;
