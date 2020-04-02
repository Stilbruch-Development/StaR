import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import LeftSidebar from "./navigation/LeftSidebar";
import RightSidebar from "./navigation/RightSidebar";
import ExpanderContext from "./context/expander/expanderContext";
import Draft from "./editor/Draft";
import LeftSidebarButton from "./navigation/LeftSidebarButton";
import RightSidebarButton from "./navigation/RightSidebarButton";
import useToggle from "../hooks/useToggle";
import AuthContext from "./context/auth/authContext";
import LungenembolieState from "./context/lists/lungenembolie/LungenembolieState";
import NavContext from "../components/context/navigation/navContext";

const MainFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const EditorWrapper = styled.div`
  width: 100%;
  margin: 2vw;
  height: 100%;
  overflow: auto;
`;

const Editor = () => {
  const {
    expanderUserData,
    getExpander,
    setExpanderItem,
    clearExpander
  } = useContext(ExpanderContext);

  const { user } = useContext(AuthContext);

  const { rightSidebareOpen } = useContext(NavContext);

  const [toggleState, setToggleState] = useToggle(false);

  useEffect(() => {
    clearExpander();
    getExpander();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  window.scroll({
    top: 0,
    left: 0,
    behavior: "instant"
  });

  return (
    <LungenembolieState>
      <MainFlex>
        {toggleState ? (
          <LeftSidebar
            setExpanderItem={setExpanderItem}
            setToggleState={setToggleState}
          />
        ) : (
          <LeftSidebarButton setToggleState={setToggleState} />
        )}
        <EditorWrapper>
          <Draft expanderUserData={expanderUserData} />
        </EditorWrapper>
        {rightSidebareOpen ? <RightSidebar /> : <RightSidebarButton />}
      </MainFlex>
    </LungenembolieState>
  );
};

export default Editor;
