import styles from "./InputField.module.css";

export default function InputField({ label, name, register, error, ...rest }) {
  return (<>
    <div className={styles.formField}>
      <input {...register(name)} {...rest} />
      <label>{label}</label>
    </div>
      
      {error && <p>{error.message}</p>}
      </>
  );
}
