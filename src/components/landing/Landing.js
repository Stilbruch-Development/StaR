import React, { useEffect } from "react";
import styled from "styled-components";
import MainLogo from "../../images/styled_images/MainLogo";
import useAutoUpdater from "../../hooks/useAutoUpdater";

const LandingMain = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const LandingSub = styled.div`
  font-size: 2rem;
  letter-spacing: 1rem;
  margin: 3rem;

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
      <div className="navChange" style={{ width: "40%" }}>
        <MainLogo />
      </div>
      <LandingSub className="navChange">Standards der Radiologie</LandingSub>
    </LandingMain>
  );
};

export default Landing;
