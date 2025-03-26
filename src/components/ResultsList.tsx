// List of ResultsItems.
// TODO: Add list functionality

import { Box } from "@mui/material";
import React, { FC } from "react";
import ResultsItem from "./ResultsItem";

interface ResultsListProps {
    data: Array<any>; // Todo: find and add a proper type for this
}

const ResultsList: FC<ResultsListProps> = ({data}) => {

    return (
        <Box>
            {data.map(item => <ResultsItem key={item?.id} item={item}/>)}
        </Box>
    )
}

export default ResultsList;
