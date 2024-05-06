import { useEffect, useRef, useState } from "react"
import UserPagination from "./common/UserPagination"
import useApi from "../../hooks/Api"




const AdminStudent = () => {
    const api = useApi();
    const [totalPage, setTotalPage] = useState<number>(0); // Total number of teachers
    const size = 5;
    // Fetch number of users
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get('api/numberOfTeachers');
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
   return (<UserPagination totalPage={totalPage} usersByPageApi={'api/students'}/>)
}

export default AdminStudent