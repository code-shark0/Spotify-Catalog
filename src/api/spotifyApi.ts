import { ListItem } from "../models/model";

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

	const artistIds: Set<string> = new Set();
	data.flatMap(item => item.items).forEach(item => {
		if (item.album) {
			item.album.artists.forEach((artist: { id: string }) => artistIds.add(artist.id));
		} else if (item.track) {
			item.track.artists.forEach((artist: { id: string }) => artistIds.add(artist.id));
		}
	});

	const artistGenres = await fetchArtistsGenres(Array.from(artistIds));

	const finalData: Array<ListItem | null> = data.flatMap(item => item.items).map(item => {
		let genres: Array<string> = [];
		if (Object.keys(item).includes('album')){
			genres = item.album.artists.flatMap((artist: { id: string }) => artistGenres[artist.id] || []);
			return {
				image: item?.album?.images?.[2] ?? item?.album?.images?.[1] ?? item?.album?.images?.[0] ?? null,
				name: item?.album?.name,
				type: item?.album?.type,
				genres,
			}
		} else if (Object.keys(item).includes('track')){
			genres = item.track.artists.flatMap((artist: { id: string }) => artistGenres[artist.id] || []);
			return {
				image: item?.track?.album?.images?.[2] ?? item?.track?.album?.images?.[1] ?? item?.track?.album?.images?.[0] ?? null, 
				name: item?.track?.name,
				type: item?.track?.type,
				genres,
			}
		} else if (Object.keys(item).includes('episode')){
			return {
				image: item?.episode?.images?.[2] ?? item?.episode?.images?.[1] ?? item?.episode?.images?.[0] ?? null, 
				name: item?.episode?.name,
				type: item?.episode?.type,
				genres: ['N/A'],
			}
		} else {
			console.error('unexpected object');
			return null;
		}
	})
	return finalData.filter(item => item !== null) as Array<ListItem>;
}

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
		return data;
	} catch (error) {
		console.error("Error fetching saved albums:", error);
		return [];
	}
}

const fetchArtistsGenres = async (artistIds: string[]) => {
	if (artistIds.length === 0) return {};

	const accessToken = localStorage.getItem("access_token");
	if (!accessToken) {
		console.error("No access token found");
		return {};
	}

	// Spotify API allows up to 50 artists in a single request
	const chunkSize = 50;
	const genreMap: Record<string, string[]> = {};

	try {
		for (let i = 0; i < artistIds.length; i += chunkSize) {
			const chunk = artistIds.slice(i, i + chunkSize);
			const url = `https://api.spotify.com/v1/artists?ids=${chunk.join(",")}`;
			const response = await fetch(url, {
				method: "GET",
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

			const data = await response.json();
			data.artists.forEach((artist: { id: string; genres: string[] }) => {
				genreMap[artist.id] = artist.genres;
			});
		}
	} catch (error) {
		console.error("Error fetching artist genres:", error);
	}

	return genreMap;
};