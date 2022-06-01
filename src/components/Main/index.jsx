import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Money from "./Money";
import AddExpense from "./AddExpense";
import Expenses from "./Expenses";

const Main = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
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
          setUser(res.data);
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
    <div className={styles.main_container}>
      <div>
        <nav className={styles.navbar}>
          <h1>Zarządzanie wydatkami</h1>
          <p>
            Jesteś zalogowany jako: {user.firstName} {user.lastName}
          </p>
          <button className={styles.logout_btn} onClick={handleLogout}>
            Wyloguj się
          </button>
        </nav>
        <div className={styles.main}>
          <div className={styles.money_and_add_expenses}>
            <Money money={user.money}></Money>
            <AddExpense money={user.money}></AddExpense>
          </div>
          <div className={styles.display_expenses}>
            <Expenses></Expenses>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
