import React from 'react';
import {Container} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {TodolistsList} from "../../../features/TodolistsList/ui/TodolistsList";
import {Login} from "../../../features/auth/ui/login/login";

export const Routing = () => {
    return (
        <Container fixed>
            <Routes>
                <Route path={"/"} element={<TodolistsList/>}/>
                <Route path={"/login"} element={<Login/>}/>
            </Routes>
        </Container>
    );
};

