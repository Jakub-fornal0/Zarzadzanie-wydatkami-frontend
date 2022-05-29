import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

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
      <div className={styles.login_form_container}>
        <div className={styles.left}>
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
        </div>
        <div className={styles.right}>
          <h1>Kontroluj swoje wydatki</h1>
          <p>
            Dodaj kiedy i ile wydałeś, wybierz kategorię oraz odpcjonalnie dodaj
            opis. Strona będzie konrolowała twój budżet. Dodatkowo możesz
            sprawdzić statystyki dotyczące danej kategorii lub wydatków w
            wybranym okresie.
          </p>

          <h2>Nie masz konta? Zarejestruj się!</h2>
          <Link to="/signup">
            <button type="button" className={styles.register_btn}>
              Rejestracja
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
