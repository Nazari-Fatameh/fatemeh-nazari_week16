import { useForm } from "react-hook-form";
import { useEffect } from "react";
import styles from "./EditContactModal.module.css";

function EditContactModal({ isOpen, onClose, onSubmit, initialData }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialData,
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  if (!isOpen) return null;

  const handleFormSubmit = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h3>ویرایش مخاطب</h3>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className={styles.formFieldEdit}>
            <label htmlFor="fullName" className={styles.formFieldEditLable}>
              :نام و نام خانوادگی
            </label>
            <input id="fullName" {...register("fullName")} />
          </div>

          <div className={styles.formFieldEdit}>
            <label htmlFor="jop" className={styles.formFieldEditLable}>
              :شغل
            </label>
            <input id="jop" {...register("jop")} placeholder="شغل" />
          </div>

          <div className={styles.formFieldEdit}>
            <label htmlFor="phoneNumber" className={styles.formFieldEditLable}>
              :شماره تماس
            </label>
            <input
              id="phoneNumber"
              {...register("phoneNumber")}
              placeholder="شماره تماس"
            />
          </div>

          <div className={styles.formFieldEdit}>
            <label htmlFor="email" className={styles.formFieldEditLable}>
              :ایمیل
            </label>
            <input id="email" {...register("email")} placeholder="ایمیل" />
          </div>

          <button type="submit" className={styles.submitEditButton}>
            ✔️
          </button>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeEditButton}
          >
            ×
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditContactModal;
