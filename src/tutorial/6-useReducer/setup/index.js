import React, { useState, useReducer } from "react";
import Modal from "./Modal";
import { data } from "../../../data";
import { reducer } from "./reducer";

const defaultState = {
  people: [],
  isModalOpen: false,
  modalContent: "",
};

const Index = () => {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const person = { id: new Date().getTime().toString(), name: name };
      dispatch({ type: "ADD_ITEM", payload: person });
      setName("");
    } else {
      dispatch({ type: "NO_VALUE" });
    }
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <>
      {state.isModalOpen && (
        <Modal closeModal={closeModal} modalContent={state.modalContent} />
      )}
      <form onSubmit={handleSubmit} className="form">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit">add person</button>
      </form>
      {state.people.length > 0 &&
        state.people.map((person) => {
          return (
            <div className="item" key={person.id}>
              <h3>{person.name}</h3>
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_ITEM", payload: person.id })
                }
              >
                Remove
              </button>
            </div>
          );
        })}
    </>
  );
};

export default Index;
