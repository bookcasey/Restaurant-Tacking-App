import { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";


function CreateTable({tables, setTables}) {
    const [error, setError] = useState(null);
    const [newTable, setTable] = useState({
        table_name: "",
        capacity: "",
      });

    const history = useHistory();

    const handleChange = (event) => {
        const { target } = event;
        const value = target.value;
        setTable({ ...newTable, [target.name]: value });
      };

      const submitHandler = (event) => {
        event.preventDefault();
        newTable.capacity = Number(newTable.capacity); //to change string to number so that it fits the api criteria
        createTable(newTable).then((updatedTable) =>{
          setTables([...tables, updatedTable])
        })
          .then(() => {
            history.push("/");
          })
          .catch((error) => setError(error));
      };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <input
            name="table_name"
            value={newTable.table_name}
            placeholder="Table Name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            name="capacity"
            value={newTable.capacity}
            placeholder="Capacity"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">submit</button>
      <button onClick={() => history.go(-1)}>cancel</button>
      </form>
      <ErrorAlert error={error} />
    </>
  );
}

export default CreateTable;
