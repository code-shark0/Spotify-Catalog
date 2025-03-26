import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import LoginButton from "../components/LoginButton";
import AuthService from '../utils/auth';

const LoginPage: FC = () => {
    const handleLoginClick = () => {
        AuthService.login();
        console.log('in login click')
    }

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
                width: '100vw',
                gap: '1rem',
            }}>
                <Typography>
                    To access your catalog, please login with your spotify account.
                </Typography>
            <LoginButton onClick={handleLoginClick}/>
        </Box>
    )
}

export default LoginPage;