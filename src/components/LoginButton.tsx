import { Button } from "@mui/material";
import React, { FC } from "react";

interface LoginButtonProps {
    onClick: () => void;
}

const LoginButton: FC<LoginButtonProps> = ({ onClick }) => {
    return (
        <Button variant="contained" color="primary" onClick={onClick}>
            Login
        </Button>
    )
}

export default LoginButton;