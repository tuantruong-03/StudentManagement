import { Link } from "react-router-dom"
import { useAuth } from "../../../hooks/AuthProvider"



const Header = () => {
    const auth = useAuth();

    return (
        <nav className="px-1 navbar navbar-expand-lg">
            <a className="navbar-brand" href="#">Admin</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button className="btn btn-outline-danger" onClick={auth.logout}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header