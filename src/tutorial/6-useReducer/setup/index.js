import React, { useState, useReducer } from "react";
import Modal from "./Modal";
import { data } from "../../../data";
// reducer function

const reducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const newPeople = [...state.people, action.payload];
    return {
      ...state,
      people: newPeople,
      isModalOpen: true,
      modalContent: "item added",
    };
  }

  if (action.type === "NO_VALUE") {
    return { ...state, isModalOpen: true, modalContent: "Required field!" };
  }
  throw new Error("no matching action types");
};

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

  return (
    <>
      {state.isModalOpen && <Modal modalContent={state.modalContent} />}
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
            </div>
          );
        })}
    </>
  );
};

export default Index;
