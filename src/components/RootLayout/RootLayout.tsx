import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import classes from './RootLayout.module.scss';

const RootLayout = () => {
  return (
    <>
    <NavBar />
    <div className={classes['content-wrapper']}>
    <Outlet />
    </div>
    </>
  );
};

export default RootLayout;
