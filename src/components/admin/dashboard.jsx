import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { styled } from '@mui/system';
import { AppBar, Toolbar, Menu, MenuItem, Avatar, IconButton, Drawer, List, ListItem, ListItemText, Divider, Button, useMediaQuery, useTheme } from '@mui/material';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import SidebarToggleIcon from './../../assets/image/list.svg';
import Logo from './../../assets/image/Logo2.png';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ChecklistIcon from '@mui/icons-material/Checklist';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';

import EnProceso from './EnProceso';

const NAVIGATION = [
  { kind: 'header', title: 'Menú' },
  { segment: 'dashboard', title: 'Inicio', icon: <DashboardIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: 'Solicitudes' },
  { segment: 'en-proceso', title: 'En Proceso', icon: <FormatListBulletedIcon />},
  { segment: 'atendidos', title: 'Atendidos', icon: <ChecklistIcon /> },
  { segment: 'rechazados', title: 'Rechazados', icon: <NoAccountsIcon /> },
];


function Dashboard() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    // Aquí va la lógica para cerrar sesión
  };

  const handleMenuUser = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorElUser(null);
  };

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };


  return (
    <div>
      {/* Barra de navegación */}
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
      
      {/* Sidebar (Drawer) */}
      <div>
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              zIndex: 1300, // Para evitar que el Drawer cubra el Navbar
            },
          }}
          variant={isMobile ? 'temporary' : 'persistent'}
          anchor="left"
          open={isMobile ? openSidebar : true}
          onClose={toggleSidebar}
          ModalProps={{ keepMounted: true }}
        >
          <List>
            <ListItem button style={{ marginBottom: '5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={Logo} alt="Logo" style={{ width: '160px', height: 'auto' }} />
            </ListItem>
            {NAVIGATION.map((item, index) => (
              item.kind === 'header' ? (
                <ListItem key={index}>
                  <ListItemText primary={item.title} />
                </ListItem>
              ) : (
                <ListItem button key={index}>
                  {item.icon}
                  {/* Usar Link para navegar a la ruta correcta */}
                  <Link to={`/dashboard/${item.segment}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemText primary={item.title} />
                  </Link>
                </ListItem>
              )
            ))}
            <Divider />
          </List>
        </Drawer>
      </div>

      {/* Contenido Principal */}
      <div style={{
        flexGrow: 1,
        padding: '16px',
        overflowY: 'auto',
        marginLeft: isMobile ? 0 : '240px', 
        marginTop: '64px',
        transition: 'margin-left 0.3s ease',
      }}>
        <AppProvider navigation={NAVIGATION} theme={{}} window={window}>
          <div className='contenido'>
            contenido del Dashboard principal
          </div>
          <Outlet />
        </AppProvider>
      </div>
    </div>
  );
}

export default Dashboard;
