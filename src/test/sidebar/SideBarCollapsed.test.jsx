import { render, screen, within } from "@testing-library/react";
import SideBarCollapsed from "../../components/sidebar/SideBarCollapsed";

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

const mockHierarchicalNavItems = [{
    children: [],
    hasAlert: null,
    icon: null,
    id: 'menu-sales-dashboard',
    title: 'Sales Dashboard',
    url: '/sales_dashboard/index'
}, {
    hasAlert: true,
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

},{
    children: [],
    hasAlert: null,
    icon: null,
    id: 'purchase-dashboard',
    title: 'Purchase Dashboard',
    url: '/purchase_dashboard/index'
},]
describe('SidebarCollapsed', () => {

    it('should render the collapsed sidebar with 3 nav items', () => {
        render(<SideBarCollapsed navItems={mockHierarchicalNavItems} />)
        expect(screen.getByTestId('collapsedNav_menu-forecast')).toBeVisible();
        expect(screen.getByTestId('collapsedNav_purchase-dashboard')).toBeVisible();
        expect(screen.getByTestId('collapsedNav_menu-sales-dashboard')).toBeVisible();
    })

    it('should show got notification if some alerts are there', () => {
        render(<SideBarCollapsed navItems={mockHierarchicalNavItems} />)

        expect(screen.getByTestId('collapsedNav_menu-forecast').querySelector('.MuiBadge-badge.MuiBadge-dot')).toBeInTheDocument();
        expect(screen.getByTestId('collapsedNav_purchase-dashboard').querySelector('.MuiBadge-badge.MuiBadge-dot')).toBeInTheDocument();
        expect(screen.getByTestId('collapsedNav_menu-sales-dashboard').querySelector('.MuiBadge-badge.MuiBadge-dot')).toBeInTheDocument();

        expect(screen.getByTestId('collapsedNav_menu-forecast').querySelector('.MuiBadge-invisible')).not.toBeInTheDocument();
        expect(screen.getByTestId('collapsedNav_purchase-dashboard').querySelector('.MuiBadge-invisible')).toBeInTheDocument();
        expect(screen.getByTestId('collapsedNav_menu-sales-dashboard').querySelector('.MuiBadge-invisible')).toBeInTheDocument();
    })
    
    it('should highlight the current route', () => {
        render(<SideBarCollapsed navItems={mockHierarchicalNavItems} />)
      
        const activeRouteItem = screen.getByTestId('collapsedNav_purchase-dashboard');
        const inActiveRouteItem = screen.getByTestId('collapsedNav_menu-forecast');
        
        expect(within(activeRouteItem).queryByTestId('highlightNav')).toBeVisible();
        expect(within(inActiveRouteItem).queryByTestId('highlightNav')).not.toBeInTheDocument();
        
    })
});
