import { ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Home } from "@mui/icons-material";
import styled from "@emotion/styled";
import { navIconStyle } from "../common/styles";
import { secondaryColor } from "../../util/constants";
import { Box } from "@mui/system";


const StyledLink = styled(NavLink)({
    textDecoration: 'none',
    color: 'inherit',
    
    '&:focus, &:hover, &:active, &.active': {
        textDecoration: 'none',
        color: secondaryColor,
        '& .MuiListItemIcon-root': {
            color: secondaryColor,
        }

    }
});

const styles = {
    listItemStyle: {
        padding: '5px'
    },
    listItemIcon: {
        minWidth: '30px',
        height:'24px'
    },
    text: {fontSize: '.8rem'},
    bulletinRoot: {
        height:'24px',
        width: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

const shapeStyles = { bgcolor: secondaryColor, width: 5, height: 5 };
const shapeCircleStyles = { borderRadius: '50%' };

const circle = (
    <Box component="div" sx={{ ...shapeStyles, ...shapeCircleStyles }} />
  );

const SideBarItem = ({
    id,
    title,
    path = '/',
    iconName,
    parentRouteKey
}) => {
    return <StyledLink
            data-testid = {`link_${id}`}
            to={`${path}?routeKey=${parentRouteKey}` ?? '/'}>

        <ListItem
         sx = {styles.listItemStyle}>
            <ListItemIcon
            sx = {navIconStyle}
            >  <>
                    {
                        iconName ? 
                            <Home sx = {{color: 'inherit'}}/>:
                            <Box sx = {styles.bulletinRoot}>
                                {circle}
                            </Box>
                    }
                </>
            </ListItemIcon>
            <ListItemText sx={styles.text} primary={title} />
         </ListItem>
  </StyledLink>
}

SideBarItem.propTypes = {
    id: PropTypes.string,
    tittle: PropTypes.string,
    path: PropTypes.string,
    iconName:  PropTypes.string,
    parentRouteKey: PropTypes.string,
    disabled: PropTypes.bool
}

export default SideBarItem
