import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const Money = (props) => {
  const money = props.money;
  const [error, setError] = useState("");
  const [addMoney, setAddMoney] = useState({ money: "" });

  const handleChange = ({ currentTarget: input }) => {
    setAddMoney({
      ...addMoney,
      [input.name]: input.value,
    });
  };

  const handleUpdateMoney = async (e) => {
    e.preventDefault();
    setAddMoney({ money: "" });
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        "x-access-token": token,
      };
      const url = "http://localhost:8080/api/info/updateMoney";
      const { message: res } = await axios.post(url, addMoney, {
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
      <div className={styles.money_main_container}>
        <p className={styles.money_info}>Dostępne środki: </p>
        <p className={styles.amount}>{money}</p>
        <p className={styles.money_info}>zł </p>
      </div>
      <div className={styles.add_money}>
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Wprowadz nową wartość"
          name="money"
          onChange={handleChange}
          value={addMoney.money}
          required
          className={styles.input}
        />
        <button className={styles.add_money_btn} onClick={handleUpdateMoney}>
          Zmień
        </button>
      </div>
    </div>
  );
};

export default Money;
