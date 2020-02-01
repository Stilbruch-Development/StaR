import React from "react";
import styled from "styled-components";

const Notefication = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 200px;
  padding: 20px;
  border-radius: 5px;
  background-color: red;
  color: black;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const Message = props => {
  return (
    <Notefication>
      <p>{props.message}</p>

      <button onClick={props.closeNotification}>Close</button>
      {props.downloaded && <button onClick={props.restartApp}>Restart</button>}
    </Notefication>
  );
};

export default Message;
