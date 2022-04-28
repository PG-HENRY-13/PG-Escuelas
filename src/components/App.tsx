import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { deleteUsers, fetchUsers } from "../redux/actions";
import { StoreState, User } from "../redux/interfaces";

// interface AppProps {
//   users: User[];
//   fetchUsers(): any;
//   deleteUsers(userCUIL: number): any;
// }

export default function App(): JSX.Element {
  const dispatch = useDispatch();
  const loadedUsers = useSelector((state: any) => {
    return state.usersState.users;
  });

  //el any es temporal
  return (
    <div>
      <button onClick={(e) => dispatch(fetchUsers() as any)}>
        FETCH USERS!
      </button>
      {loadedUsers.map((user: User) => {
        return (
          <div key={user.cuil}>
            {user.cuil}) {user.name}
            {/* <button onClick={() => props.deleteUsers(parseInt(user.cuil))}>
              X
            </button> */}
          </div>
        );
      })}
    </div>
  );
}

// const mapStateToProps = (state: StoreState): { users: User[] } => {
//   return {
//     users: state.users,
//   };
// };

// export default connect(mapStateToProps, { fetchUsers, deleteUsers })(App);
