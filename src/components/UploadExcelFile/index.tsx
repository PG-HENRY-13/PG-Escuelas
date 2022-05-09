import React from "react";
import { useDispatch } from "react-redux";
// import { saveUsersFromExcelFile } from "../../redux/actions";
import { useState, useEffect } from "react";

export default function UploadExcelFile(): JSX.Element {
  const dispatch = useDispatch();
  const [file, setFile] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.value);
  };

  // function submit(e: React.SyntheticEvent) {
  //   e.preventDefault();
  //   dispatch(saveUsersFromExcelFile() as any);
  // }

  return (
    <div className="container">
      <div>
        <h1>Cargar archivo de Excel</h1>
      </div>
      <form
      // onSubmit={submit}
      >
        <div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Subir Archivo:</label>
            <input
              type="file"
              className="form-control"
              name="name"
              value={file}
              onChange={changeHandler}
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
}
