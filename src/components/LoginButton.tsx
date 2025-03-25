// Basic auth button for logging in. 
// TODO: Add login functionality

import { Button } from "@mui/material";
import React, { FC } from "react";

const LoginButton: FC = () => {
    return (
        <Button variant="contained" color="primary">
            Login
        </Button>
    )
}

export default LoginButton;