import React from 'react';
import {useGetProfileQuery} from "../store/userApiSlice";
import type {RootState} from "../store/store";
import {useAppSelector} from "../store/store";
import {
    CircularProgress,
    Box,
    Paper,
    ListItem,
    List,
 Divider, ListItemText
} from "@mui/material";

const Profile = () => {

    const profile = useAppSelector((state: RootState) => state.mainSlice.profile);

    const {isFetching, isLoading, isSuccess, error, isError, data} = useGetProfileQuery("");

    if (isError) return <Box><Paper sx={{padding: "16px"}}>Error, please authorize</Paper></Box>
    if (isLoading || isFetching) return <CircularProgress />

    return (
        <Box>
            <Paper elevation={1}>
                <List>

                    <ListItem>
                        <ListItemText><b>Id:</b> {profile?.id}</ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText><b>Username:</b> {profile?.username}</ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText><b>Phone:</b> {profile?.phone}</ListItemText>
                    </ListItem>

                </List>
            </Paper>

        </Box>
    );
};

export default Profile;