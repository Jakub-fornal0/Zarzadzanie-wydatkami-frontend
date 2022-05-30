import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import DisplayExpenses from "./DisplayExpenses";

const Expenses = () => {
  const [error, setError] = useState("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const config = {
            method: "get",
            url: "http://localhost:8080/api/info/expenses",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          };
          //wysłanie żądania o dane:
          const { data: res } = await axios(config);
          setExpenses(res.data);
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
    fetchExpenses();
  });

  return (
    <div className="expenses">
      <div className={styles.display_expenses_main_container}>
        <p className={styles.display_expenses_info}> Twoje wydatki: </p>
      </div>
      <div className={styles.display_expense}>
        <DisplayExpenses expenses={expenses}></DisplayExpenses>
      </div>
    </div>
  );
};

export default Expenses;
