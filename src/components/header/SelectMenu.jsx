import { Menu } from "@mui/material";
import PropTypes from 'prop-types';
const SelectMenu = ({handleClose, anchorEl, children}) => {
    const open = Boolean(anchorEl);
    return <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      onClose={handleClose}
    >
     {children}
    </Menu>

}

SelectMenu.propTypes = {
  handleClose: PropTypes.func,
  anchorEl: PropTypes.object,
  children: PropTypes.arrayOf(PropTypes.element)
}

export default SelectMenu;