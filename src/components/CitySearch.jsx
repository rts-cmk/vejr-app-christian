import { useEffect, useState } from 'react';

export default function CitySearch() {
	const API_KEY = import.meta.env.VITE_API_KEY;
	const API_URL = import.meta.env.VITE_GEO_API_URL;
	const [city, setCity] = useState(null);

	const url = new URL(API_URL);

	url.get(lat, lon, (appid = { API_KEY }));

	useEffect(() => {
		const cityData = async (city) => {
			const URL = API_URL;
			const response = await fetch(URL);
			const data = response.json();
		};
	}, [city]);
}
