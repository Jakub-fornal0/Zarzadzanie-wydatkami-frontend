import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import DisplayExpenses from "./DisplayExpenses";

const Expenses = (props) => {
  const [error, setError] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [expensesFromDate, setExpensesFromDate] = useState([]);
  const [searchDate, setSearchDate] = useState({
    start_date: "",
    end_date: "",
  });
  const [display, setDisplay] = useState(false);
  const money = props.money;

  const handleChange = ({ currentTarget: input }) => {
    setSearchDate({ ...searchDate, [input.name]: input.value });
  };

  const handleChangeExpenses = (e) => {
    e.preventDefault();
    setDisplay(!display);
    const fromDate = expenses.filter((expense) => {
      var mainDate = new Date(expense.date);
      var startDate = new Date(searchDate.start_date);
      var endDate = new Date(searchDate.end_date);
      return mainDate >= startDate && mainDate <= endDate;
    });
    setExpensesFromDate(fromDate);
  };

  const handleGetExpenses = () => {
    const fromDate = expenses.filter((expense) => {
      var mainDate = new Date(expense.date);
      var startDate = new Date(searchDate.start_date);
      var endDate = new Date(searchDate.end_date);
      return mainDate >= startDate && mainDate <= endDate;
    });
    setExpensesFromDate(fromDate);
  };

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
    <div className={styles.expenses_main_container}>
      <div className={styles.user_expenses}>
        <div className={styles.display_expenses_main_container}>
          <p className={styles.display_expenses_info}> Twoje wydatki: </p>
        </div>
        <div className={styles.display_expense}>
          {display == false ? (
            <DisplayExpenses
              expenses={expenses}
              money={money}
            ></DisplayExpenses>
          ) : (
            <DisplayExpenses
              expenses={expensesFromDate}
              money={money}
            ></DisplayExpenses>
          )}
        </div>
      </div>
      <div className={styles.user_stats}>
        <div className={styles.display_stats_container}>
          <p className={styles.display_stats_info}> Statystyki: </p>
        </div>
        <div className={styles.white}>
          <form onSubmit={handleChangeExpenses}>
            <p className={styles.select_stat}>
              Wyświetl dane z wybranego zakresu:
            </p>
            Od
            <input
              type="date"
              placeholder="Wprowadz datę"
              value={searchDate.start_date}
              name="start_date"
              onChange={handleChange}
              required
              className={styles.input_date}
            />
            do
            <input
              type="date"
              placeholder="Wprowadz datę"
              value={searchDate.end_date}
              name="end_date"
              onChange={handleChange}
              required
              className={styles.input_date}
            />
            <button
              type="submit"
              className={styles.check_btn}
              onMouseEnter={handleGetExpenses}
            >
              Wyświetl
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
