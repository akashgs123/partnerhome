
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import SideBarExpanded from "../../components/sidebar/SideBarExpanded"
import { createBrowserHistory } from 'history';

const mockHierarchicalNavItems = [{
    children: [],
    hasAlert: null,
    icon: null,
    id: 'menu-sales-dashboard',
    title: 'Sales Dashboard',
    url: '/sales_dashboard/index'
}, {
    hasAlert: null,
    icon: null,
    id: 'menu-forecast',
    title: 'Forecast',
    url: '/forecast/index',
    children: [{
        children: [],
        hasAlert: null,
        icon: null,
        id: 'menu-pricing-hub-overview',
        title: 'Overview',
        url: '/supplier/pricing_hub/app/index',
    }, {
        children: [],
        hasAlert: null,
        icon: null,
        id: 'menu-pricing-hub-updates',
        title: 'Pricing Updates',
        url: '/supplier/pricing/app/index',
    }],

}]

describe('SideBarExpanded', () => { 

    it('should render the expanded nav bar', () => {
        const history = createBrowserHistory();
        render(<BrowserRouter history = {history}>
            <SideBarExpanded navItems={mockHierarchicalNavItems} />
        </BrowserRouter>)

        expect(screen.queryByText('Sales Dashboard')).toBeVisible();
        expect(screen.queryByText('Forecast')).toBeVisible()
        expect(screen.queryByText('Overview')).not.toBeVisible()
        expect(screen.queryByText('Pricing Updates')).not.toBeVisible()
    })
 })
 