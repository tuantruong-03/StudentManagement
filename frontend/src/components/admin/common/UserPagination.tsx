import { useEffect, useRef, useState } from "react";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";
import useApi from "../../../hooks/Api";
import CreateUserModal from "../../modal/CreateUserModal";
import { Table } from "react-bootstrap";
import DeleteUserModal from "../../modal/DeleteUserModal";
import UpdateUserModal from "../../modal/UpdateUserModal";
import { USERS_PER_PAGE } from "../../../constants/Constant";

// This is for "AdminStudent", "AdminTeacher"



interface UserTableProps {
  users: any[],
  page: number,
  size: number
}

const UserTable = (props: UserTableProps) => {
  const { users, page, size } = props;

  // For modal
  const [showUpdateUserModal, setShowUpdateUserModal] = useState<boolean>(false)
  const [showDeleteUserModal, setShowDeleteUserModal] = useState<boolean>(false)
  const [deleteUser, setDeleteUser] = useState(null);
  const [updateUser, setUpdateUser] = useState(null);

  const handleDeleteButton = (user: any) => {
    setShowDeleteUserModal(true);
    setDeleteUser(user);
  }

  const handleUpdateButton = (user: any) => {
    setShowUpdateUserModal(true);
    setUpdateUser(user);
  }

  return (
    <div style={{ overflowX: 'auto', textAlign: 'center' }}>
      <Table bordered style={{ minWidth: '800px', tableLayout: 'fixed' }}>
        <thead className='thead'>
          <tr>
            <th scope="col" className="table-header-bg text-white" style={{ width: '10%' }}>#</th>
            <th scope="col" className="table-header-bg text-white" style={{ width: '30%' }}>First Name</th>
            <th scope="col" className="table-header-bg text-white" style={{ width: '30%' }}>Last Name</th>
            <th scope="col" className="table-header-bg text-white" style={{ width: '30%' }}>Email</th>
            <th scope="col" className="table-header-bg text-white" style={{ width: '30%' }}>Handle</th>
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
                <button type="button" onClick={() => handleUpdateButton(user)} className="me-1 btn app-btn-primary" title="Update"><FontAwesomeIcon icon={faPen} /></button>
                <button type="button" onClick={() => handleDeleteButton(user)} className="btn app-btn-primary" title="Delete"><FontAwesomeIcon icon={faTrash} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <DeleteUserModal show={showDeleteUserModal} onClose={() => setShowDeleteUserModal(false)} user={deleteUser} />
      <UpdateUserModal show={showUpdateUserModal} onClose={() => setShowUpdateUserModal(false)} user={updateUser} />
    </div>
  );
}



interface UserPaginationProps {
  totalPage: number,
  usersByPageApi: string
}
const UserPagination = (props: UserPaginationProps) => {
  const api = useApi();   // Create useApi() hook to include 'Authorization'
  const { totalPage, usersByPageApi } = props
  const pageRefs = useRef<HTMLButtonElement[]>([]);
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = useState<any[]>([]);
  const pageInit = parseInt(searchParams.get('page') || '1'); // !null or '1'
  const [page, setPage] = useState<number>(pageInit);
  const size = USERS_PER_PAGE;

  // Ensure the page state is always an integer when set
  useEffect(() => {
    const handleSearchParamChange = () => {
      const newPage = parseInt(searchParams.get('page') || '1', 10);
      setPage(newPage);
    };
    handleSearchParamChange();
  }, [searchParams]);

  async function fetchData() {
    try {
      const response = await api.get(usersByPageApi + `?page=${page}`)
      const data = await response.data;
      setData(data)
    } catch (err) {
      throw err
    }

    // console.log(data)
  }
  // Fetch users by page usersByPageApi + `?page=${page}`
  useEffect(() => {

    fetchData()
  }, [page])


  const handlePage = (event: any) => {
    const page = event.target.textContent;
    setSearchParams({ 'page': page });
  }
  const handlePreviousPage = (event: any) => {
    const previousPage: number = page <= 1 ? totalPage : page - 1;
    setSearchParams({ 'page': previousPage.toString() });

  }

  const handleNextPage = (event: any) => {
    const nextPage: number = page >= totalPage ? 1 : page + 1;
    setSearchParams({ 'page': nextPage.toString() });
  }


  // For modal
  const [showCreateUserModal, setShowCreateUserModal] = useState<boolean>(false)
  return <>
    <button type="button" title="Create" onClick={() => setShowCreateUserModal(true)} className="me-1 my-2 btn app-btn-primary">
      <FontAwesomeIcon icon={faPlus} />
    </button>
    <UserTable users={data} size={size} page={page} />
    {totalPage != 1 && (  // Show pagination when totalPage > 1
      <nav aria-label="Page navigation example" >
        <ul className="pagination justify-content-center">
          <li className="page-item"><button className="page-link app-text-primary" onClick={handlePreviousPage}>Previous</button></li>
          {/* Generate page */}
          {Array.from({ length: totalPage }, (_, index) => (
            <li key={index} className="page-item">
              <button ref={el => pageRefs.current[index + 1] = el as HTMLButtonElement}
                onClick={handlePage} className={`page-link app-text-primary ${page == index + 1 ? 'app-active text-white' : ''}`}>{index + 1}</button>
            </li>
          ))}
          {/*  */}
          <li className="page-item"><button className="page-link app-text-primary" onClick={handleNextPage}>Next</button></li>
        </ul>
      </nav>
    )}
    <CreateUserModal show={showCreateUserModal} onClose={() => setShowCreateUserModal(false)} />
  </>
}

export default UserPagination;