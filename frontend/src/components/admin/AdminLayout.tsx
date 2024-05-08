import { FC } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import { Button } from "react-bootstrap";
import Header from "./common/Header";
import Sidebar from "./common/Sidebar";


const AdminLayout = () => {
    const auth = useAuth()
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
               <Sidebar/>

                {/* Main Content Area */}
                <main className="col-md-9 col-lg-10 ">
                    {/* Header */}
                    <Header/>

                    <Outlet/> {/* Placeholder for nested routes */}
                </main>
            </div>
        </div>
    );
}
export default AdminLayout