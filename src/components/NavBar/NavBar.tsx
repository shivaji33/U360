
import classes from './NavBar.module.scss';
import {useNavigate, useLocation} from 'react-router-dom';
import {isActiveRoute} from '../../utils/activeRouteFn'
import { useAuthData } from '../../hooks/useAuthData/useAuthData';
const NavBar = () => {
   const navigate =  useNavigate();
   const location = useLocation();
   const authData = useAuthData();
    console.log();


   const parentClasses = `${classes.navbar} bg-primary navbar text-white px-2 py-4`;
return (
    <div className={parentClasses}>
        <div className="relative flex items-center">
            <div className="logo flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <span className='text-2xl font-bold pl-2'>U-360</span>
            </div>
            <ul className={`${classes['nav-bar-menu']} list-none flex items-center ml-auto`}>
                <li className={isActiveRoute(location.pathname,'/expenses') ? classes['active'] : ''} onClick={() => navigate('/home/expenses')}>Expenses</li>
                <li>Todos</li>
                <li>
                   <div className={classes['profile-image']}>
                   <img  src={authData?.user?.photoURL} alt={authData?.user?.displayName} />
                    <i className="fa-sharp fa-solid fa-caret-down ml-3"></i>
                   </div>
                </li>
            </ul>
        </div>
    </div>
);
}

export default NavBar;