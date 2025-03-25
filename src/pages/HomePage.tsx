import { Box } from "@mui/material";
import React, { FC } from "react";
import SearchBar from "../components/SearchBar";
import ResultsList from "../components/ResultsList";

const Homepage: FC = () => {
    return (
        <Box>
            <SearchBar/>
            <ResultsList/>
        </Box>
    )
}

export default Homepage;