import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const AddExpense = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    name: "",
    expense: "",
    date: "",
    category: "Żywność",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleAddExpense = async (e) => {
    setData({
      name: "",
      expense: "",
      date: "",
      category: "Żywność",
    });

    e.preventDefault();
    console.log("dane w funkcji");
    console.log(data);
    try {
      const url = "http://localhost:8080/api/info/addExpense";
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        "x-access-token": token,
      };
      const { message: res } = await axios.post(url, data, {
        headers: headers,
      });
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleAddExpense}>
        <div className={styles.expense_main_container}>
          <p className={styles.expense_info}>Dodaj wydatek: </p>
        </div>
        <div className={styles.add_expense_input}>
          <input
            type="text"
            placeholder="Wprowadz nazwę"
            value={data.name}
            name="name"
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="Wprowadz wartość"
            value={data.expense}
            name="expense"
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="date"
            placeholder="Wprowadz datę"
            value={data.date}
            name="date"
            onChange={handleChange}
            required
            className={styles.input}
          />
          <select
            className={styles.input_select}
            value={data.category}
            name="category"
            onChange={handleChange}
          >
            <option value="Żywność">Żywność</option>
            <option value="Rozrywka">Rozrywka</option>
            <option value="Rachunki">Rachunki</option>
            <option value="Odzież">Odzież</option>
          </select>
        </div>
        <div className={styles.add_expense}>
          <button type="submit" className={styles.add_expense_btn}>
            Dodaj
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
