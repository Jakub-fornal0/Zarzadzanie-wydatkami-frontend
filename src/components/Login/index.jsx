import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data, {
        headers: headers,
      });
      localStorage.setItem("token", res.data);
      window.location = "/";
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
    <div className={styles.login_container}>
      <Container className={styles.login_form_container}>
        <Row xl={1} lg={1} md={2} sm={2} xs={2}>
          <Col className={styles.left} xl={6} lg={6} md={12} sm={12} xs={12}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Zaloguj się</h1>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Hasło"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
              {error && <div className={styles.error_msg}>{error}</div>}
              <button type="submit" className={styles.login_btn}>
                Zaloguj się
              </button>
            </form>
          </Col>
          <Col className={styles.right} xl={6} lg={6} md={12} sm={12} xs={12}>
            <h1>Kontroluj swoje wydatki</h1>
            <p>
              Dodaj kiedy i ile wydałeś, wybierz kategorię oraz opcjonalnie
              dodaj opis. Strona będzie konrolowała twój budżet. Dodatkowo
              możesz sprawdzić statystyki dotyczące danej kategorii lub wydatków
              w wybranym okresie.
            </p>

            <h2>Nie masz konta? Zarejestruj się!</h2>
            <Link to="/signup">
              <button type="button" className={styles.register_btn}>
                Rejestracja
              </button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Login;
