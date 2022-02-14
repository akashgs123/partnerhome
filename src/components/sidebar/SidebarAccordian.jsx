import { ExpandMore, Home } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, ListItemIcon, Typography } from '@mui/material';
import styled from '@emotion/styled';
import SideBarExpanded from './SIdeBarExpanded';
import { navIconStyle } from '../common/styles';
import PropTypes from 'prop-types';

const StyledAccordian = styled(Accordion)({
  marginBlock: 0,
  '&:before': {
    height: 0
  }
})
const StyledAccordionSummary = styled(AccordionSummary)({
  padding: '5px',
  minHeight: '30px !important',
  ".MuiAccordionSummary-content": {
    marginBlock: '2px !important'
  }
})

const SidebarAccordian = ({
    iconName,
    title,
    children,
    parentRouteKey,
    id
}) => {
    return <StyledAccordian
    elevation={0}
    data-testid = {`acc_${id}`}
    id={id}>
    <StyledAccordionSummary
      expandIcon={<ExpandMore />}
      aria-label= {title}
    >
      <ListItemIcon
       sx = {navIconStyle}
       >
        <Home />
      </ListItemIcon>
      <Typography>{title}</Typography>
    </StyledAccordionSummary>
    <AccordionDetails data-testid = {`summary_${id}`}>
        <SideBarExpanded navItems={children} parentRouteKey = {parentRouteKey} />
    </AccordionDetails>
  </StyledAccordian>
}

export const navItemType = PropTypes.arrayOf(PropTypes.shape({
  iconName: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.array,
  parentRouteKey: PropTypes.string,
  id: PropTypes.string,
}))

SidebarAccordian.propTypes = {
  iconName: PropTypes.string,
  title: PropTypes.string,
  children: navItemType,
  parentRouteKey: PropTypes.string,
  id: PropTypes.string,
}


export default SidebarAccordian;