import { useContext, useState } from "react";
import { ContactContext } from "../Context/ContactContext";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import styles from "./ContactPage.module.css";

export default function ContactPage() {
  const { addContact } = useContext(ContactContext);
  const [showForm, setShowForm] = useState(false);

  const handleAddContact = async (data) => {
    try {
      await addContact(data);
      alert("مخاطب اضافه شد");
      setShowForm(false);
    } catch (error) {
      alert("خطا در افزودن مخاطب");
    }
  };

  return (
    <>
      <div className={showForm ? styles.blur : ""}>
        <ContactList />
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className={styles.submitButton}
          >
            +
          </button>
        )}
      </div>

      {showForm && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setShowForm(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <ContactForm
              onSubmit={handleAddContact}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
