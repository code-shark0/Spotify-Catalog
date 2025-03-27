export const fetchAllItems = async () => {
	// Get the albums, tracks, and episodes. 
	// Using this data, get the artist IDs.
	// Using the artist IDs, get the generes.
	// Filter down the data to only include an image, name, type, and generes
	// Return the data.
	const endpoints = [
		'https://api.spotify.com/v1/me/albums',
		'https://api.spotify.com/v1/me/tracks',
		'https://api.spotify.com/v1/me/episodes',
	];

	const data = await Promise.all(endpoints.map(endpoint => fetchItems(endpoint)));
	interface ListItem {
		image: {height: number, width: number, url: string};
		name: string;
		type: string;
		genres: Array<string>;
	}
	const finalData: Array<ListItem | null> = data.flatMap(item => item.items).map(item => {
		if (Object.keys(item).includes('album')){
			return {
				image: item?.album?.images?.[2], 
				name: item?.album?.name,
				type: item?.album?.type,
				genres: [] as Array<string>,
			}
		} else if (Object.keys(item).includes('track')){
			return {
				image: item?.track?.album?.images?.[2], 
				name: item?.track?.name,
				type: item?.track?.type,
				genres: [] as Array<string>,
			}
		} else if (Object.keys(item).includes('episode')){
			return {
				image: item?.episode?.images?.[2], 
				name: item?.episode?.name,
				type: item?.episode?.type,
				genres: [] as Array<string>,
			}
		} else {
			console.error('unexpected object');
			return null;
		}
	})
	console.log(data, finalData);
	return finalData;
}

// export const fetchSavedAlbums = async () => {
// 	// return await fetchItemsWithGenres();
// };

// export const fetchSavedTracks = async () => {
//     return await fetchItems("https://api.spotify.com/v1/me/tracks");
// }

// export const fetchSavedEpisodes = async () => {
//     return await fetchItems("https://api.spotify.com/v1/me/episodes");
// }

// export const fetchGeneresFromArtistIds = async (artistIds: string[]) => {
// 	const accessToken = localStorage.getItem("access_token");
// 	if (!accessToken) {
// 		console.error("No access token found");
// 		return [];
// 	}

// 	try {
// 		const endpoint = "https://api.spotify.com/v1/artists?ids=" + artistIds.join(",");
// 		const response = await fetch(endpoint, {
// 			method: "GET",
// 			headers: { Authorization: `Bearer ${accessToken}` },
// 		});

// 		if (!response.ok) {
// 			throw new Error(`HTTP error! Status: ${response.status}`);
// 		}

// 		const data = await response.json();
// 		const artistIds = [
// 			...new Set(data.items.flatMap((item: any) => item.album?.artists.map((artist: any) => artist.id)))
// 		]
// 		console.log(artistIds);

// 		if(artistIds.length > 0) {
// 			const artistData = await fetchGeneresFromArtistIds(artistIds as string[]); // Todo: Add a check to verify that artistIds are formatted correctly.
// 			console.log(artistData);
// 		}
		
// 		return data.items; // Each item contains album details
// 	} catch (error) {
// 		console.error("Error fetching saved albums:", error);
// 		return [];
// 	}
// 	// return await fetchItemsWithGenres("https://api.spotify.com/v1/artists?ids=" + artistIds.join(","));
// }

// TODO add parallelization and pagination

// const fetchItemsWithGenres = async (url: string) => {
//     const accessToken = localStorage.getItem("access_token");
// 	if (!accessToken) {
// 		console.error("No access token found");
// 		return [];
// 	}

// 	try {
// 		const response = await fetch(url, {
// 			method: "GET",
// 			headers: { Authorization: `Bearer ${accessToken}` },
// 		});

// 		if (!response.ok) {
// 			throw new Error(`HTTP error! Status: ${response.status}`);
// 		}

// 		const data = await response.json();
// 		const artistIds = [
// 			...new Set(data.items.flatMap((item: any) => item.album?.artists.map((artist: any) => artist.id)))
// 		]
// 		console.log(artistIds);

// 		if(artistIds.length > 0) {
// 			const artistData = await fetchGeneresFromArtistIds(artistIds as string[]); // Todo: Add a check to verify that artistIds are formatted correctly.
// 			console.log(artistData);
// 		}
		
// 		return data.items; // Each item contains album details
// 	} catch (error) {
// 		console.error("Error fetching saved albums:", error);
// 		return [];
// 	}
// }

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
		console.log(data);
		return data; // Each item contains album details
	} catch (error) {
		console.error("Error fetching saved albums:", error);
		return [];
	}
}