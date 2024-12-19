import usFlag from '@assets/images/us.png'
import faFlag from '@assets/images/fa.png'
import { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../contextes/app-contextes';

const ChanageLanguage = () => {
    const [show, setShow] = useState(false);
    const ref = useRef();

    const { language, changeLanguage } = useAppContext()

     useEffect(() => {
            setShow(false);
        }, [language]);

    useEffect(() => {

        const chekIfClickOutside = e => {
            if (show && ref.current && !ref.current.contains(e.target)) {
                setShow(false)
            }
        }

        document.addEventListener('mousedown', chekIfClickOutside);

        return () => {
            document.removeEventListener('mousedown', chekIfClickOutside);
        }

    }, [show]);

    return (
        <div className="dropdown">
            <a className="nav-flag dropdown-toggle" onClick={() => setShow(true)}>
                <img src={language === 'fa' ? faFlag : usFlag} alt="Engish" />
            </a>

            <div ref={ref} className={`dropdown-menu dropdown-menu-end ${show ? "show" : undefined}`}>

                <a className='dropdown-item fw-bolder d-flex text-align-center gap-2' style={{ textAlign: language === 'fa' ? 'right' : 'left' }} onClick={() => changeLanguage('fa')}>
                    <img src={faFlag} width="20" className='ms-2' />
                    <span className='align-middle'>فارسی</span>
                </a>

                <a className='dropdown-item fw-bolder d-flex text-align-center gap-2' style={{ textAlign: language === 'fa' ? 'right' : 'left' }} onClick={() => changeLanguage('en')}>
                    <img src={usFlag} width="20" className='ms-2' />
                    <span className='align-middle'>English </span>
                </a>

            </div>
        </div>
    )
}
export default ChanageLanguage;