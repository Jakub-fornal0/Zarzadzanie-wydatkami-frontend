import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import DisplayExpenses from "./DisplayExpenses";
import Summary from "./Summary";

const Expenses = (props) => {
  const [error, setError] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [expensesFromDate, setExpensesFromDate] = useState([]);
  const [searchDate, setSearchDate] = useState({
    start_date: "",
    end_date: "",
    category: "Wszystkie",
  });
  const [display, setDisplay] = useState(false);
  const money = props.money;

  const handleChange = ({ currentTarget: input }) => {
    setSearchDate({ ...searchDate, [input.name]: input.value });
  };

  const handleGetReset = (e) => {
    e.preventDefault();
    if (display === true) {
      setDisplay(false);
      setSearchDate({
        ...searchDate,
        start_date: "",
        end_date: "",
        category: "Wszystkie",
      });
    }
  };

  const handleChangeExpenses = (e) => {
    e.preventDefault();
    if (display === false) {
      setDisplay(true);
    }

    const fromDate = expenses.filter((expense) => {
      var mainDate = new Date(expense.date);
      var startDate = new Date(searchDate.start_date);
      var endDate = new Date(searchDate.end_date);
      if (searchDate.category === "Wszystkie")
        return mainDate >= startDate && mainDate <= endDate;
      return (
        mainDate >= startDate &&
        mainDate <= endDate &&
        expense.category === searchDate.category
      );
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
          {display === false ? (
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
      <div className={styles.stats}>
        <div>
          <div className={styles.display_stats_container}>
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
              <select
                className={styles.input_select}
                value={searchDate.category}
                name="category"
                onChange={handleChange}
              >
                <option value="Wszystkie">Wszystkie</option>
                <option value="Żywność">Żywność</option>
                <option value="Rozrywka">Rozrywka</option>
                <option value="Rachunki">Rachunki</option>
                <option value="Odzież">Odzież</option>
              </select>
              <button type="submit" className={styles.check_btn}>
                Wyświetl
              </button>
              <button className={styles.reset_btn} onClick={handleGetReset}>
                Reset
              </button>
            </form>
          </div>
        </div>
        <div>{display === false ? <p></p> : <Summary></Summary>}</div>
      </div>
    </div>
  );
};

export default Expenses;
