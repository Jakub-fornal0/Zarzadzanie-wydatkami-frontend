import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa";

const Main = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");

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
          setUserName(res.data);
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
      <nav className={styles.navbar}>
        <h1>Zarządzanie wydatkami</h1>
        <p>
          Jesteś zalogowany jako: {userName.firstName} {userName.lastName}
        </p>
        <button className={styles.logout_btn} onClick={handleLogout}>
          Wyloguj się
        </button>
      </nav>
    </div>
  );
};
export default Main;
