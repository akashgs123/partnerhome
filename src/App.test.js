import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import Util from './util/util';


Util.fetchNavBar = () => Promise.resolve([
  {
    children: [],
    hasAlert: null,
    icon: null,
    id: 'purchase-dashboard',
    title: 'Purchase Dashboard',
    url: '/purchase_dashboard/index'
}])

test('render the app', async () => {
  const TestComponent = () => {
    const queryClient = new QueryClient();
    return <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  }
  render(<TestComponent />);

  const navItm = await screen.findByTestId('collapsedNav_purchase-dashboard');

  expect(navItm).toBeVisible();
  expect(screen.queryByTestId('partnerHomeLogo')).toBeVisible();
  expect(screen.queryByTestId('AccountCircleIcon')).toBeVisible();
  
  fireEvent.click(screen.getByTestId('MenuIcon'));

  expect(screen.queryByText('Purchase Dashboard')).toBeVisible();
});
