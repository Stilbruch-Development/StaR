// import React, { useContext } from "react";
// import AlertContext from "../context/alert/alertContext";
// import styled from "styled-components";
// import Button from "@material-ui/core/Button";
// import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
// import { makeStyles } from "@material-ui/core/styles";

// const AlertWrapper = styled.div`
//   position: fixed;
//   bottom: 20px;
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
// `;

// const Notefication = styled.div`
//   width: 85vw;
//   padding: 10px;
//   border-radius: 5px;
//   background-color: rgba(255, 184, 191, 0.6);
//   color: black;
//   font-size: 2rem;
//   font-weight: bold;
//   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
// `;

// const useStyles = makeStyles(theme => ({
//   button: {
//     width: "40%",
//     fontSize: "1.5rem"
//   }
// }));

// const ButtonWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-evenly;
//   align-items: center;
// `;

// const Alert = () => {
//   const classes = useStyles();

//   const { message, button, onClickButton, removeAlert } = useContext(
//     AlertContext
//   );

//   return (
//     <AlertWrapper>
//       {message !== "" && (
//         <Notefication>
//           <p>{message}</p>
//           <CancelOutlinedIcon onClick={removeAlert} />
//           <ButtonWrapper>
//             {button !== "" && (
//               <Button
//                 variant="contained"
//                 fullWidth
//                 onClick={onClickButton}
//                 color="primary"
//                 className={classes.button}
//               >
//                 {button}
//               </Button>
//             )}
//           </ButtonWrapper>
//         </Notefication>
//       )}
//     </AlertWrapper>
//   );
// };

// export default Alert;
