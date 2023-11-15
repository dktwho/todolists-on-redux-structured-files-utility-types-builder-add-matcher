import React, { ReactNode } from 'react';
import {Button, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useActions} from "../../../common/hooks";
import {authThunks} from "../../../features/auth/model/authSlice";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../../features/auth/model/authSelectors";

type Props = {
    position: string
    children: ReactNode
}
export const AppBar = ({position}: Props) => {
    const {logout} = useActions(authThunks);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const logoutHandler = () => logout();
    return (
        <AppBar position={position}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">News</Typography>
                {isLoggedIn && (
                    <Button color="inherit" onClick={logoutHandler}>
                        Log out
                    </Button>
                )}
            </Toolbar>
            {status === "loading" && <LinearProgress/>}
        </AppBar>
    );
};

