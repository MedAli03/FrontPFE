import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import { Navigate, Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import { UserStateContext } from '../Contexts/ContextProvider';
import PaidTwoToneIcon from '@mui/icons-material/PaidTwoTone';
import axiosClient from '../axios';
import Commandes from './Commandes';
import ReceiptIcon from '@mui/icons-material/Receipt';



const drawerWidth = 240;

const CustomAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#641bb4', // Custom background color
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function PressingDashboard() {

  const { setCurrentUser, setUserToken } = UserStateContext();
  const { userToken } =UserStateContext();
  const [isCommandeRendered, setIsCommandeRendered] = React.useState(false);
  
  const renderCommande = () => {
    setIsCommandeRendered(true);
  };

  // const [client, setClient] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();


  if(!userToken) {
     return <Navigate to={'/login'} />
  }

    const handleNotaionsClick = () => {
      navigate('/pressingdashboard/notation');
      renderCommande();
    }

    const handleArticlesClick = () => {
      navigate('/pressingdashboard/vêtements');
      renderCommande();
    }
    const handleCommandesClick = () => {
      navigate('/pressingdashboard/commandes');
      renderCommande();
    }
    const handleServicesClick = () => {
      navigate('/pressingdashboard/services');
      renderCommande();
    }
    const handleTarifClick = () => {
      navigate('/pressingdashboard/tarif');
      renderCommande();
    }
    const handleFacturesClick = () => {
      navigate('/pressingdashboard/factures');
      renderCommande();
    }

    // const handleClientClick = () => {
    //   setClient(!client);
    // };

    const logout = () => {
       axiosClient.post('/logout', null, {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      }).then(response => {
        setUserToken(null);
        setCurrentUser({});
        window.location.href = "/login"
      }).catch(error => {
        console.log('An error occurred:', error);
      });
      
    }

    const mainListItems = (
      <React.Fragment>
      <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton onClick={() => {handleCommandesClick()}}>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="Commandes" />
      </ListItemButton>

      <ListItemButton onClick={() => {handleServicesClick();}} >
          <ListItemIcon>
            <HandshakeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Services"/>
      </ListItemButton>

      <ListItemButton onClick={handleArticlesClick} >
          <ListItemIcon>
            <CheckroomIcon />
          </ListItemIcon>
          <ListItemText primary="Vêtements"/>
      </ListItemButton>

      <ListItemButton onClick={handleTarifClick} >
          <ListItemIcon>
            <PaidTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Tarif"/>
      </ListItemButton>

      <ListItemButton  onClick={handleNotaionsClick} >
          <ListItemIcon>
            <ThumbsUpDownIcon />
          </ListItemIcon>
          <ListItemText primary="Notation" />
      </ListItemButton>
      <ListItemButton  onClick={handleFacturesClick} >
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Factures" />
      </ListItemButton>

      </React.Fragment>
    );
  
    const secondaryListItems = (
      <React.Fragment>
        <ListItemButton onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItemButton>
      </React.Fragment>
    );



  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <CustomAppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Pressing
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </CustomAppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container>
        <Grid item xs={12} md={9} lg={12} sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Paper>
          {isCommandeRendered ? <Outlet /> : <Commandes />}
          </Paper>
        </Grid>
      </Grid>
    </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function DashboardPressing() {
  return <PressingDashboard />;
}