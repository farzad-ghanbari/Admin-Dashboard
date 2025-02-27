 import { Outlet, useNavigate } from "react-router-dom"
import SideBar from "./sidebar";
import TopNav from "./top-nav";
import Footer from "./footer";

const MainLayout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    if (!token) {
        navigate('/login');
    }
    return (
        <div className="wrapper" style={{ minHeight: '100h' }}>
            <SideBar />
            <div className="main">
                <TopNav />
                <main className="content">
                    <div className="container-fluid p-0">
                        {<Outlet />}
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default MainLayout;

