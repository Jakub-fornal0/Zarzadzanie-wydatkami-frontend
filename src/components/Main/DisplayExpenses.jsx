import styles from "./styles.module.css";
import Expense from "./Expense";

const DisplayExpenses = (props) => {
  const expenses = props.expenses;
  const money = props.money;

  const sorted_expenses = expenses.sort((a, b) => {
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    return dateB > dateA ? 1 : -1;
  });

  return (
    <div className={styles.display_expenses_table}>
      <table>
        <thead>
          <tr className={styles.main_tr}>
            <th>Nazwa</th>
            <th>Koszt</th>
            <th>Data</th>
            <th>Kategoria</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sorted_expenses.map((expense) => (
            <Expense
              key={expense._id}
              value={expense._id}
              expense={expense}
              money={money}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayExpenses;
