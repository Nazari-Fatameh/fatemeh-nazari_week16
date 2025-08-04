import { useForm } from "react-hook-form";
import { useEffect } from "react";
import styles from "./EditContactModal.module.css";
import { toast } from "react-hot-toast";
import InputField from "../common/InputField"; 

function EditContactModal({ isOpen, onClose, onSubmit, initialData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  if (!isOpen) return null;

  const handleFormSubmit = (data) => {
    onSubmit(data);
    toast.success("مخاطب با موفقیت ویرایش شد");
    onClose();
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} 
      >
        <h3>ویرایش مخاطب</h3>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <InputField
            label=":نام و نام خانوادگی"
            name="fullName"
            register={register}
            error={errors.fullName}
          />

          <InputField
            label=":شغل"
            name="jop"
            register={register}
            error={errors.jop}
          />

          <InputField
            label=":شماره تماس"
            name="phoneNumber"
            register={register}
            error={errors.phoneNumber}
          />

          <InputField
            label=":ایمیل"
            name="email"
            type="email"
            register={register}
            error={errors.email}
          />

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
