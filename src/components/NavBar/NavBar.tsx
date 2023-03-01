
import classes from './NavBar.module.scss';
import {useNavigate, useLocation} from 'react-router-dom';
import {isActiveRoute} from '../../utils/activeRouteFn'
const NavBar = () => {
   const navigate =  useNavigate();
   const location = useLocation();


   const parentClasses = `${classes.navbar} bg-primary navbar text-white px-2 py-4`;
return (
    <div className={parentClasses}>
        <div className="relative flex items-center">
            <div className="logo flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <span className='text-2xl font-bold pl-2'>U-360</span>
            </div>
            <ul className={`${classes['nav-bar-menu']} list-none flex items-center ml-auto`}>
                <li className={isActiveRoute(location.pathname,'/expenses') ? classes['active'] : ''} onClick={() => navigate('/expenses')}>Expenses</li>
                <li>Todos</li>
                <li>Notes</li>
            </ul>
        </div>
    </div>
);
}

export default NavBar;