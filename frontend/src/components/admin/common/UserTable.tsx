import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import { useState } from "react";
import DeleteUserModal from "../../modal/DeleteUserModal";


interface UserTableProps {
  users: any[],
  page: number,
  size: number
}

const UserTable = (props: UserTableProps) => {
  const { users, page, size } = props;

  // For modal
  const [showDeleteUserModal, setShowDeleteUserModal] = useState<boolean>(false)
  const [deleteUser, setDeleteUser ] = useState(null);

  const handleDeleteButton = (user: any) => {
    setShowDeleteUserModal(true);
    setDeleteUser(user);
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <Table bordered style={{ minWidth: '800px', tableLayout: 'fixed' }}>
        <thead className='thead'>
          <tr style={{ backgroundColor: 'lightblue' }}>
            <th scope="col" style={{ width: '10%' }}>#</th>
            <th scope="col" style={{ width: '30%' }}>First</th>
            <th scope="col" style={{ width: '30%' }}>Last</th>
            <th scope="col" style={{ width: '30%' }}>Email</th>
            <th scope="col" style={{ width: '30%' }}>Handle</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <th scope="row">{index + 1 + (page - 1) * size}</th>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <button type="button" className="me-1 btn btn-outline-primary" title="Update"><FontAwesomeIcon  icon={faPen}/></button>
                <button type="button" onClick={() => handleDeleteButton(user)} className="btn btn-outline-primary" title="Delete"><FontAwesomeIcon  icon={faTrash} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <DeleteUserModal show={showDeleteUserModal} onClose={() => setShowDeleteUserModal(false)} user={deleteUser}/>
    </div>
  );
}
export default UserTable