import { Stack } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/navbar.component";
import './layout.styls.scss';
const Layout = () => {
  return (
    <Stack data-testid="layout" className="layout" spacing={10}>
      <Navbar></Navbar>
      <Outlet />
    </Stack>
  );
};

export default Layout;
