// List of ResultsItems.
// TODO: Add list functionality

import { Box } from "@mui/material";
import React, { FC } from "react";
import ResultsItem from "./ResultsItem";

const ResultsList: FC = () => {
    return (
        <Box>
            <ResultsItem/>
            <ResultsItem/>
            <ResultsItem/>
            <ResultsItem/>
            <ResultsItem/>
        </Box>
    )
}

export default ResultsList;
