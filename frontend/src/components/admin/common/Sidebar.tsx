import { Link } from "react-router-dom"




const Sidebar = () => {
    return (
        <div className="app-bg-primary col-md-3 col-lg-2 d-md-block sidebar collapse" style={{height:'100vh'}}>
                    <div className="list-group">
                        <Link to="" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
                        <Link to="/admin/courses" className="list-group-item list-group-item-action bg-light">Courses</Link>
                        <Link to="/admin/teachers" className="list-group-item list-group-item-action bg-light">Teachers</Link>
                        <Link to="/admin/students" className="list-group-item list-group-item-action bg-light">Students</Link>
                    </div>
        </div>
    )
}

export default Sidebar