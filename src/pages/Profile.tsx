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
    ListItemAvatar,
    Avatar, Divider, ListItemText
} from "@mui/material";

const Profile = () => {

    const profile = useAppSelector((state: RootState) => state.mainSlice.profile);

    const {isFetching, isLoading, isSuccess, error, isError, data} = useGetProfileQuery("");

    if (isError) return <Box><Paper sx={{padding: "16px"}}>Error, please authorize</Paper></Box>
    if (isLoading || isFetching) return <CircularProgress />

    return (
        <Box>
            <Paper elevation={3}>
                <List sx={style}>
                    <ListItem>
                        <ListItemText primary={profile?.username} />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                        <ListItemText primary={profile?.phone} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List>

                {profile?.username}
                {profile?.phone}
                {profile?.id}
            </Paper>

        </Box>
    );
};

export default Profile;