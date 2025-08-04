
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./ContactForm.module.css";
import InputField from "../common/InputField";

const schema = yup.object({
  fullName: yup.string().required("نام و نام خانوادگی الزامی است"),
  jop: yup.string().required("شغل الزامی است"),
  phoneNumber: yup.string().required("شماره تماس الزامی است"),
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
});

export default function ContactForm({ onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

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
      <button type="button" className={styles.cancelButton} onClick={onCancel}>
        ×
      </button>
      <form onSubmit={handleSubmit(onFormSubmit)}>
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
          register={register}
          error={errors.email}
        />

        <button type="submit" className={styles.submitButton}>+</button>
      </form>
    </div>
  );
}
