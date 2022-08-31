import './App.css';
import MenuBar from './app/MenuBar';
import { Box as MdBox } from '@mui/material';
import drawerWidth from './app/MenuBar';
import { Outlet } from 'react-router-dom';
//Chakra imports
import { Grid, GridItem } from '@chakra-ui/react';


/** The entry point to the main application */
function App() {

  return (
    <MdBox sx={{ display: 'flex' }}>
      {/* <MenuBar /> */}
      <MdBox component="main"
        sx={{
          marginTop: '56px',
          flexGrow: 1, p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          justifyContent: 'center',
        }}
      >
        <Outlet />
      </MdBox>
    </MdBox>
  );
}

export default App;
