import { Box, Button, TextField } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import ResultsList from "../components/ResultsList";
import theme from "../theme";
import { fetchAllItems } from "../api/spotifyApi";
import AuthService from "../utils/auth";
import { ListItem } from "../models/model";

const Homepage: FC = () => {
    const [listData, setListData] = useState<Array<ListItem>>([]);
    const [filteredData, setFilteredData] = useState<Array<any>>([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const loadContent = async () => {
            const items: Array<any> = await fetchAllItems();
            setListData(items);
        }

        loadContent();
    }, []);

    useEffect(() => {
        const filteredData = listData.filter(item => {
            return (
                item?.name?.toLowerCase().includes(searchValue?.toLowerCase()) || 
                item?.type?.toLowerCase().includes(searchValue?.toLowerCase())
            );
        });
        setFilteredData(filteredData);
    }, [searchValue, listData]);

    const handleLogoutClick = () => {
        AuthService.logout();
    }

    return (
        <Box
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'start',
                alignItems: 'center', 
                height: '100vh', 
                width: '100vw',
                gap: '1rem',
            }}
        >
            <Box sx={{
                width: '100vw', 
                height: '64px', 
                backgroundColor: theme.palette.primary.dark

            }}>
                <Button variant="contained" color="secondary" onClick={handleLogoutClick}>
                    Logout
                </Button>
            </Box>
            <TextField variant={"outlined"} label={'Search'} onChange={(e) => setSearchValue(e.target.value)}/>
            <ResultsList data={filteredData}/>
        </Box>
    )
}

export default Homepage;