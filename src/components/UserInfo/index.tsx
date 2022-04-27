import React from 'react';
import { StoreState, User } from '../../redux/interfaces';
import "../../styles/UserInfo.css"
import {fetchUsers} from '../../redux/actions';
import { connect } from 'react-redux';

interface  UserInfoProps {
    users: User[];
    fetchUsers(): any;
}

function UserInfo(props: UserInfoProps): JSX.Element {


    return (
        <div>
            <table>
  <thead>
    <tr>
      <th data-type="numeric">cuil <span className="resize-handle"></span></th>
      <th data-type="text-short">Nombre <span className="resize-handle"></span></th>
      <th data-type="text-short">Apellido <span className="resize-handle"></span></th>
      <th data-type="text-short">phoneNumber <span className="resize-handle"></span></th>
      <th data-type="text-long">Cargo <span className="resize-handle"></span></th>
      <th data-type="text-short">Dirección <span className="resize-handle"></span></th>
      <th data-type="text-long">Correo Electronico <span className="resize-handle"></span></th>
      <th data-type="text-short">Género<span className="resize-handle"></span></th>
    </tr>
  </thead>
  <tbody>
    
    {props.users?.map(e=>{
      return(
      <>
    <tr>
      <td>{e.cuil}</td>
      <td>{e.name}</td>
      <td>{e.lastName}</td>
      <td>{e.phoneNumber}</td>
      <td>{e.role}</td>
      <td>{e.address}</td>
      <td>{e.emailAddress}</td>
      <td>{e.gender}</td>
      
    </tr>
    </>
      )
    })} 
  </tbody>
</table>
        </div>
    );
}

const mapStateToProps = (state: StoreState): { users: User[] } => {
  return {
      users: state.users,
  };
};

export default connect(mapStateToProps, { fetchUsers })(UserInfo);