import './App.css';
import MenuBar from './app/MenuBar';
import { Box } from '@mui/material';
import drawerWidth from './app/MenuBar';
import { Outlet } from 'react-router-dom';


/** The entry point to the main application */
function App() {

  return (
    <Box sx={{ display: 'flex' }}>
      <MenuBar />
      <Box component="main"
        sx={{
          flexGrow: 1, p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          justifyContent: 'center',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
