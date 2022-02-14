import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import CustomSelect from "../../components/common/CustomSelect";
import Util from "../../util/util";


const mockLangOptions = [{
    key: 'en-gb',
    value: 'engUk'
}, {
    key: 'de',
    value: 'german'
}]

const mockLangData = {
    settings: 'Account Settings',
    userManagement: 'User Management',
    myTeam: 'My Team',
    engUk: 'English(UK)',
    german: 'Deutsch',
    logout: 'Logout'
};


describe('CustomSelect', () => {

    let onLanguageSelect;

    beforeAll(() => {
        Util.getTranslations = () => mockLangData
    });

    beforeEach(() => {
        onLanguageSelect = jest.fn();
    });

    it('should render the Native select', () => {
       render( <CustomSelect
            options={mockLangOptions}
            onSelect={onLanguageSelect}
            hasUnderLine = {false}
            variant = 'standard'/>);

        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getAllByRole('option').length).toBe(2);
    });

    it('should have default value as english', () => {
       render( <CustomSelect
            defaultValue='en-gb'
            options={mockLangOptions}
            onSelect={onLanguageSelect}
            hasUnderLine = {false}
            variant = 'standard'/>);

       const select =  screen.getByTestId('native-select')
       expect(select).toHaveValue('en-gb');
    });

    it('should select an option',  async () => {
        render( <CustomSelect
            options={mockLangOptions}
            onSelect={onLanguageSelect}
            hasUnderLine = {false}
            variant = 'standard'/>);

        const select =  screen.getByTestId('native-select')

        userEvent.selectOptions(select, screen.getAllByRole('option')[1])

        expect(select).toHaveValue('de');
    });

    it('should invoke the select change prop',  async () => {
        render( <CustomSelect
            options={mockLangOptions}
            onSelect={onLanguageSelect}
            hasUnderLine = {false}
            variant = 'standard'/>);

        const select =  screen.getByTestId('native-select')

        userEvent.selectOptions(select, screen.getAllByRole('option')[1])

        expect(onLanguageSelect).toHaveBeenCalledWith('de');
    });
})