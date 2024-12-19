import { RouterProvider } from 'react-router-dom';
import Login from './features/identity/componets/login'
import Register from './features/identity/componets/register'
import router from './router';
import './core/i18n';
import { useAppContext } from './contextes/app-contextes';
import { useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


function App() {
    const { theme } = useAppContext();

    useEffect(() => {
        const head = document.head;
        const link = document.createElement('link');
        link.rel = 'StyleSheet';
        link.href = `/css/${theme}.css`;
        head.appendChild(link);

        return () => { head.removeChild(link) }
    }, [theme])
    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer rtl/>
        </>

    )
}

export default App;
