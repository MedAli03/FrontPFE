import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper } from '@mui/material';
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
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Navigate, Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Collapse from '@mui/material/Collapse';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import { UserStateContext } from '../Contexts/ContextProvider';
import axiosClient from '../axios';

// import Chart from './Chart';
// import Deposits from './Deposits';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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

function DashboardContent() {
  const { setCurrentUser, setUserToken } = UserStateContext();
  const { userToken } =UserStateContext();
  const [pressing, setPressing] = React.useState(false);
  const [client, setClient] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();


  if(!userToken) {
     return <Navigate to={'/login'} />
  }

    // const handleOrdersClick = () => {
    //   navigate('/admin/orders');
    // }
    const handleArticlesClick = () => {
      navigate('/admin/vêtements');
    }
    const handlePressingRequestClick = () => {
      navigate('/admin/pressingrequest');
    }
    const handleclientsClick = () => {
      navigate('/admin/clients');
    }
    const handlePressingClick = () => {
      setPressing(!pressing);
    }; 
    const handleClientClick = () => {
      setClient(!client);
    };

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
        <ListItemButton onClick={handlePressingClick}>
        <ListItemIcon>
          <LocalLaundryServiceIcon />
        </ListItemIcon>
        <ListItemText primary="Pressings" />
        {pressing ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={pressing} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <VerifiedUserIcon />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={handlePressingRequestClick}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Pressings Request"/>
        </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClientClick} >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Clients"/>
          {client ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={client} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <VerifiedUserIcon />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={handleclientsClick}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Liste des clients"/>
        </ListItemButton>
        </List>
        </Collapse>
        <ListItemButton  onClick={handleArticlesClick} >
          <ListItemIcon>
            <CheckroomIcon />
          </ListItemIcon>
          <ListItemText primary="vêtements" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Integrations" />
        </ListItemButton>
      </React.Fragment>
    );
  
    const secondaryListItems = (
      <React.Fragment>
        <ListSubheader component="div" inset>
          Saved reports
        </ListSubheader>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Current month" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Last quarter" />
        </ListItemButton>
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
        <AppBar position="absolute" open={open} sx={{backgroundColor:'#1e1e1e'}}>
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
              Admin
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
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
            <Grid container >
              
              {/* Recent Orders */}
              <Grid item xs={12} md={9} lg={12} sx={{ display: 'flex', justifyContent: 'center',width: '100%'}}>
                <Paper >
                  <Outlet/>
                </Paper>
              </Grid>

            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}