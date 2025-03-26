import { Box, Button } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import ResultsList from "../components/ResultsList";
import theme from "../theme";
import { fetchSavedAlbums, fetchSavedEpisodes, fetchSavedTracks } from "../api/spotifyApi";
import AuthService from "../utils/auth";

const Homepage: FC = () => {
    console.log("Rendering Homepage");
    const [listData, setListData] = useState<Array<any>>([]);

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
            <TextInput label={'Search'}/>
            <ResultsList data={listData}/>
        </Box>
    )
}

export default Homepage;