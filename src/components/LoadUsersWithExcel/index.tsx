import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { saveUsersFromExcelFile } from "../../redux/actions";

export default function LoadUsersWithExcel(): JSX.Element {
  const dispatch = useDispatch();

  function loadData(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(saveUsersFromExcelFile() as any);
  }

  return (
    <div>
      <div className="form-button-container">
        <form onSubmit={loadData}>
          <button className="button" type="submit">
            Cargar Usuarios
          </button>
        </form>
      </div>
    </div>
  );
}
