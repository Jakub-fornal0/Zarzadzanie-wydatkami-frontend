import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const AddExpense = () => {
  const [error, setError] = useState("");

  return (
    <div>
      <div className={styles.expense_main_container}>
        <p className={styles.expense_info}>Dodaj wydatek: </p>
      </div>
      <div className={styles.add_expense_input}>
        <input
          type="number"
          step="0.01"
          placeholder="Wprowadz nazwę"
          name="money"
          required
          className={styles.input}
        />
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Wprowadz wartość"
          name="money"
          required
          className={styles.input}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Wprowadz datę"
          name="money"
          required
          className={styles.input}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Wybierz kategorię"
          name="money"
          required
          className={styles.input}
        />
      </div>
      <div className={styles.add_expense}>
        <button className={styles.add_expense_btn}>Dodaj</button>
      </div>
    </div>
  );
};

export default AddExpense;
