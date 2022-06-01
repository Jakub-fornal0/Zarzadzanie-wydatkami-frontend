import { FiX } from "react-icons/fi";
import axios from "axios";
import { useState } from "react";
import styles from "./styles.module.css";

const Expense = (props) => {
  const expense = props.expense;
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [idToDelete, setIdToDelete] = useState({ id: "" });

  const handleGetId = () => {
    setIdToDelete({ ...idToDelete, id: expense._id });
  };

  const handleDeleteExpense = async (e) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const headers = {
          "Content-Type": "application/json",
          "x-access-token": token,
        };
        const url = "http://localhost:8080/api/info/deleteexpense";
        const { message: res } = await axios.post(url, idToDelete, {
          headers: headers,
        });
        setMessage(res.message);
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
    }
  };

  return (
    <tr className={styles.table_tr}>
      <td>{expense.name}</td>
      <td>{expense.expense}</td>
      <td>{expense.date}</td>
      <td>{expense.category}</td>
      <td>
        <FiX
          className={styles.expenses_delete_button}
          onClick={handleDeleteExpense}
          onMouseEnter={handleGetId}
        ></FiX>
      </td>
    </tr>
  );
};
export default Expense;
