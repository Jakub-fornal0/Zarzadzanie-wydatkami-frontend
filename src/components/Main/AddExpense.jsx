import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { Container, Row, Col } from "react-bootstrap";

const AddExpense = (props) => {
  const money = props.money;
  const [error, setError] = useState("");
  const [data, setData] = useState({
    name: "",
    expense: "",
    date: "",
    category: "Żywność",
    updateMoney: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleUpdateMoneyToAdd = () => {
    setData({
      ...data,
      updateMoney: parseFloat(money) - parseFloat(data.expense),
    });
  };

  const handleAddExpense = async (e) => {
    setData({
      name: "",
      expense: "",
      date: "",
      category: "Żywność",
      updateMoney: "",
    });

    e.preventDefault();
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
        <Container>
          <Row xl={1} lg={1} md={1} sm={2} xs={4}>
            <Col xl={3} lg={3} md={3} sm={6} xs={12} className={styles.center}>
              <input
                type="text"
                placeholder="Wprowadz nazwę"
                value={data.name}
                name="name"
                onChange={handleChange}
                required
                className={styles.input}
              />
            </Col>
            <Col xl={3} lg={3} md={3} sm={6} xs={12} className={styles.center}>
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
            </Col>
            <Col xl={3} lg={3} md={3} sm={6} xs={12} className={styles.center}>
              <input
                type="date"
                placeholder="Wprowadz datę"
                value={data.date}
                name="date"
                onChange={handleChange}
                required
                className={styles.input}
              />
            </Col>
            <Col xl={3} lg={3} md={3} sm={6} xs={12} className={styles.center}>
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
            </Col>
          </Row>
          <Row>
            <Col
              className={styles.center}
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
            >
              <button
                type="submit"
                className={styles.add_expense_btn}
                onMouseEnter={handleUpdateMoneyToAdd}
              >
                Dodaj
              </button>
            </Col>
          </Row>
        </Container>
      </form>
    </div>
  );
};

export default AddExpense;
