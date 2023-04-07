import classes from "./NavBar.module.scss";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState, MouseEvent } from "react";
import { useUserLogout } from "../../firebase/auth";
import { getUserAuthData } from "../../localStorage/authData";

const NavBar = () => {
  const navigate = useNavigate();
  const authData = getUserAuthData();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userLogout = useUserLogout();
  const profileMenuOpen = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogout = () => {
    userLogout();
  }

  const parentClasses = `${classes.navbar} bg-primary navbar text-white px-2 py-4`;
  return (
    <div className={parentClasses}>
      <div className="relative flex items-center">
        <div
          className="logo flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-2xl font-bold pl-2">U360</span>
        </div>
        <ul
          className={`${classes["nav-bar-menu"]} list-none flex items-center ml-auto`}
        >
          <li>
            <div className={classes["profile-image"]}>
              <img
                src={authData?.photoURL}
                alt={authData?.displayName}
              />
               <span className="ml-2">{authData?.displayName}</span>
              <i   onClick={handleClick.bind(this)} className="fa-sharp fa-solid fa-caret-down ml-2"></i>
            </div>
          </li>
          <Menu
            anchorEl={anchorEl}
            open={profileMenuOpen}
            onClose={handleClose}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </Menu>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
