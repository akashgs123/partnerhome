import { Home } from "@mui/icons-material";
import { Badge, Box } from "@mui/material";
import { margin } from "@mui/system";
import { useLocation } from "react-router-dom";
import { secondaryColor } from "../../util/constants";
import { navIconStyle } from "../common/styles";
import { navItemType } from "./SidebarAccordian";


    
const styles = {
    selectedNavStyle: {
        borderLeftColor: secondaryColor,
        width: '3px',
        height: '100%',
        borderLeftWidth: '3px',
        borderLeftStyle: 'solid',
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px',
        height: '35px'
    },
    collapsednavIconStyle: {
        ...navIconStyle,
    }
}
const CollapsedIcon = ({navItem}) => {
    const location = useLocation();
    const routeKey = new URLSearchParams(location.search).get('routeKey');
    const match = routeKey === navItem.id || location.hash.includes(navItem.id);

    return  <Box
            data-testid = {`collapsedNav_${navItem.id}`}
            width='30px'
            height= '35px'
            display='flex'
            alignItems='center'
        >
        
        {
        match && 
        <Box
            data-testid = 'highlightNav'
            component='span'
            sx = {styles.selectedNavStyle} />
        }


        <Badge
            sx = {styles.collapsednavIconStyle}
            invisible = {!navItem.hasAlert}
            variant = 'dot'
            color = 'warning'
        >
            <Home color="action" />
        </Badge>
    </Box>
}
const SideBarCollapsed = ({navItems}) => {

    return <>
    {
        navItems.map(item => (
           <CollapsedIcon 
            key={item.id}
            navItem = {item}
           />
        ))
    }
    </>


}

SideBarCollapsed.propTypes = {
    navItems: navItemType
}

export default SideBarCollapsed;