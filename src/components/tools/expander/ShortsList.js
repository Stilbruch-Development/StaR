import React, { useState, useContext, useEffect } from "react";
import MaterialTable from "material-table";
import Search from "@material-ui/icons/Search";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import AddCircle from "@material-ui/icons/AddCircle";
import Cancel from "@material-ui/icons/Cancel";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ExpanderContext from "../../context/expander/expanderContext";
import { convertToRaw, convertFromRaw } from "draft-js";

export default function ShortsList(props) {
  const {
    expanderUserData,
    addExpanderItem,
    deleteExpander,
    updateExpander,
    selectExpanderItem,
    lockEditor,
    expanderEditorState,
    setExpanderEditor,
    editorLocked,
  } = useContext(ExpanderContext);

  const [state, setState] = useState({
    columns: [
      { title: "Kürzel", field: "short" },
      { title: "Kategorie", field: "category" },
    ],
    data: expanderUserData || null,
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, data: expanderUserData }));
  }, [expanderUserData]);

  const handleItemClick = (event, rowData) => {
    const originalRowData = convertFromRaw({ ...rowData.long, entityMap: {} });
    selectExpanderItem(originalRowData);
  };

  const onAddClick = (editorLocked) => {
    selectExpanderItem(null);
    if (editorLocked === false) {
      setExpanderEditor(null);
    }
    lockEditor(!editorLocked);
  };

  return (
    <MaterialTable
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            if (newData.short || newData.category) {
              setTimeout(() => {
                resolve();
                const rawExpanderContent = convertToRaw(expanderEditorState);
                addExpanderItem(newData, rawExpanderContent);
                lockEditor(true);
              }, 600);
            } else {
              reject(
                setState((prevState) => {
                  return { ...prevState };
                })
              );
            }
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              const rawExpanderContent = convertToRaw(expanderEditorState);
              updateExpander(newData, rawExpanderContent);
              lockEditor(true);
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              deleteExpander(oldData._id);
            }, 600);
          }),
      }}
      onRowClick={(event, rowData) => {
        handleItemClick(event, rowData);
      }}
      icons={{
        Search: Search,
        Edit: (props) => (
          <Edit
            {...props}
            onClick={(event) => {
              const onClickElement =
                event.target.parentNode.parentNode.parentNode.parentNode;
              onClickElement.click();
              return lockEditor(false);
            }}
          />
        ),
        Delete: Delete,
        Add: (props) => (
          <AddCircle
            {...props}
            onClick={() => {
              return onAddClick(editorLocked);
            }}
          />
        ),
        Cancel: Cancel,
        Check: Check,
        Clear: (props) => (
          <Clear
            {...props}
            onClick={() => {
              return lockEditor(true);
            }}
          />
        ),
        SortArrow: ArrowUpward,
        ResetSearch: Clear,
      }}
      localization={{
        body: {
          editTooltip: "Ändern",
          deleteTooltip: "Löschen",
          addTooltip: "Hinzufügen",
          editRow: {
            deleteText: "Element wirklich löschen?",
            cancelTooltip: "Abbrechen",
            saveTooltip: "Speichern",
          },
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
  );
}
