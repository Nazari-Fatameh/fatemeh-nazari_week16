import { useContext, useState } from "react";
import { ContactContext } from "../Context/ContactContext";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import styles from "./ContactPage.module.css";
import { toast } from "react-hot-toast";
import phoneImage from "../photo/1.png";

export default function ContactPage() {
  const { addContact } = useContext(ContactContext);
  const [showForm, setShowForm] = useState(false);

  const handleAddContact = async (data) => {
    try {
      await addContact(data);
      toast.success("مخاطب با موفقیت اضافه شد", { duration: 4000 });
      setShowForm(false);
    } catch (error) {
      toast.error("❌ خطا در افزودن مخاطب");
    }
  };

  return (
    <>
      <div className={showForm ? styles.blur : ""}>
        <div className={styles.container}>
          <div className={styles.imageWrapper}>
            <img
              src={phoneImage}
              alt="تصویر تلفن"
              className={styles.animatedImage}
            />
          </div>

          <div className={styles.contactListWrapper}>
            <ContactList />
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className={styles.submitButton}
              >
                +
                <span className={styles.submitButtonTitel}>
                  اضافه کردن مخاطب جدید
                </span>
              </button>
            )}
          </div>
        </div>
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
