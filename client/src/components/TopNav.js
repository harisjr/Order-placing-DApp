import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Button, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect, useCallback } from "react";
import Chip from "@mui/material/Chip";
import { useLocation } from "react-router-dom";

export default function TopNav({
  logo,
  navigationItems,
  user,
  company,
  totalAmount,
  benchmarkMin,
  Spread,
  launch,
}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ background: "black" }} className="jtopnav">
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={logo} width="80px" height="auto" alt="blockchain app" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="medium"
              aria-label="ico"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navigationItems &&
                navigationItems.map((nav) => (
                  <MenuItem key={nav.label}>
                    <Typography textAlign="center">{nav.label}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box
            sx={{
              flex: 1,
              justifyContent: "center",
              display: { xs: "none", md: "flex" },
            }}
          >
            {navigationItems &&
              navigationItems.map((nav) => (
                <Button
                  key={nav.label}
                  sx={{
                    my: 0,
                    paddingTop: "19px",
                    paddingBottom: "16px",
                    display: "block",
                    color: nav.active ? "yellow" : "#ffffff",
                    borderRadius: 0,
                    borderBottomColor: nav.active ? "yellow" : "transparent",
                    borderBottomWidth: "4px",
                    borderBottomStyle: "solid",
                  }}
                >
                  {nav.label}
                </Button>
              ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href=""
              sx={{
                textDecoration: "none",
                color: "#fff",
                fontSize: "12px",
              }}
              mr="20px"
            >
              Welcome {user}
            </Typography>
            <Tooltip title={user}>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
                data-testid="user-menu-button"
              >
                <Avatar alt={user} src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            ></Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {launch && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar variant="dense" className="jtopsubnav">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 5 }}
              >
                <Typography
                  variant="h6"
                  color="inherit"
                  component="div"
                  sx={{ ml: 0 }}
                >
                  {company}
                </Typography>
              </IconButton>
              <Typography variant="h6" color="inherit" component="div">
                <Chip label="Live" color="primary" />
              </Typography>
              <Typography
                variant="h6"
                color="inherit"
                component="div"
                sx={{ color: "#e3e3e3", float: "right", marginLeft: "50px" }}
              >
                <span style={{ color: "#999999" }}>Principal Amount</span>
                {" $"}
                {totalAmount.toLocaleString()}{" "}
              </Typography>
              <Typography
                variant="h6"
                color="inherit"
                component="div"
                sx={{ color: "#e3e3e3", float: "right", marginLeft: "50px" }}
              >
                <span style={{ color: "#999999" }}>Spread Range</span> {Spread}
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </>
  );
}
