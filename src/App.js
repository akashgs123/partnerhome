import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import PageLoader from './components/common/PageLoader';
import NavBarContext from './components/context/NavBarContext';
import HeaderBar from './components/header/HeaderBar';
import SideNavBar from './components/sidebar/SideNavBar';
import { useNavigation } from './hooks/useNavigation';

function App() {
  
  const {
    navbarLoading,
    navBarData,
  } = useNavigation();

  const pageLoading = navbarLoading;
  const [open, setOpen] = useState(false);
  return (
    <div className="App">
       <StyledEngineProvider injectFirst>
         <CssBaseline />
         <Router>
          <NavBarContext.Provider value={{
            open,
            setOpen
          }}>
            <PageLoader open={ pageLoading ?? false} />
            
            <Box sx={{ display: 'flex' }}>
              <HeaderBar />
              <SideNavBar navItems={ navBarData } loading = {navbarLoading} />
            </Box>
          </NavBarContext.Provider>
        </Router>
       </StyledEngineProvider>
    </div>
  );
}

export default App;
