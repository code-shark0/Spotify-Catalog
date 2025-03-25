import { TextField, TextFieldVariants } from "@mui/material";
import React, { FC } from "react";

interface TextInputProps {
    label: string;
    variant?: TextFieldVariants;
}

const TextInput: FC<TextInputProps> = ({ label, variant }) => {
    return (
        <TextField label={label} variant={variant || "outlined"}>
            {label}
        </TextField>
    )
}

export default TextInput;
