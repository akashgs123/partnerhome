import { fireEvent, render, screen } from "@testing-library/react"
import HeaderMenu from "../../components/header/HeaderMenu";


const mockLangData = {
    settings: 'Account Settings',
    userManagement: 'User Management',
    myTeam: 'My Team',
    engUk: 'English(UK)',
    german: 'Deutsch',
    logout: 'Logout'
};

describe('HeaderMenu', () => {

    beforeEach(() => {
        render(<HeaderMenu />);
    })
    it('should display the Menu component', () => {
        const select = screen.getByTestId('native-select');

        expect(select).toBeInTheDocument();
        expect(select).not.toBeVisible();
        expect(select).toHaveValue('en-gb');
        expect(screen.getByText('Account Settings')).toBeInTheDocument();
        expect(screen.getByText('Account Settings')).not.toBeVisible();
        expect(screen.getByText('User Management')).toBeInTheDocument();
        expect(screen.getByText('User Management')).not.toBeVisible();
        expect(screen.getByText('My Team')).toBeInTheDocument();
        expect(screen.getByText('My Team')).not.toBeVisible();
        expect(screen.getByText('Logout')).toBeInTheDocument();
        expect(screen.getByText('Logout')).not.toBeVisible();
    })

    it('should open and close the menu', () => {
        fireEvent.click(screen.getByRole('button'));

        const menuItem = screen.getByText('Account Settings');
        expect(menuItem).toBeVisible();

        fireEvent.click(menuItem);

        expect(menuItem).toBeInTheDocument();
        expect(menuItem).not.toBeVisible();
     })


})
