import React, {useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import styled from '@emotion/styled';
import { drawerWidth, closedDrawerWidth } from '../../util/constants';
import NavBarContext from '../context/NavBarContext';
import HeaderLogo from './HeaderLogo';
import HeaderMenu from './HeaderMenu';

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ open }) => ({
  width: `calc(100% - ${closedDrawerWidth}px)`,
  background: '#fff',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
  }),
}));

const styles = {
    toolbar: {  justifyContent: 'space-between' }
}
export default function HeaderBar() {
  const {
    open
  } = useContext(NavBarContext);

  return (
      <StyledAppBar open = {open}>
        <Toolbar sx={styles.toolbar}>
          <HeaderLogo />
          <HeaderMenu />
        </Toolbar>
      </StyledAppBar>
  );
}