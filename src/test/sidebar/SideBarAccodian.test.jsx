import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SidebarAccordian from '../../components/sidebar/SidebarAccordian';
import { createBrowserHistory } from 'history';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
    useLocation: () => ({
        hash: '',
        key: 'mka6qa47',
        pathname: '/purchase_dashboard/index',
        search: '?routeKey=purchase-dashboard',
        state: null,
    })
}));

const mockPlaneNavItems = [{
    children: [],
    hasAlert: null,
    icon: null,
    id: 'menu-sales-dashboard',
    title: 'Sales Dashboard',
    url: '/sales_dashboard/index'
}, {
    children: [],
    hasAlert: null,
    icon: null,
    id: 'menu-forecast',
    title: 'Forecast',
    url: '/forecast/index'
}]

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

describe('SidebarAccordian', () => {
    const history = createBrowserHistory();

    it('should open the SidebarAccordian with hierarchy', () => {
        render(
            <BrowserRouter history = {history}>
                <SidebarAccordian
                    id='menu-ticket'
                    parentRouteKey = 'menu-ticket'
                    children={mockHierarchicalNavItems}
                    iconName= 'ticket'
                    key='menu-ticket'
                    title= 'Ticket'
                />
            </BrowserRouter>
        )

        expect(screen.getByTestId('acc_menu-ticket')).toBeVisible();
        expect(screen.getByTestId('summary_menu-ticket')).toBeInTheDocument();
        expect(screen.getByTestId('summary_menu-ticket')).not.toBeVisible();

        //open accordian
        fireEvent.click(screen.getByText('Ticket'));

        expect(screen.getByTestId('summary_menu-ticket')).toBeVisible();

        //to check item with children rendered as accordian
        expect(screen.queryByTestId('acc_menu-sales-dashboard')).not.toBeInTheDocument();
        expect(screen.queryByTestId('acc_menu-forecast')).toBeInTheDocument();
        expect(screen.getByTestId('summary_menu-forecast')).toBeInTheDocument();
        expect(screen.getByTestId('summary_menu-forecast')).not.toBeVisible();

        //item with children not rendered as link
        expect(screen.queryByTestId('link_menu-sales-dashboard')).toBeVisible();
        expect(screen.queryByTestId('link_menu-forecast')).not.toBeInTheDocument();
        expect(screen.getByText('Forecast')).toBeVisible();
        expect(screen.getByText('Sales Dashboard')).toBeVisible();

        //nav items in the children in not visible in the dom
        expect(screen.getByText('Overview')).toBeInTheDocument();
        expect(screen.getByText('Pricing Updates')).toBeInTheDocument();
        expect(screen.getByText('Overview')).not.toBeVisible();
        expect(screen.getByText('Pricing Updates')).not.toBeVisible();

        //open child accordian
        fireEvent.click(screen.getByText('Forecast'));

        expect(screen.getByText('Overview')).toBeVisible();
        expect(screen.getByText('Pricing Updates')).toBeVisible();
        expect(screen.getByTestId('link_menu-pricing-hub-overview')).toBeVisible();
        expect(screen.getByTestId('link_menu-pricing-hub-updates')).toBeVisible();

        expect(screen.getByTestId('link_menu-pricing-hub-overview').href).toContain('/supplier/pricing_hub/app/index?routeKey=menu-ticket')
        expect(screen.getByTestId('link_menu-pricing-hub-updates').href).toContain('/supplier/pricing/app/index?routeKey=menu-ticket')
 
    });

    it('should expand the accordian by default based on current route', () => {

        const mockHierarchicalNavItemsRef = JSON.parse(JSON.stringify(mockHierarchicalNavItems))
        mockHierarchicalNavItemsRef[1].id = 'purchase-dashboard'
        render(
            <BrowserRouter history = {history}>
                <SidebarAccordian
                    id='purchase-dashboard'
                    parentRouteKey = 'purchase-dashboard'
                    children={mockHierarchicalNavItemsRef}
                    iconName= 'ticket'
                    key='purchase-dashboard'
                    title= 'Ticket'
                />
            </BrowserRouter>
        )

        expect(screen.getByText('Overview')).toBeVisible();
        expect(screen.getByText('Pricing Updates')).toBeVisible();
        expect(screen.getByTestId('link_menu-pricing-hub-overview')).toBeVisible();
        expect(screen.getByTestId('link_menu-pricing-hub-updates')).toBeVisible();

        expect(screen.getByTestId('link_menu-pricing-hub-overview').href).toContain('/supplier/pricing_hub/app/index?routeKey=purchase-dashboard')
        expect(screen.getByTestId('link_menu-pricing-hub-updates').href).toContain('/supplier/pricing/app/index?routeKey=purchase-dashboard')
 
    });

    it('should open the SidebarAccordian with no hierarchy', () => {
        render(
            <BrowserRouter history = {history}>
                <SidebarAccordian
                    id='menu-ticket'
                    parentRouteKey = 'menu-ticket'
                    children={mockPlaneNavItems}
                    iconName= 'ticket'
                    key='menu-ticket'
                    title= 'Ticket'
                />
            </BrowserRouter>
        )

        expect(screen.getByTestId('acc_menu-ticket')).toBeVisible();
        expect(screen.getByTestId('summary_menu-ticket')).toBeInTheDocument();
        expect(screen.getByTestId('summary_menu-ticket')).not.toBeVisible();

        //open accordian

        fireEvent.click(screen.getByText('Ticket'));

        expect(screen.getByTestId('summary_menu-ticket')).toBeVisible();

        //to test child elements not render as accordian
        expect(screen.queryByTestId('acc_menu-sales-dashboard')).not.toBeInTheDocument();
        expect(screen.queryByTestId('acc_menu-forecast')).not.toBeInTheDocument();

        expect(screen.queryByTestId('link_menu-sales-dashboard')).toBeVisible();
        expect(screen.queryByTestId('link_menu-forecast')).toBeVisible();
        expect(screen.getByText('Forecast')).toBeVisible();
        expect(screen.getByText('Sales Dashboard')).toBeVisible();



        expect(screen.getByTestId('link_menu-forecast').href).toContain('/forecast/index?routeKey=menu-ticket')
        expect(screen.getByTestId('link_menu-sales-dashboard').href).toContain('/sales_dashboard/index?routeKey=menu-ticket')
 
    });
})