import React, { useState } from "react";
import styled from "styled-components";
import MainLogo from "../../images/styled_images/MainLogo";

const LandingMain = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LandingSub = styled.div`
  font-size: 3rem;
  letter-spacing: 1rem;
  margin: 3rem;

  // phone
  @media (max-width: 600px) {
    font-size: 6rem;
    letter-spacing: 1rem;
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

const Version = styled.div`
  font-size: 2rem;
  letter-spacing: 1rem;
  margin: 3rem;

  // phone
  @media (max-width: 600px) {
    font-size: 6rem;
    letter-spacing: 1rem;
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
  const [state, setState] = useState({ version: "" });

  window.ipcRenderer.send("app_version");
  window.ipcRenderer.on("app_version", (event, arg) => {
    window.ipcRenderer.removeAllListeners("app_version");
    setState({ version: `Version ${arg.version}` });
  });
  return (
    <LandingMain id="Start" data-testid="LandingComponent">
      <div className="navChange">
        <MainLogo />
      </div>
      <LandingSub className="navChange">Standards der Radiologie</LandingSub>
      <Version className="navChange">{state.version}</Version>
    </LandingMain>
  );
};

export default Landing;
