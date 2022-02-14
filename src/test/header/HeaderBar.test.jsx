import HeaderBar from '../../components/header/HeaderBar';
import NavBarContext from '../../components/context/NavBarContext';
import { fireEvent, render, screen } from '@testing-library/react';
import Util from "../../util/util";

const mockLangData = {
    settings: 'Account Settings',
    userManagement: 'User Management',
    myTeam: 'My Team',
    engUk: 'English(UK)',
    german: 'Deutsch',
    logout: 'Logout'
};

describe('HeaderBar', () => {
    

    beforeAll(() => {
        Util.getTranslations = () => mockLangData
    })
    const TestComponent = ({open}) => {
        return <NavBarContext.Provider value={{
            open,
            setOpen: jest.fn()
          }}>
            <HeaderBar />
        </NavBarContext.Provider>
    }
    it('render the header with logo and account menu', () => {
       render(<TestComponent open = {true} />)

       expect(screen.getByTestId('partnerHomeLogo')).toBeInTheDocument();
       expect(screen.getByText('Account Settings')).toBeInTheDocument();
       expect(screen.getByText('Account Settings')).not.toBeVisible();
    })

    it('should open the menu', () => {
        render(<TestComponent open = {true} />)

        fireEvent.click(screen.getByRole('button'));

        expect(screen.getByText('Account Settings')).toBeVisible();
     })

     it('should close the menu', () => {
        render(<TestComponent open = {true} />)

        fireEvent.click(screen.getByRole('button'));

        const menuItem = screen.getByText('Account Settings');
        expect(menuItem).toBeVisible();

        fireEvent.click(menuItem);
        expect(menuItem).toBeInTheDocument();
        expect(menuItem).not.toBeVisible();
     })

     
     it('appbar should change size based on sidebar is open or not', () => {
        const {container: opencontainer} = render(<TestComponent open = {true} />)
        const headerOpen = opencontainer.querySelector('header');

        const openWidth = getComputedStyle(headerOpen).width;

        const {container: closedContainer} = render(<TestComponent open = {false} />)

        const headerClosed = closedContainer.querySelector('header');

        const closedWidth = getComputedStyle(headerClosed).width;

        //modify the expectaion if expanded navbar size changed intensionaly
        expect(openWidth).toBe('calc(100% - 280px)')
        //modify the expectaion if collapsed navbar size changed intensionaly
        expect(closedWidth).toBe('calc(100% - 50px)')
     })
     

})