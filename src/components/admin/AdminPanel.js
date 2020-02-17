import React, { useState } from "react";
import styled from "styled-components";
import useToggle from "../../hooks/useToggle";
import Sidebar from "./Sidebar";
import SidebarButton from "./SidebarButton";
import Register from "../auth/Register";
import Tools from "./Tools";

const MainFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100vh;
  width: 100vw;
`;

const AdminPanel = () => {
  const [toggleState, setToggleState] = useToggle(false);
  const [AdminState, setAdminState] = useState({
    register: false,
    tools: false
  });

  const onRegisterClick = () => {
    setAdminState({
      register: !AdminState.register,
      tools: false
    });
  };

  const onToolsClick = () => {
    setAdminState({
      register: false,
      tools: !AdminState.tools
    });
  };
  return (
    <MainFlex>
      {toggleState ? (
        <Sidebar
          setToggleState={setToggleState}
          AdminState={AdminState}
          onRegisterClick={onRegisterClick}
          onToolsClick={onToolsClick}
        />
      ) : (
        <SidebarButton setToggleState={setToggleState} />
      )}
      {AdminState.register && <Register setAdminState={setAdminState} />}
      {AdminState.tools && <Tools />}
    </MainFlex>
  );
};

export default AdminPanel;
