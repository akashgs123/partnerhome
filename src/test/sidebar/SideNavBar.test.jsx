import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBarContext from "../../components/context/NavBarContext"
import SideNavBar from "../../components/sidebar/SideNavBar";
import { createBrowserHistory } from 'history';

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

describe('SideNavBar', () => {

    let setOpen;
    const history = createBrowserHistory();
    beforeEach(() => {
        setOpen = jest.fn();
    })

    const TestComponent = ({open = false, loading = false}) => {
        return  <BrowserRouter>
        <NavBarContext.Provider value={{
            open,
            setOpen
          }}>
              <SideNavBar navItems={ mockHierarchicalNavItems } loading = {loading} />
        </NavBarContext.Provider>
        </BrowserRouter>
    }
    it('should show navbar loading indicator', () => {
        const {container} = render(<TestComponent  loading = {true} />)

        expect(container.querySelectorAll('.MuiSkeleton-root').length).toBe(5)
    })

    it('should show collapsed nav bar', () => {
        render(<TestComponent />)
        const navBar =  screen.getByTestId('side-nav-bar');

        expect(getComputedStyle(navBar).width).toBe('50px');
        expect(screen.queryByTestId('collapsedNav_menu-sales-dashboard')).toBeVisible();
        expect(screen.queryByTestId('link_menu-sales-dashboard')).not.toBeInTheDocument();
    })

    it('should show expanded nav bar', () => {
        render(<TestComponent open = {true}/>)
        const navBar =  screen.getByTestId('side-nav-bar');

        expect(getComputedStyle(navBar).width).toBe('280px');
        expect(screen.queryByTestId('collapsedNav_menu-sales-dashboard')).not.toBeInTheDocument();
        expect(screen.queryByTestId('link_menu-sales-dashboard')).toBeVisible();
    })

    it('should close the side bar', () => {
        render(<TestComponent open = {true}/>)
        
        fireEvent.click(screen.getByTestId('MenuIcon'));

        expect(setOpen).toHaveBeenCalledWith(false);
    })

    it('should open the side bar', () => {
        render(<TestComponent />)
        
        fireEvent.click(screen.getByTestId('MenuIcon'));

        expect(setOpen).toHaveBeenCalledWith(true);
    })
})
