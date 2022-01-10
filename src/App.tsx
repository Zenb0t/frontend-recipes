import './App.css';
import SideDrawer from './app/sideMenuDrawer';
import { Box, Toolbar } from '@mui/material';
import drawerWidth from './app/sideMenuDrawer';
import { Outlet } from 'react-router-dom';



function App() {

  return (
    <Box sx={{ display: 'flex' }}>
      <SideDrawer />
      <Box component="main"
        sx={{
          flexGrow: 1, p: 3, 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          justifyContent: 'center',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
