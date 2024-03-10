import type {SyntheticEvent} from 'react';
import React, {useState} from 'react';
import {routes} from '../routes/routes'
import {Link, Outlet} from "react-router-dom";
import {Box, Container, Tab, Tabs} from "@mui/material";

const Layout = () => {

    const [{children}] = (routes as typeof routes)
    const [tab, setTab] = useState(0);

    return (
        <Container maxWidth="xl">
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs centered={true} value={tab} onChange={(e, value) => setTab(value)}
                      aria-label="basic tabs example">
                    {children.map((route, index) => (
                        <Tab key={route.name} label={route.name} component={Link}
                             to={route.path}
                             value={index}/>))}
                </Tabs>
            </Box>

            <Outlet />
        </Container>
    );
};

export default Layout;