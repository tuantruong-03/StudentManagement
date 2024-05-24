import { Link } from "react-router-dom"




const Sidebar = () => {
    return (
        <div className="p-2 d-md-block sidebar collapse fixed-sidebar" style={{height:'100vh'}}>
                    <div className="list-group">
                        <Link to="/admin/courses" className="list-group-item list-group-item-action bg-light">Courses</Link>
                        <Link to="/admin/teachers" className="list-group-item list-group-item-action bg-light">Teachers</Link>
                        <Link to="/admin/students" className="list-group-item list-group-item-action bg-light">Students</Link>
                    </div>
        </div>
    )
}

export default Sidebar