import { Outlet } from 'react-router-dom';
//Chakra imports
import { SidebarWithHeader } from './components/sidebar';


/** The entry point to the main application */
function App() {

  return (
    <SidebarWithHeader>
      <Outlet />
    </SidebarWithHeader>
  );
}

export default App;
