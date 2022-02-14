import React, { memo } from "react";
import SidebarAccordian from "./SidebarAccordian";
import SideBarItem from "./SideBarItem";
import PropTypes from 'prop-types';
import { removeParentRouteFromUrl } from "../../util/util";

const SideBarExpanded = ({navItems, parentRouteKey}) => {

    return <>
    {
        navItems.map(item => (
            item.children && item.children.length > 0 ?
            <SidebarAccordian
                id={item.id}
                parentRouteKey = {parentRouteKey ?? item.id}
                children={item.children}
                iconName= {item.icon}
                key={item.id}
                title={item.title ?? ''}
            />
            :
            <SideBarItem
                id={item.id}
                parentRouteKey = {parentRouteKey ?? item.id}
                iconName= {item.icon}
                key={item.id}
                path = {item.url ? removeParentRouteFromUrl(item.url): '/'}
                title={item.title ?? ''}
            />
        ))
    }
    </>
}

SideBarExpanded.propTypes = {
    navItems: PropTypes.array,
    parentRouteKey: PropTypes.string
};

export default memo(SideBarExpanded);
