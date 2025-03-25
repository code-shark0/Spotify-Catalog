import { Box, TextField } from "@mui/material";
import React, { FC } from "react";
import LoginButton from "../components/LoginButton";
import AuthService from '../utils/auth';
import TextInput from "../components/TextInput";

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
                height: '100vh' 
            }}>
            <TextField label={"Username"} variant={"outlined"} />
            <TextField label={"Password"} variant={"outlined"} type={"password"}/>
            <LoginButton onClick={handleLoginClick}/>
        </Box>
    )
}

export default LoginPage;