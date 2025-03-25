// Basic login page for logging in. 
// TODO: Add login functionality

import { Box } from "@mui/material";
import React, { FC } from "react";
import LoginButton from "../components/LoginButton";
import AuthService from '../utils/auth';

const LoginPage: FC = () => {
    const handleLoginClick = () => {
        AuthService.login();
    }

    return (
        <Box>
            <LoginButton onClick={handleLoginClick}/>
        </Box>
    )
}

export default LoginPage;