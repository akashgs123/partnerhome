import  React, {useContext} from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { closedDrawerWidth, drawerWidth } from '../../util/constants';
import NavBarContext from '../context/NavBarContext';
import SideBarExpanded from './SIdeBarExpanded';
import LoadingSkelton from '../common/LoadingSkelton';
import SideBarCollapsed from './SideBarCollapsed';
import PropTypes from 'prop-types';
import { navItemType } from './SidebarAccordian';


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  marginBottom: '5px',
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function SideNavBar({navItems, loading = true}) {
  const {
    open,
    setOpen
  } = useContext(NavBarContext);

  const toggleDrawer = () => {
    setOpen(!open);
  }

  const width =  open ? drawerWidth: closedDrawerWidth;
  return (
      <Drawer
        sx={{
          width,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={true}
        data-testid = 'side-nav-bar'
      >
        <DrawerHeader>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2}}
          >
            <MenuIcon />
          </IconButton>
        </DrawerHeader>

        {loading ? <LoadingSkelton width = {width - 10} /> :
        <>
          {open ? 
                  <SideBarExpanded navItems={navItems} />:
                  <SideBarCollapsed navItems={navItems} />
          }
        </>


        }
      </Drawer>
  );
}

SideNavBar.propTypes = {
  navItems: navItemType,
  loading: PropTypes.bool
}