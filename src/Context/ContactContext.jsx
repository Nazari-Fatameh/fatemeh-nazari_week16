import { createContext, useReducer, useEffect } from "react";
import {
  fetchContacts,
  addContact as apiAddContact,
  deleteContact as apiDeleteContact,
  editContact as apiEditContact,
  deleteMultipleContacts as apiDeleteMultipleContacts,
} from "../services/contactServices.js";

const ContactContext = createContext();

const contactReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return action.payload;
    case "ADD_CONTACT":
      return [...state, action.payload];
    case "DELETE_CONTACT":
      return state.filter((c) => c.id !== action.payload);
    case "EDIT_CONTACT":
      return state.map((c) => (c.id === action.payload.id ? action.payload : c));
    case "DELETE_MULTIPLE":
      return state.filter((c) => !action.payload.includes(c.id));
    default:
      return state;
  }
};

const ContactProvider = ({ children }) => {
  const [contacts, dispatch] = useReducer(contactReducer, []);

  useEffect(() => {
    fetchContacts()
      .then((data) => dispatch({ type: "SET_CONTACTS", payload: data }))
      .catch((err) => console.error(err));
  }, []);

  const addContact = async (newContact) => {
    const data = await apiAddContact(newContact);
    dispatch({ type: "ADD_CONTACT", payload: data });
  };

  const deleteContact = async (id) => {
    await apiDeleteContact(id);
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };

  const editContact = async (id, updatedContact) => {
    const data = await apiEditContact(id, updatedContact);
    dispatch({ type: "EDIT_CONTACT", payload: data });
  };

  const deleteMultipleContacts = async (ids) => {
    await apiDeleteMultipleContacts(ids);
    dispatch({ type: "DELETE_MULTIPLE", payload: ids });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        addContact,
        deleteContact,
        editContact,
        deleteMultipleContacts,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export { ContactContext, ContactProvider };
