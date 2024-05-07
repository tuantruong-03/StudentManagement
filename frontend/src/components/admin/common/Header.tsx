import { Link } from "react-router-dom"
import { useAuth } from "../../../hooks/AuthProvider"



const Header = () => {
    const auth = useAuth();

    return (
        <nav className="navbar navbar-expand-lg px-0 navbar-grey bg-grey">
            <a className="navbar-brand" href="#">Admin</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Index</Link>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-outline-danger" onClick={auth.logout}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header