import React from 'react'
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider, useMediaQuery, useTheme } from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ChecklistIcon from '@mui/icons-material/Checklist';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import Logo from './../../assets/image/Logo2.png';

const NAVIGATION = [
    { kind: 'header', title: 'Menú' },
    { segment: 'inicio', title: 'Inicio', icon: <DashboardIcon /> },
    { kind: 'divider' },
    { kind: 'header', title: 'Solicitudes' },
    { segment: 'en-proceso', title: 'En Proceso', icon: <FormatListBulletedIcon />},
    { segment: 'atendidos', title: 'Atendidos', icon: <ChecklistIcon /> },
    { segment: 'rechazados', title: 'Rechazados', icon: <NoAccountsIcon /> },
];

function SideBar() {
    const [openSidebar, setOpenSidebar] = React.useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleSidebar = () => {
        setOpenSidebar(!openSidebar);
    };

  return (
    <div>
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              zIndex: 1300,
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
                  <Link to={`/main/${item.segment}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemText primary={item.title} />
                  </Link>
                </ListItem>
              )
            ))}
            <Divider />
          </List>
        </Drawer>
    </div>
  )
}

export default SideBar;
