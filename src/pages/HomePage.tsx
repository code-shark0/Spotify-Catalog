import { Box, Button, TextField } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import ResultsList from "../components/ResultsList";
import theme from "../theme";
import { fetchSavedAlbums, fetchSavedEpisodes, fetchSavedTracks } from "../api/spotifyApi";
import AuthService from "../utils/auth";

const Homepage: FC = () => {
    console.log("Rendering Homepage");
    const [listData, setListData] = useState<Array<any>>([]);
    const [filteredData, setFilteredData] = useState<Array<any>>([]);
    const [searchValue, setSearchValue] = useState('');

    console.log(searchValue);

    useEffect(() => {
        const loadContent = async () => {
            const albums: Array<any> = await fetchSavedAlbums();
            const tracks: Array<any> = await fetchSavedTracks();
            const episodes: Array<any> = await fetchSavedEpisodes();
            setListData([
                ...albums?.map(album => album?.album), 
                ...tracks?.map(album => album?.track),
                ...episodes?.map(album => album?.episode),
            ]);
        }

        loadContent();
    }, []);

    useEffect(() => {
        const filteredData = listData.filter(item => {
            return (
                item?.name?.toLowerCase().includes(searchValue?.toLowerCase()) || 
                item?.type?.toLowerCase().includes(searchValue?.toLowerCase()) ||
                item?.genere?.toLowerCase().includes(searchValue?.toLowerCase()) ||
                (item?.artists ?? []).some((artist: any) => 
                    artist?.name?.toLowerCase().includes(searchValue?.toLowerCase())
                ) ||
                item?.album?.name?.toLowerCase().includes(searchValue?.toLowerCase()) ||
                item?.track?.name?.toLowerCase().includes(searchValue?.toLowerCase()) ||
                item?.episode?.name?.toLowerCase().includes(searchValue?.toLowerCase())
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