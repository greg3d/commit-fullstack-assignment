import React from 'react';
import {routes} from '../routes/routes'
import {Link, Outlet} from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    LinearProgress,
    Tab,
    Tabs
} from "@mui/material";

import {RootState, useAppDispatch, useAppSelector} from "../store/store";
import {ackError, setTab} from "../store/mainSlice";

const Layout = () => {

    const [{children}] = (routes as typeof routes)
    const dispatch = useAppDispatch()
    const {error, isLoading, tab} = useAppSelector((state: RootState) => state.mainSlice)

    return (
        <>
            <Container maxWidth="sm">
                <Box sx={{borderBottom: 1, borderColor: 'divider', marginBottom: '1rem'}}>
                    <Tabs value={tab} onChange={(e, value) => dispatch(setTab(value))}
                          aria-label="basic tabs example">
                        {children.map((route, index) => (
                            <Tab key={route.name} label={route.name} component={Link}
                                 to={route.path}
                                 value={index}/>))}
                    </Tabs>
                </Box>
                <Outlet/>
                {isLoading && <LinearProgress/>}
            </Container>

            <Dialog
                open={error !== ""}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onClose={() => dispatch(ackError(1))}
            >
                <DialogContent>
                    <DialogContentText>
                        {error}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => dispatch(ackError(1))}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Layout;