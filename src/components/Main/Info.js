const Info = (props) => {
  const info = props.info;
  return (
    <div>
      <p>Id: {info._id}</p>
      <p>Imie: {info.firstName}</p>
      <p>Nazwisko: {info.lastName}</p>
      <p>Email: {info.email}</p>
    </div>
  );
};
export default Info;
