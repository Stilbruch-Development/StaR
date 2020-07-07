import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MaterialTable from "material-table";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import ArrowUpward from "@material-ui/icons/ArrowUpward";

const MainStyleWrapper = styled.div`
  width: 80%;
  z-index: 0;
`;

export default function UserTable(props) {
  const userArray = props.changeUserState.userArray.map((element) => {
    return element.doc;
  });

  const [state, setState] = useState({
    columns: [
      { title: "Vorname", field: "first_name" },
      { title: "Nachname", field: "last_name" },
      { title: "Email", field: "email" },
      { title: "Rolle", field: "role" },
      { title: "ID", field: "_id" },
    ],
    data: userArray || null,
  });

  useEffect(() => {
    const userArray = props.changeUserState.userArray.map((element) => {
      return element.doc;
    });
    setState((prevState) => ({ ...prevState, data: userArray }));
  }, [props.changeUserState.userArray]);

  const handleItemClick = (event, rowData) => {
    props.changeUserSetState({
      ...props.changeUserState,
      selectedUser: rowData,
    });
    const index = rowData.tableData.id;
    const clickedElement = document.querySelector(
      `.MuiTableRow-root.MuiTableRow-hover[index="${index}"]`
    );
    const otherElements = document.querySelectorAll(
      `.MuiTableRow-root.MuiTableRow-hover:not([index="${index}"])`
    );
    otherElements.forEach((element) => {
      element.style.backgroundColor = "inherit";
    });
    clickedElement.style.backgroundColor === "rgba(244, 255, 184, 0.8)"
      ? (clickedElement.style.backgroundColor = "inherit")
      : (clickedElement.style.backgroundColor = "rgba(244, 255, 184, 0.8)");
  };

  return (
    <MainStyleWrapper>
      <MaterialTable
        columns={state.columns}
        data={state.data}
        editable={{}}
        onRowClick={(event, rowData) => {
          handleItemClick(event, rowData);
        }}
        icons={{
          Search: Search,
          Clear: Clear,
          SortArrow: ArrowUpward,
          ResetSearch: Clear,
        }}
        localization={{
          body: {
            emptyDataSourceMessage: "Keine Elemente gefunden.",
          },
          toolbar: {
            searchPlaceholder: "Suchen",
            searchTooltip: "Suchen",
          },
          header: {
            actions: "Bearbeiten",
          },
        }}
        options={{
          pageSize: 100,
          paging: false,
          showTitle: false,
        }}
      />
    </MainStyleWrapper>
  );
}
