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
import CardsContext from "../../context/cards/cardsContext";

export default function ShortsList(props) {
  const {
    cardsUserData,
    addCardsItem,
    deleteCards,
    updateCards,
    cardsFormState,
    setCardsState,
    getCards,
  } = useContext(CardsContext);

  const [state, setState] = useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Kategorie", field: "category" },
    ],
    data: cardsUserData || null,
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, data: cardsUserData }));
  }, [cardsUserData]);

  const handleItemClick = (event, rowData) => {
    setCardsState("selectedCardsItem", rowData);
  };

  const onAddClick = () => {
    setCardsState("selectedCardsItem", null);
    setCardsState("editingCards", true);
  };

  return (
    <MaterialTable
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            if (newData.name || newData.category) {
              setTimeout(() => {
                resolve();
                addCardsItem(newData, cardsFormState);
                setCardsState("editingCards", false);
                setCardsState("selectedCardsItem", {
                  ...newData,
                  ...cardsFormState,
                });
                getCards();
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
              setCardsState("editingCards", false);
              setCardsState("cardsFormState", null);
              setCardsState("selectedCardsItem", {
                ...newData,
                ...cardsFormState,
              });
              updateCards(newData, cardsFormState);
              getCards();
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              deleteCards(oldData._id);
              setCardsState("selectedCardsItem", null);
              getCards();
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
              setCardsState("editingCards", true);
            }}
          />
        ),
        Delete: Delete,
        Add: (props) => (
          <AddCircle
            {...props}
            onClick={() => {
              return onAddClick();
            }}
          />
        ),
        Cancel: Cancel,
        Check: Check,
        Clear: (props) => (
          <Clear
            {...props}
            onClick={() => {
              setCardsState("cardsFormState", null);
              setCardsState("editingCards", false);
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
