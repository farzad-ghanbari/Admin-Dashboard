import ChanageLanguage from "../../components/chang-Langage";
import ChangeTheme from "../../components/chanage-theme";
import { useAppContext } from "../../contextes/app-contextes";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
    const{toggleSidebar}=useAppContext();
    const navigate = useNavigate();
    const {language} = useAppContext();
    
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
      }

    return (
        <nav className="navbar">
            <a className="sidebar-toggle" onClick={toggleSidebar}>
                <i className="hamburger align-self-center"></i>
            </a>
            <div className="d-flex align-item-center gap-3 me-3">
                <ChanageLanguage />
                <ChangeTheme />
            </div>
            <div className={`${language === 'fa' ? 'me-auto' : 'ms-auto'}`}>
            <button className="btn ms-2 btn-outline-danger fw-bolder" onClick={logout}>
              خارج شوید
            </button>
          </div>
        </nav>
    )
};

export default TopNav;