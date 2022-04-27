import React from "react";
import { connect } from "react-redux";
import { deleteUsers, fetchUsers } from "../redux/actions";
import { StoreState, User } from "../redux/interfaces";

interface AppProps {
  users: User[];
  fetchUsers(): any;
  deleteUsers(userCUIL: number): any;
}

function App(props: AppProps): JSX.Element {
  return (
    <div>
      <button onClick={props.fetchUsers}>FETCH USERS!</button>
      {props.users.map((user: User) => {
        return (
          <div key={user.cuil}>
            {user.cuil}) {user.name}
            <button onClick={() => props.deleteUsers(parseInt(user.cuil))}>
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state: StoreState): { users: User[] } => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps, { fetchUsers, deleteUsers })(App);
