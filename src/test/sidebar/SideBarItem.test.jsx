import { render, screen } from "@testing-library/react"
import SideBarItem from "../../components/sidebar/SideBarItem"
import { BrowserRouter } from "react-router-dom"
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

describe('SideBarItem', () => { 
    
    it('should render the side bar nav item', () => {
        const history = createBrowserHistory();
        render(
            <BrowserRouter history = {history}>
            <SideBarItem
                id= 'test-id'
                parentRouteKey = 'parent-id'
                iconName= 'testIcon'
                key= 'test-id'
                path = '/test/abc'
                title= 'Tickets'
            />
        </BrowserRouter>)

        expect(screen.getByText('Tickets')).toBeVisible()
        expect(screen.getByTestId('link_test-id').href).toContain('/test/abc?routeKey=parent-id')
    })


 })
 