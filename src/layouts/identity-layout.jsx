import { Outlet } from "react-router-dom";
import ChanageLanguage from "../components/chang-Langage";
import ChangeTheme from "../components/chanage-theme.jsx";

const IdentityLayout = () => {
    return (
        <>
            <div className="main d-flex justify-content-center w-100">
                <nav className="navbar shadow-sm justify-content-start gap-3">
                    <ChangeTheme/>
                    <ChanageLanguage/>
                </nav>
                <main className="content d-flex p-0">
                    <div className="container d-flex flex-column">
                        <div className="row h-100">
                            <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                                <div className="d-table-cell align-middle">
                                    <Outlet/>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div >

        </>
    )
}

export default IdentityLayout;