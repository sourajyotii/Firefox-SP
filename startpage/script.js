"use strict"

function greetings() {
	let currentDate = new Date();
	let hour = currentDate.getHours();

	if (hour < 6 && hour >= 0) {
		document.getElementById("time-greeting").textContent = "It's too late, take some sleep";
	}
	else if (hour < 9 && hour >= 6) {
		document.getElementById("time-greeting").textContent = "Good morning :)";
	}
	else if (hour < 12 && hour >= 9) {
		document.getElementById("time-greeting").textContent = "Have a good day";
	}
	else if (hour < 15 && hour >= 12) {
		document.getElementById("time-greeting").textContent = "Hi there!";
	}
	else if (hour < 18 && hour >= 15) {
		document.getElementById("time-greeting").textContent = "Good afternoon";
	}
	else if (hour < 20 && hour >= 18) {
		document.getElementById("time-greeting").textContent = "Good evening :)";
	}
	else {
		document.getElementById("time-greeting").textContent = "I hope you've had a fantastic day";
	}
}

function getSuffix(day) {
	let suffix = day % 10;

	if (suffix == 1 && suffix != 11) return "st";
	else if (suffix == 2 && suffix != 12) return "nd";
	else if (suffix == 3 && suffix != 13) return "rd";
	else return "th";
}

function clock() {
	let currentDate = new Date();
	let hour = currentDate.getHours();
	let minute = currentDate.getMinutes();
	let seconds = currentDate.getSeconds();
	let day = currentDate.getDay();
	let month = currentDate.getMonth();
	let dayOfMonth = currentDate.getDate();

	let suffix = getSuffix(dayOfMonth);

	const daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	]



	if (hour < 10) hour = `0${hour}`;
	if (minute < 10) minute = `0${minute}`;
	if (seconds < 10) seconds = `0${seconds}`;


	let currentTime = `${daysOfWeek[day]}, ${months[month]} ${dayOfMonth}${suffix}, ${hour}:${minute}:${seconds}`

	document.getElementById("clock").textContent = currentTime;

	setTimeout(function () {
		clock();
	}, 1000);
}

function webSearch() {
	const selectedOption = document.getElementById("search-options").value;
	const query = document.getElementById("web-search").value;

	if (selectedOption === "brave")
		window.location.href = (`https://search.brave.com/search?q=${query}`);
	else if (selectedOption === "duckduckgo")
		window.location.href = (`https://www.duckduckgo.com/${query}`);
	else if (selectedOption === "google")
		window.location.href = (`https://www.google.com/search?q=${query}`);
}

function searchSettings() {
	const searchButton = document.getElementById("search-button").addEventListener("click", webSearch);
	const inputBox = document.getElementById("web-search");
	const selectedOption = document.getElementById("search-options").value;
	let selector = document.getElementById("search-options");

	selector.addEventListener("change", () => {
		switch (selector.value) {
			case "brave":
				inputBox.setAttribute("placeholder", `Search with Brave`);
				break;
			case "duckduckgo":
				inputBox.setAttribute("placeholder", `Search with DuckDuckGo`);
				break;
			case "google":
				inputBox.setAttribute("placeholder", `Search with Google`);
				break;
		}
	});

	inputBox.addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			event.preventDefault();
			document.getElementById("search-button").click();
		}
	});
}

function weatherBallon(cityID) {
	var key = '4d8fb5b93d4af21d66a2948710284366';
	fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + key)
		.then(function (resp) { return resp.json() })
		.then(function (data) {
			let celcius = Math.round(parseFloat(data.main.temp) - 273.15);
			document.getElementById('description').innerHTML = data.weather[0].description;
			document.getElementById('temp').innerHTML = celcius + '&deg;';
			document.getElementById('location').innerHTML = data.name;
		});
}

window.onload = function () {
	clock();
	greetings();
	searchSettings();
	weatherBallon( 1275004 );
}



























