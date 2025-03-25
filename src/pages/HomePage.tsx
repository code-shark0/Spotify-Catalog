import { Box } from "@mui/material";
import React, { FC } from "react";
import TextInput from "../components/TextInput";
import ResultsList from "../components/ResultsList";

const Homepage: FC = () => {
    return (
        <Box>
            <TextInput/>
            <ResultsList/>
        </Box>
    )
}

export default Homepage;