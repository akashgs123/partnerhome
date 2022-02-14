import { Home } from "@mui/icons-material";
import { Badge, Box } from "@mui/material";
import { useParentRouteMatch } from "../../hooks/useParentRouteMatch";
import { secondaryColor } from "../../util/constants";
import { navIconStyle } from "../common/styles";
import { navItemType } from "./SidebarAccordian";


    
const styles = {
    selectedNavStyle: {
        borderRightColor: secondaryColor,
        borderRightWidth: '4px',
        borderRightStyle: 'solid',
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px',
        height: '35px'
    },
    unSelectedNav: {
        paddingLeft: '4px'
    },
    collapsednavIconStyle: {
        ...navIconStyle,
    }
}
const CollapsedIcon = ({navItem}) => {
    const match = useParentRouteMatch(navItem.id);

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
            sx = {{
                ...styles.collapsednavIconStyle,
                ...(!match && styles.unSelectedNav)
            }}
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
