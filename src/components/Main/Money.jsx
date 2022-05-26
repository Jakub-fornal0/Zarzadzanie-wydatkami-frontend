import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const Money = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [addMoney, setAddMoney] = useState("");
  const [haveMoney, setHaveMoney] = useState("");
  const [setMoney, setSetMoney] = useState({
    money: "",
  });

  const handleUpdateMoney = async (e) => {
    e.preventDefault();
    setHaveMoney(haveMoney + addMoney);
    try {
      const url = "http://localhost:8080/api/info/updateMoney";
      const { message: res } = await axios.post(url, haveMoney);
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

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const config = {
            method: "get",
            url: "http://localhost:8080/api/info/name",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          };
          //wysłanie żądania o dane:
          const { data: res } = await axios(config);
          setData(res.data);
          setHaveMoney(data.money);
        } catch (error) {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            setError(error.response.data.message);
            localStorage.removeItem("token");
            window.location.reload();
          }
        }
      }
    };
    fetchData();
  });

  return (
    <div>
      <div className={styles.money_main_container}>
        <p className={styles.money_info}>Dostępne środki: </p>
        <p className={styles.amount}>{haveMoney}</p>
        <p className={styles.money_info}>zł </p>
      </div>
      <div className={styles.add_money}>
        <input
          type="number"
          step="0.01"
          placeholder="Wprowadz ilość"
          name="money"
          onChange={(e) => setAddMoney(e.target.value)}
          value={addMoney}
          required
          className={styles.input}
        />
        <button className={styles.add_btn} onClick={handleUpdateMoney}>
          Dodaj
        </button>
      </div>
    </div>
  );
};

export default Money;
