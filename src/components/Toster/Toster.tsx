import { ReactNode, SyntheticEvent } from "react";
import Snackbar from '@mui/material/Snackbar';

const Toster: React.FC<{message: string, isOpen: boolean,setIsOpen: (value: boolean) => void, children?: ReactNode }> = ({message,isOpen, setIsOpen}) => {
    const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setIsOpen(false);
      };
    return <Snackbar
    open={isOpen}
    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
    autoHideDuration={4000}
    onClose={handleClose}
    message={message}
  />
}

export default Toster;