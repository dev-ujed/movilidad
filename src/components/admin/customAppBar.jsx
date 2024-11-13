import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Menu, MenuItem, Avatar, IconButton, useTheme, useMediaQuery } from '@mui/material';
import SidebarToggleIcon from './../../assets/image/list.svg';

function CustomAppBar() {

  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = async () => {
    try {
        const response = await axios.post(
            'https://movilidadback.ujed.mx/users/logout/',
            {},{headers: {'Content-Type': 'application/json',}}
        );
        if (response.status === 200) {
            console.log(response.data.message); // 'success'
            localStorage.removeItem('token');
            navigate("/login");
        }
    } catch (error) {
        console.error('Error durante el cierre de sesión:', error);
    }
  };

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleMenuUser = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
        <AppBar position="sticky" style={{ height: '64px', backgroundColor: 'rgb(177, 24, 48, 1)'}}>
          <Toolbar>
            {isMobile && (
              <IconButton onClick={toggleSidebar} color="inherit">
                <img src={SidebarToggleIcon} alt="Abrir Sidebar" style={{ width: '30px', height: '30px' }} />
              </IconButton>
            )}
            <div style={{ marginLeft: 'auto' }}>
              <IconButton onClick={handleMenuUser} color="inherit">
                <Avatar alt="Usuario" src="/user-image.jpg" />
              </IconButton>
              <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUser}>
                <MenuItem onClick={handleCloseUser}>Mi perfil</MenuItem>
                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
  )
}

export default CustomAppBar;
