import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./ContactForm.module.css";
const schema = yup.object({
  fullName: yup.string().required("نام و نام خانوادگی  الزامی است"),
  jop: yup.string().required("شغل  الزامی است"),
  phoneNumber: yup.string().required("شماره تماس الزامی است"),

  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
});

export default function ContactForm({ onSubmit , onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className={styles.container}>
          <button 
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          ×
        </button>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className={styles.formField}>
          <input {...register("fullName")} />
          <label>:نام و نام خانوادگی</label>

          {errors.fullName && <p>{errors.fullName.message}</p>}
        </div>

        <div className={styles.formField}>
          <input {...register("jop")} />
          <label>:شغل</label>

          {errors.jop && <p>{errors.jop.message}</p>}
        </div>

        <div className={styles.formField}>
          <input {...register("phoneNumber")} />
          <label> :شماره تماس</label>

          {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
        </div>
        <div className={styles.formField}>
          <input {...register("email")} />
          <label> :ایمیل</label>

          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <button type="submit" className={styles.submitButton}>
          {" "}
          +
        </button>
    
      </form>
    </div>
  );
}
