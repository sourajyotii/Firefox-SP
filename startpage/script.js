"use strict"

/* Time and Greetings */
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


/* Search */
const Brave = {
	name: "Brave",
	url: "https://search.brave.com/search?q=",
	icon: "https://cdn.icon-icons.com/icons2/2699/PNG/512/brave_logo_icon_167780.png",
};

const DuckDuckGo = {
	name: "DuckDuckGo",
	url: "https://www.duckduckgo.com/",
	icon: "https://cdn3.iconfinder.com/data/icons/social-media-special/256/duckduckgo-512.png",
};

const Google = {
	name: "Google",
	url: "https://www.google.com/search?q=",
	icon: "https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-512.png",
};

const YouTube = {
	name: "YouTube",
	url: "https://www.youtube.com/results?search_query=",
	icon: "https://cdn1.iconfinder.com/data/icons/logotypes/32/youtube-512.png",
};

let engUrl = "";
let engName = "";

function showDropdown() {
	document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
	if (!event.target.matches('#selectIcon')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}

function changeSearchEngine(selectedOption) {
	engUrl = eval(selectedOption).url;
	engName = eval(selectedOption).name;
	const inputBox = document.getElementById("web-search");
	inputBox.setAttribute("placeholder", `Search with ${engName}`);
	document.getElementById("selectIcon").src = eval(selectedOption).icon;
}

function webSearch() {
	const query = document.getElementById("web-search").value;
	window.location.href = (`${engUrl}${query}`);
}

function searchSettings() {
	document.getElementById("search-button").addEventListener("click", webSearch);
	document.getElementById("web-search").addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			event.preventDefault();
			document.getElementById("search-button").click();
		}
	});
}


/* Weather */
function weatherBallon(cityID) {
	var key = '4d8fb5b93d4af21d66a2948710284366';
	fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + key)
		.then(function (resp) { return resp.json() })
		.then(function (data) {
			let celcius = Math.round(parseFloat(data.main.temp) - 273.15);
			document.getElementById('description').innerHTML = data.weather[0].description;
			document.getElementById("wicon").src = getIcon(data.weather[0].icon);
			document.getElementById('temp').innerHTML = celcius + '&deg;';
			document.getElementById('location').innerHTML = data.name;
		});
}

function getIcon(icon) {
	const icon_url = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
	return icon_url;
}


/* Main */
window.onload = function () {
	clock();
	greetings();
	searchSettings();
	changeSearchEngine("Brave")
	weatherBallon(1275004);
}



























