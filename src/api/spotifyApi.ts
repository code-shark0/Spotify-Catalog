export const fetchSavedAlbums = async () => {
	return await fetchItems("https://api.spotify.com/v1/me/albums");
};

export const fetchSavedTracks = async () => {
    return await fetchItems("https://api.spotify.com/v1/me/tracks");
}

export const fetchSavedEpisodes = async () => {
    return await fetchItems("https://api.spotify.com/v1/me/episodes");
}

// TODO add parallelization and pagination

const fetchItems = async (url: string) => {
    const accessToken = localStorage.getItem("access_token");
	if (!accessToken) {
		console.error("No access token found");
		return [];
	}

	try {
		const response = await fetch(url, {
			method: "GET",
			headers: { Authorization: `Bearer ${accessToken}` },
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		return data.items; // Each item contains album details
	} catch (error) {
		console.error("Error fetching saved albums:", error);
		return [];
	}
}