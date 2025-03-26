export const fetchSavedAlbums = async () => {
	const accessToken = localStorage.getItem("access_token");
	if (!accessToken) {
		console.error("No access token found");
		return [];
	}

	try {
		const response = await fetch("https://api.spotify.com/v1/me/albums", {
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
};

