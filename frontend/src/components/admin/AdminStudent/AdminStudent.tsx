import { useEffect, useRef, useState } from "react"
import UserPagination from "../common/UserPagination"
import useApi from "../../../hooks/Api"
import { USERS_PER_PAGE } from "../../../constants/Constant";




const AdminStudent = () => {
    const api = useApi();
    const [totalPage, setTotalPage] = useState<number>(0); // Total number of students
    const size = USERS_PER_PAGE;
    // Fetch number of users
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get('api/v1/numberOfStudents');
                const data: any = await response.data; // Assuming API returns the total number directly
                const totalPage = Math.ceil(data / size);
                setTotalPage(totalPage);
            } catch (err) {
                console.error('Error fetching data:', err);
                // Optionally handle the error by updating the component state
            }
        }

        fetchData();
    }, []); 
   return (<UserPagination totalPage={totalPage} usersByPageApi={'api/v1/students'}/>)
}

export default AdminStudent