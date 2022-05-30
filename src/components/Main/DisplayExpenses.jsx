import styles from "./styles.module.css";
import Expense from "./Expense";

const DisplayExpenses = (props) => {
  const expenses = props.expenses;
  return (
    <div className={styles.display_expenses_table}>
      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Koszt</th>
            <th>Data</th>
            <th>Kategoria</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <Expense key={expense._id} value={expense._id} expense={expense} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayExpenses;
