import { createContext, useState, useEffect } from "react";

const ContactContext = createContext();

const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const addContact = async (newContact) => {
    try {
      const res = await fetch("http://127.0.0.1:4000/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact),
      });
      if (!res.ok) throw new Error("خطا در افزودن مخاطب");
      const data = await res.json();
      setContacts((prev) => [...prev, data]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteContact = async (id) => {
    await fetch(`http://127.0.0.1:4000/contacts/${id}`, { method: "DELETE" });
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const editContact = async (id, updatedContact) => {
    const res = await fetch(`http://127.0.0.1:4000/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedContact),
    });
    const data = await res.json();
    setContacts((prev) => prev.map((c) => (c.id === id ? data : c)));
  };

  const deleteMultipleContacts = async (ids) => {
    await Promise.all(
      ids.map((id) =>
        fetch(`http://127.0.0.1:4000/contacts/${id}`, { method: "DELETE" })
      )
    );
    setContacts((prev) => prev.filter((c) => !ids.includes(c.id)));
  };

  useEffect(() => {
    fetch("http://127.0.0.1:4000/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error("خطا در گرفتن مخاطبین:", err));
  }, []);

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
