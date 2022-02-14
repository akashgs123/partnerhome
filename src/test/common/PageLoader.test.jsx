import { render, screen } from "@testing-library/react"
import PageLoader from "../../components/common/PageLoader"

describe('PageLoader', () => {

    it('should not display the loader', () => {
        render(<PageLoader open = {false} />);

        expect(screen.queryByTestId('appLogo')).not.toBeInTheDocument();
    })

    it('should display the loader', () => {
        render(<PageLoader open = {true} />);

        expect(screen.queryByTestId('appLogo')).toBeInTheDocument();
    })
})