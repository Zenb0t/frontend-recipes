import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PostAddIcon from '@mui/icons-material/PostAdd';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoginIcon from '@mui/icons-material/Login';
import React from "react";
import { MagicButton } from "./MagicButton";
import { NavLink } from "react-router-dom";
import { Text } from "@chakra-ui/react";


export const drawerWidth = 240;

export default function MenuBar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <RecipeAppBar drawerToggle={handleDrawerToggle} />
            <SideDrawer handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
        </Box >
    );
}

function RecipeAppBar(props: { drawerToggle: Function }) {

    const handleDrawerToggle = props.drawerToggle;

    return (
        <AppBar
            position="fixed"
            sx={{ zIndex: 999, }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Text variant="h6" as="div" sx={{flexGrow: 1}}>
                    Full Stack Recipes App
                </Text>
            </Toolbar>
        </AppBar>
    );
}

function SideDrawer(props: { mobileOpen: boolean, handleDrawerToggle: Function }) {

    const { mobileOpen, handleDrawerToggle } = props;

    return (
        <Box component="nav" aria-label="recipebook navigation"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant="temporary" open={mobileOpen}
                onClose={() => handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }, }}
            >
                {drawerContent}
            </Drawer>
            <Drawer open variant="permanent" sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
}

const drawerContent = (<>
    <Toolbar />
    <Divider />
    <List>
        <ListItem >
            <MagicButton />
        </ListItem>
        <ListItemButton component={NavLink} to={'/add-recipe'} >
            <ListItemIcon>
                <PostAddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Recipe" />
        </ListItemButton>
        <Divider />
        <ListItemButton component={NavLink} to={'/allrecipes'} >
            <ListItemIcon>
                <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="All Recipes" />
        </ListItemButton>
        <ListItemButton component={NavLink} to={'favorites'}>
            <ListItemIcon>
                <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Favorite Recipes" />
        </ListItemButton>
        {/*TODO: remove me later */}
        <ListItemButton component={NavLink} to={'login'}>
            <ListItemIcon>
                <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login Screen" />
        </ListItemButton>
    </List>
</>);