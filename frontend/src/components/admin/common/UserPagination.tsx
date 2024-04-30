import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import UserTable from "./UserTable";

interface UserPaginationProps  {
    totalPage: number,
    usersByPageApi: string
}


const UserPagination = (props: UserPaginationProps) => {
    const {totalPage, usersByPageApi } = props 
    const pageRefs = useRef<HTMLButtonElement[]>([]);
    const [searchParams, setSearchParams] = useSearchParams()
    const [data, setData] = useState<any[]>([]);
    const pageInit = parseInt(searchParams.get('page') || '1'); // !null or '1'
    const [page, setPage] = useState<number>(pageInit);
    const size = 5;
    // Fetch users by page
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(usersByPageApi + `?page=${page}`);
            const data = await response.json();
            setData(data)
            // console.log(data)
        }
        fetchData()
        if (pageRefs.current[page]) {
          pageRefs.current[page].focus()
        }

    }, [page])


    const handlePage = (event: any) => {
        const page = event.target.textContent;
        setPage(page)
        setSearchParams({'page': page});
    }
    const handlePreviousPage = (event: any) => {
      const previousPage: number = page <= 1 ? totalPage : page-1;
      setPage(previousPage)
      setSearchParams({'page' : previousPage.toString()});
    }

    const handleNextPage = (event: any) => {
      const nextPage: number = page >= totalPage ? 0 : page+1;
      setPage(nextPage)
      setSearchParams({'page' : nextPage.toString()});
    }

    return <>
        <UserTable users={data} size={size} page={page}/>
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item"><button className="page-link" onClick={handlePreviousPage}>Previous</button></li>
                {/* Generate page */}
                {Array.from({ length: totalPage }, (_, index) => (
                    <li key={index} className="page-item">
                        <button ref={el => pageRefs.current[index+1]= el as HTMLButtonElement} onClick={handlePage} className="page-link">{index + 1}</button>
                    </li>
                ))}
                {/*  */}
                <li className="page-item"><button className="page-link" onClick={handleNextPage}>Next</button></li>
            </ul>
        </nav>
    </>
}

export default UserPagination;