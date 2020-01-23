import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "./navigation/Sidebar";
import ExpanderContext from "./context/expander/expanderContext";
import Draft from "./radeditor/Draft";
import SidebarButton from "./navigation/SidebarButton";
import useToggle from "../hooks/useToggle";
import AuthContext from "./context/auth/authContext";

const MainFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Editor = styled.div`
  width: 100%;
  margin: 2vw;
  height: 100%;
`;

const Radeditor = props => {
  const {
    expanderUserData,
    getExpander,
    setExpanderItem,
    clearExpander
  } = useContext(ExpanderContext);

  const { loadUser, user } = useContext(AuthContext);

  const [toggleState, setToggleState] = useToggle(false);

  useEffect(() => {
    getExpander();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    clearExpander();
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  window.scroll({
    top: 0,
    left: 0,
    behavior: "instant"
  });
  return (
    <MainFlex>
      {toggleState ? (
        <Sidebar
          setExpanderItem={setExpanderItem}
          setToggleState={setToggleState}
        />
      ) : (
        <SidebarButton setToggleState={setToggleState} />
      )}
      <Editor>
        <Draft expanderUserData={expanderUserData} />
      </Editor>
    </MainFlex>
  );
};

export default Radeditor;
