import { Box } from "@mui/material";
import React, { FC, useEffect } from "react";
import TextInput from "../components/TextInput";
import ResultsList from "../components/ResultsList";
import theme from "../theme";
import { fetchSavedAlbums } from "../api/spotifyApi";

const Homepage: FC = () => {
    useEffect(() => {
        const loadAlbums = async () => {
            const albums = await fetchSavedAlbums();
            console.log(albums);
        }

        loadAlbums();
    }, [])

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
                {/* <LogoutButton/> */}
            </Box>
            <TextInput label={'Search'}/>
            <ResultsList/>
        </Box>
    )
}

export default Homepage;