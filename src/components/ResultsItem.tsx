// Item for displaying catalog items. 
// TODO: Add item functionality

import { Box } from "@mui/material";
import React, { FC } from "react";

interface ResultsItemProps {
    item: any;
}

const ResultsItem: FC<ResultsItemProps> = ({item}) => {
    console.log(item);
    
    return (
        <Box>
            Results Item
        </Box>
    )
}

export default ResultsItem;