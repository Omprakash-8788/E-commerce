import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Search from "../productDetail/Search/search";
import { useSelector } from "react-redux";
import "./header.css";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';



const Header = () => {
  const { name, error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  return (
    <>
      <div>
        <header className="bg-gray-800 py-10">
          <div className="container mx-auto ">
            <nav className="flex justify-between items-center content-center pr-14">
              <div className="text-white font-bold text-3xl">Logo</div>
              <div style={{ width: "100%" }}>
                <Search />
              </div>
              <div className="space-x-10 text-2xl">
                <NavLink to="/" className="text-white hover:text-gray-400">
                  Home
                </NavLink>
                <NavLink
                  to="/products"
                  className="text-white hover:text-gray-400"
                >
                  Products
                </NavLink>
                <NavLink to="/" className="text-white hover:text-gray-400">
                  Shop
                </NavLink>
                <NavLink to="/" className="text-white hover:text-gray-400">
                  About
                </NavLink>
                <div className="dashboard-container">
                  {isAuthenticated ? (
                    <Head />
                  ) : (
                    <NavLink
                      to="/login"
                      className="text-white hover:text-gray-400"
                    >
                      Login
                    </NavLink>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </header>
      </div>
      <Outlet />
    </>
  );
};

export default Header;

export const Head = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { name, error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  return (
    <div className="dashboard">
      <section>
        <h3>Name</h3>
      </section>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
