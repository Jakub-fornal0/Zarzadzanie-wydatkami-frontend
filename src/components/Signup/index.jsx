import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
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
    <div className={styles.signup_container}>
      <Container className={styles.signup_form_container}>
        <Row xl={1} lg={1} md={2} sm={2} xs={2}>
          <Col className={styles.left} xl={4} lg={4} md={12} sm={12} xs={12}>
            <h1>Masz już konto?</h1>
            <p>
              Teraz możesz kontrolować swoje wydatki! Zaloguj się używając
              adresu email i hasła podanego przy rejestracji.
            </p>
            <Link to="/login">
              <button type="button" className={styles.login_btn}>
                Logowanie
              </button>
            </Link>
          </Col>
          <Col className={styles.right} xl={8} lg={8} md={12} sm={12} xs={12}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Rejestracja</h1>
              <input
                type="text"
                placeholder="Imię"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                required
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Nazwisko"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                required
                className={styles.input}
              />
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
              <button type="submit" className={styles.register_btn}>
                Zarejestruj się
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Signup;
