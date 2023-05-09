import * as React from "react";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeIcon from "@mui/icons-material/Home";
import ContactsIcon from "@mui/icons-material/Contacts";
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import logoImg from "../media/logo.png";
import { Container } from "@mui/system";

import {
  Button,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { useState } from "react";

export const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.type === "Tab" || event.type === "Shift")
    ) {
      return;
    }

    setMobileMenu({ ...mobileMenu, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
  <List>
    {["Accueil", "Services", "Contact", "Devenir partenaire"].map((text, index) => (
      <ListItem key={text} disablePadding>
        <ListItemButton component={Link} href={index === 0 ? '/' : index === 1 ? '/services' : index === 2 ? '/contact' : '/register'}>
          <ListItemIcon>
            {index === 0 && <HomeIcon />}
            {index === 1 && <ListAltIcon />}
            {index === 2 && <ContactsIcon />}
            {index === 3 && <AccountCircleTwoToneIcon />}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>

    </Box>
  );

  const NavLink = styled(Link)(({ theme }) => ({
    fontSize: "14px",
    color: "#4F5361",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      color: "#fff",
    },
  }));

  const NavbarLinksBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
    cursor: "pointer",
    display: "none",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  }));

  const NavbarContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  }));

  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  return (
    <NavbarContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CustomMenuIcon onClick={toggleDrawer("left", true)} />
          <Drawer
            anchor="left"
            open={mobileMenu["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
          <NavbarLogo src={logoImg} alt="logo" />
        </Box>

        <NavbarLinksBox>
          <NavLink underline="none" variant="body2">Accueil </NavLink>
          <NavLink underline="none" variant="body2">Services</NavLink>
          <NavLink underline="none" href="/contact" variant="body2">Contact</NavLink>
          <NavLink underline="none" href="/register" variant="body2">Devenir un partenaire</NavLink>

        </NavbarLinksBox>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Button sx={{textTransform: 'none'}} href="/login" variant="body2">Sign In</Button>
        {/* <Button sx={{textTransform: 'none',backgroundColor: "#000339",border: "2px solid transparent",borderRadius: "7px",}} 
        href="/register" variant="contained">register</Button> */}
      
      </Box>
    </NavbarContainer>
  );
};

export default Navbar;
