import { useEffect, useRef, useState } from "react";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";
import UserTable from "./UserTable";
import useApi from "../../../hooks/Api";
import CreateUserModal from "../../modal/CreateUserModal";





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
    const size = 5;

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
        } catch(err) {
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
        <button type="button" title="Create" onClick={() => setShowCreateUserModal(true)} className="me-1 btn btn-outline-primary">
            <FontAwesomeIcon icon={faPlus} />
        </button>
        <UserTable users={data} size={size} page={page} />
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item"><button className="page-link" onClick={handlePreviousPage}>Previous</button></li>
                {/* Generate page */}
                {Array.from({ length: totalPage }, (_, index) => (
                    <li key={index} className="page-item">
                        <button ref={el => pageRefs.current[index + 1] = el as HTMLButtonElement}
                            onClick={handlePage} className={`page-link ${page == index + 1 ? 'active' : ''}`}>{index + 1}</button>
                    </li>
                ))}
                {/*  */}
                <li className="page-item"><button className="page-link" onClick={handleNextPage}>Next</button></li>
            </ul>
        </nav>
        <CreateUserModal show={showCreateUserModal} onClose={() => setShowCreateUserModal(false)} />
    </>
}

export default UserPagination;