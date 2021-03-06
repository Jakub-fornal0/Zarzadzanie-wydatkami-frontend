import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import DisplayExpenses from "./DisplayExpenses";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

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
    console.log(expensesFromDate);
  };

  const handleUpdateExpenses = () => {
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
          //wys??anie ????dania o dane:
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
      <Container>
        <Row xl={2} lg={2} md={1} sm={1} xs={1}>
          <Col xl={8} lg={8} md={12} sm={12} xs={12}>
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
          </Col>
          <Col xl={4} lg={4} md={12} sm={12} xs={12}>
            <div className={styles.stats}>
              <div className={styles.display_stats_container}>
                <form onSubmit={handleChangeExpenses}>
                  <div className={styles.center}>
                    <p className={styles.select_stat}>
                      Wy??wietl dane z wybranego zakresu:
                    </p>
                  </div>
                  <div>
                    <p className={styles.center}>Data pocz??tkowa</p>
                    <input
                      type="date"
                      placeholder="Wprowadz dat??"
                      value={searchDate.start_date}
                      name="start_date"
                      onChange={handleChange}
                      required
                      className={styles.input_date_stats}
                    />
                  </div>
                  <div>
                    <p className={styles.center}>Data ko??cowa</p>
                    <input
                      type="date"
                      placeholder="Wprowadz dat??"
                      value={searchDate.end_date}
                      name="end_date"
                      onChange={handleChange}
                      required
                      className={styles.input_date_stats}
                    />
                  </div>
                  <div>
                    <p className={styles.center}>Kategoria</p>
                    <select
                      className={styles.input_select_stats}
                      value={searchDate.category}
                      name="category"
                      onChange={handleChange}
                    >
                      <option value="Wszystkie">Wszystkie</option>
                      <option value="??ywno????">??ywno????</option>
                      <option value="Rozrywka">Rozrywka</option>
                      <option value="Rachunki">Rachunki</option>
                      <option value="Odzie??">Odzie??</option>
                    </select>
                  </div>
                  <div className={styles.center}>
                    <button
                      type="submit"
                      className={styles.check_btn}
                      onMouseEnter={handleUpdateExpenses}
                    >
                      Wy??wietl
                    </button>
                    <button
                      className={styles.reset_btn}
                      onClick={handleGetReset}
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Expenses;
