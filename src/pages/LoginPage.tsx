import { Box, Button, Typography } from "@mui/material";
import React, { FC } from "react";
import AuthService from '../utils/auth';

const LoginPage: FC = () => {
    const handleLoginClick = () => {
        AuthService.login();
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
            }}
        >
            <Typography>
                To access your catalog, please login with your spotify account.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleLoginClick}>
                Login
            </Button>
        </Box>
    )
}

export default LoginPage;