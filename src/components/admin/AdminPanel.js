import React, { useState } from 'react';
import styled from 'styled-components';
import useToggle from '../../hooks/useToggle';
import Sidebar from './Sidebar';
import SidebarButton from './SidebarButton';
import Register from '../auth/Register';
import ChangeUser from './ChangeUser';
import Tools from './Tools';

const MainFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  height: 120vh;
  width: 100vw;
`;

const AdminPanel = () => {
  const [toggleState, setToggleState] = useToggle(true);
  const [AdminState, setAdminState] = useState({
    register: false,
    tools: false,
    changeUser: false,
    selectedUser: null
  });

  const onRegisterClick = () => {
    setAdminState({
      register: !AdminState.register,
      tools: false,
      changeUser: false
    });
  };

  const onToolsClick = () => {
    setAdminState({
      register: false,
      tools: !AdminState.tools,
      changeUser: false
    });
  };

  const onChangeUserClick = () => {
    setAdminState({
      register: false,
      tools: false,
      changeUser: !AdminState.changeUser
    });
  };
  return (
    <MainFlex>
      {toggleState ? (
        <Sidebar
          setToggleState={setToggleState}
          onRegisterClick={onRegisterClick}
          onToolsClick={onToolsClick}
          onChangeUserClick={onChangeUserClick}
        />
      ) : (
        <SidebarButton setToggleState={setToggleState} />
      )}
      {AdminState.register && <Register setAdminState={setAdminState} />}
      {AdminState.changeUser && (
        <ChangeUser setAdminState={setAdminState} AdminState={AdminState} />
      )}
      {AdminState.tools && <Tools />}
    </MainFlex>
  );
};

export default AdminPanel;
