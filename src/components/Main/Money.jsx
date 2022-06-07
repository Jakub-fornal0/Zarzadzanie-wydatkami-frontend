import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

const Money = (props) => {
  const money = props.money;
  const [error, setError] = useState("");
  const [addMoney, setAddMoney] = useState({ money: "" });
  const [moneyToAdd, setMoneyToAdd] = useState({ money: "" });

  const handleChange = ({ currentTarget: input }) => {
    setAddMoney({
      ...addMoney,
      [input.name]: input.value,
    });
  };

  const handleUpdateMoneyToAdd = () => {
    setMoneyToAdd({
      ...moneyToAdd,
      money: parseFloat(addMoney.money) + parseFloat(money),
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
      const { message: res } = await axios.post(url, moneyToAdd, {
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
    <form onSubmit={handleUpdateMoney}>
      <Container>
        <div className={styles.money_main_container}>
          <p className={styles.money_info}>Dostępne środki: </p>
          <p className={styles.amount}>{money}</p>
          <p className={styles.money_info}>zł </p>
        </div>
        <Row xl={1} lg={1} md={2} sm={2} xs={2}>
          <Col xl={8} lg={8} md={12} sm={12} xs={12} className={styles.center}>
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
          </Col>
          <Col xl={4} lg={4} md={12} sm={12} xs={12} className={styles.center}>
            <button
              type="submit"
              className={styles.add_money_btn}
              onMouseEnter={handleUpdateMoneyToAdd}
            >
              Dodaj
            </button>
          </Col>
        </Row>
      </Container>
    </form>
  );
};

export default Money;
