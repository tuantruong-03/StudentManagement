import { useEffect, useState, useRef } from "react";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";
import useApi from "../../../hooks/Api";
import CreateCourseModal from "../../modal/CreateCourseModal";
import { Table } from "react-bootstrap";
import DeleteCourseModal from "../../modal/DeleteCourseModal";
import { COURSES_PER_PAGE } from "../../../constants/Constant";
import UpdateCourseModal from "../../modal/UpdateCourseModal";

// This is for "AdminStudent", "AdminTeacher"



interface CourseTableProps {
  courses: any[],
  page: number,
  size: number
}

const CourseTable = (props: CourseTableProps) => {
  const { courses, page, size } = props;

  // For modal
  const [showDeleteCourseModal, setShowDeleteCourseModal] = useState<boolean>(false)
  const [showUpdateCourseModal, setShowUpdateCourseModal] = useState<boolean>(false)
  const [deleteCourse, setDeleteCourse] = useState(null);
  const [updateCourse, setUpdateCourse] = useState(null);

  const handleDeleteButton = (course: any) => {
    setShowDeleteCourseModal(true);
    setDeleteCourse(course);
  }
  const handleUpdateButton = (course: any) => {
    setShowUpdateCourseModal(true);
    setUpdateCourse(course);
  }

  return (
    <div style={{ overflowX: 'auto', textAlign:'center' }}>
      <Table bordered style={{ minWidth: '800px', tableLayout: 'fixed' }}>
        <thead className='thead'>
          <tr >
            <th scope="col" className="table-header-bg text-white" style={{ width: '10%' }}>#</th>
            <th scope="col" className="table-header-bg text-white" style={{ width: '30%' }}>Name</th>
            <th scope="col" className="table-header-bg text-white" style={{ width: '30%' }}>Current number</th>
            <th scope="col" className="table-header-bg text-white" style={{ width: '30%' }}>Max number</th>
            <th scope="col" className="table-header-bg text-white" style={{ width: '30%' }}>Handle</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <th scope="row">{index + 1 + (page - 1) * size}</th>
              <td>{course.name}</td>
              <td>{course.currentNumberOfStudent}</td>
              <td>{course.maxNumberOfStudent}</td>
              <td>
                <button type="button" onClick={() => handleUpdateButton(course)} className="me-1 btn app-btn-primary" title="Update"><FontAwesomeIcon icon={faPen} /></button>
                <button type="button" onClick={() => handleDeleteButton(course)} className="btn app-btn-primary" title="Delete"><FontAwesomeIcon icon={faTrash} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <DeleteCourseModal show={showDeleteCourseModal} onClose={() => setShowDeleteCourseModal(false)} course={deleteCourse} />
      <UpdateCourseModal show={showUpdateCourseModal} onClose={() => setShowUpdateCourseModal(false)} course={updateCourse} />
    </div>
  );
}



interface CoursePaginationProps {
  totalPage: number,
  courseByPageApi: string
}
const CoursePagination = (props: CoursePaginationProps) => {
  const api = useApi();   // Create useApi() hook to include 'Authorization'
  const { totalPage, courseByPageApi } = props
  const pageRefs = useRef<HTMLButtonElement[]>([]);
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = useState<any[]>([]);
  const pageInit = parseInt(searchParams.get('page') || '1'); // !null or '1'
  const [page, setPage] = useState<number>(pageInit);
  const size = COURSES_PER_PAGE;

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
      const response = await api.get(courseByPageApi + `?page=${page}`)
      const data = await response.data;
      setData(data)
    } catch (err) {
      throw err
    }

    // console.log(data)
  }
  // Fetch Courses by page courseByPageApi + `?page=${page}`
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
  const [showCreateCourseModal, setShowCreateCourseModal] = useState<boolean>(false)
  return <>
    <button type="button" title="Create" onClick={() => setShowCreateCourseModal(true)} className="me-1 my-2 btn app-btn-primary">
      <FontAwesomeIcon icon={faPlus} />
    </button>
    <CourseTable courses={data} size={size} page={page} />
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
    <CreateCourseModal show={showCreateCourseModal} onClose={() => setShowCreateCourseModal(false)} />
  </>
}

export default CoursePagination;