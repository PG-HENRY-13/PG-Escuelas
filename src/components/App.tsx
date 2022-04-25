import React from 'react';
import { connect } from 'react-redux';
import { deleteUsers, fetchUsers } from '../redux/actions';
import { StoreState, User } from '../redux/interfaces';


interface AppProps {
    users: User[];
    fetchUsers(): any;
    deleteUsers(userID: number): any;
}

function App(props: AppProps): JSX.Element {


    return (
        <div>
            <button onClick={props.fetchUsers}>FETCH USERS!</button>
            {props.users.map((user: User) => {
                return (
                    <div key={user.id}>
                        {user.id}) {user.name}
                        <button onClick={() => props.deleteUsers(user.id)}>X</button>
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
