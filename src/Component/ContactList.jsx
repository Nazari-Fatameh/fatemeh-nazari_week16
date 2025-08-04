import { useState, useContext } from "react";
import { ContactContext } from "../Context/ContactContext";
import SearchBox from "./SearchBox";
import EditContactModal from "./EditContactModal";
import styles from "./ContactList.module.css";
import { toast } from "react-hot-toast";

function ContactList() {
  const { contacts, deleteContact, editContact, deleteMultipleContacts } =
    useContext(ContactContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const handleSearch = (value) => setSearchTerm(value);

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setModalOpen(true);
  };

  const handleUpdate = async (updatedData) => {
    await editContact(editingContact.id, updatedData);
  };

  const filteredContacts = contacts.filter((c) =>
    [c.fullName, c.jop, c.email].some((field) =>
      (field || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <SearchBox onSearch={handleSearch} />
        {selectedIds.length > 0 && (
          <button
            className={styles.bulkDeleteButton}
            onClick={() => {
              if (
                window.confirm(
                  "آیا مطمئن هستید که می‌خواهید مخاطبین انتخاب‌شده را حذف کنید؟"
                )
              ) {
                deleteMultipleContacts(selectedIds);
                toast.success(" مخاطبین با موفقیت حذف شدند");

                setSelectedIds([]);
              }
            }}
          >
            🗑️{" "}
          </button>
        )}
      </div>

      <ul className={styles.list}>
        {filteredContacts.map((contact) => (
          <li key={contact.id} className={styles.listItem}>
            <strong>{contact.fullName}</strong>
            <span>{contact.email}</span>
            <span>{contact.phoneNumber}</span>
            <div className={styles.actions}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selectedIds.includes(contact.id)}
                onChange={() =>
                  setSelectedIds((prev) =>
                    prev.includes(contact.id)
                      ? prev.filter((id) => id !== contact.id)
                      : [...prev, contact.id]
                  )
                }
              />
              <div>
                <button
                  onClick={() => handleEdit(contact)}
                  className={`${styles.button} ${styles.edit}`}
                >
                  ✏️
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("آیا مطمئن هستید؟")) {
                      deleteContact(contact.id);
                      toast.success(" مخاطب با موفقیت حذف شد");
                    }
                  }}
                  className={`${styles.button} ${styles.delete}`}
                >
                  ×
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <EditContactModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleUpdate}
        initialData={editingContact}
      />
    </div>
  );
}

export default ContactList;
