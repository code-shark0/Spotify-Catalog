// List of ResultsItems.
// TODO: Add list functionality

import { Box } from "@mui/material";
import React, { FC, useEffect, useState } from "react";

interface ResultsListProps {
    data: Array<any>; // Todo: find and add a proper type for this
}

type ListItem = {
    image: {height: number, width: number, url: string};
    name: string;
    type: string;
    genre: string;
}
// picture of artwork, name, genere, type

// Results list that displays all catalog items filtered by a search
// The data coming in is assumed to be an aggregated superset of all the users saved albums, tracks, and episodes
const ResultsList: FC<ResultsListProps> = ({data}) => {
    const [listData, setListData] = useState<Array<ListItem>>([]);

    useEffect(() => {
        setListData(data.map(item => {return {
            image: item?.type === "track" ? item?.album?.images?.[2] : item?.images?.[2], 
            name: item?.name, 
            type: item?.type, 
            genre: item?.genres?.[0]}}));
    }, [data]);

    console.log(data, listData);

    return (
        <Box>
            {/* {data.map(item => <ResultsItem key={item?.id} item={item}/>)} */}
        </Box>
    )
}

export default ResultsList;
