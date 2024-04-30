import { Table } from "react-bootstrap";

interface UserTableProps {
    users: any[],
    page: number,
    size: number
}

const UserTable = (props: UserTableProps) => {
    const {users, page, size} = props;
    return (
        <div style={{ overflowX: 'auto' }}>
          <Table bordered style={{ minWidth: '800px', tableLayout: 'fixed' }}>
            <thead className='thead'>
              <tr style={{ backgroundColor: 'lightblue' }}>
                <th scope="col" style={{ width: '10%' }}>#</th>
                <th scope="col" style={{ width: '30%' }}>First</th>
                <th scope="col" style={{ width: '30%' }}>Last</th>
                <th scope="col" style={{ width: '30%' }}>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1 + (page - 1) * size}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
}
export default UserTable