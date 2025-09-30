import { useState, useEffect } from 'react';
// API key
const API_KEY = import.meta.env.VITE_API_KEY;

const weatherIcons = import.meta.env.VITE_WEATHER_ICON_URL;

export default function WeatherComponent() {
	const [weatherData, setWeatherData] = useState(null);
	const [city, setCity] = useState('roskilde');
	const [inputValue, setInputValue] = useState('');
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchWeatherData = async (cityName) => {
			try {
				const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
				const response = await fetch(URL);
				const data = await response.json();
				setWeatherData(data);
				console.log(data);
			} catch (error) {
				console.log(error);
				setError('By ikke fundet');
				setWeatherData(null);
			}
		};
		fetchWeatherData(city);
	}, [city]);

	function handleSearch() {
		if (inputValue.trim()) {
			setCity(inputValue.trim());
		}
	}

	function keyPressSearch(event) {
		if (event.key === 'Enter') {
			handleSearch();
		}
	}

	const appStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: 'fit-content',
		border: '2px solid grey',
		borderRadius: '5px',
		height: '50vh',
		padding: '20px',
		backgroundColor: 'lightblue',
		margin: '0 auto'
	};

	const inputStyle = {
		width: '50%',
		margin: '5px 0'
	};

	return (
		<>
			<div style={appStyle}>
				<h1>Søg efter by for vejrudsigt</h1>
				<input
					type="text"
					value={inputValue.toLowerCase()}
					onChange={(event) => setInputValue(event.target.value)}
					onKeyDown={keyPressSearch}
					style={inputStyle}
				/>
				<button onClick={handleSearch} style={inputStyle}>
					Søg
				</button>
				<h2>{inputValue.charAt(0).toUpperCase() + inputValue.slice(1)}</h2>
				<p>Temperaturen er {Math.round(weatherData?.main.temp)}℃</p>
				<p>Føles som {Math.round(weatherData?.main.feels_like)}℃</p>
			</div>
			<div>
				<h2>{error}</h2>
			</div>
		</>
	);
}
