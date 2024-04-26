import { FC } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import { Button } from "react-bootstrap";
import Header from "./Header";
import Sidebar from "./Sidebar";


const AdminLayout = () => {
    const auth = useAuth()
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
               <Sidebar/>

                {/* Main Content Area */}
                <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                    {/* Header */}
                    <Header/>

                    <Outlet/> {/* Placeholder for nested routes */}
                </main>
            </div>
        </div>
    );
}
export default AdminLayout