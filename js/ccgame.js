const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo, Democratic Republic of the",
  "Congo, Republic of the",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor (Timor-Leste)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

// Convert the list of countries to lowercase for case-insensitive comparison
const lowerCaseCountries = countries.map((country) => country.toLowerCase());

let timeLeft = 120;
let score = 0;
let guessedCountries = [];
let timer;

const timerElement = document.getElementById("timer");
const countryInput = document.getElementById("country-input");
const resultsElement = document.getElementById("results");
const submitButton = document.getElementById("submit");
const playAgainButton = document.getElementById("play-again");
const highScoreElement = document.getElementById("high-score");

// Retrieve the high score from local storage
let highScore = localStorage.getItem("highScore") || 0;
highScoreElement.textContent = `High Score: ${highScore}`;

// Function to start the timer
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time left: ${timeLeft} seconds`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// Function to handle the submission of a country
function submitCountry() {
  const countryName = countryInput.value.trim().toLowerCase(); // Convert input to lowercase

  if (
    countryName &&
    lowerCaseCountries.includes(countryName) &&
    !guessedCountries.includes(countryName)
  ) {
    score++;
    guessedCountries.push(countryName);
    updateResults();
  } else if (countryName) {
    const incorrectCountryElement = document.createElement("div");
    incorrectCountryElement.textContent = `Incorrect: ${countryName}`;
    incorrectCountryElement.className = "incorrect-country";
    resultsElement.appendChild(incorrectCountryElement);
  }

  countryInput.value = "";
}

// Function to update the results (sorted list of correct answers)
function updateResults() {
  resultsElement.innerHTML = ""; // Clear current results
  guessedCountries.sort(); // Sort the guessed countries alphabetically

  guessedCountries.forEach((country) => {
    const correctCountryElement = document.createElement("div");
    const originalCountryName = countries[lowerCaseCountries.indexOf(country)];
    correctCountryElement.textContent = originalCountryName;
    correctCountryElement.className = "correct-country";
    resultsElement.appendChild(correctCountryElement);
  });
}

// Function to end the game
function endGame() {
  countryInput.disabled = true;
  submitButton.disabled = true;
  playAgainButton.style.display = "inline-block";

  // Update high score if necessary
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreElement.textContent = `High Score: ${highScore}`;
  }

  timerElement.textContent = `Time's up! You scored ${score} points.`;

  displayMissedCountries();
}

// Function to display the missed countries
function displayMissedCountries() {
  const missedCountries = lowerCaseCountries.filter(
    (country) => !guessedCountries.includes(country)
  );
  missedCountries.sort(); // Sort the missed countries alphabetically

  missedCountries.forEach((country) => {
    const missedCountryElement = document.createElement("div");
    const originalCountryName = countries[lowerCaseCountries.indexOf(country)];
    missedCountryElement.textContent = `Missed: ${originalCountryName}`;
    missedCountryElement.className = "incorrect-country";
    resultsElement.appendChild(missedCountryElement);
  });
}

// Function to reset the game
function resetGame() {
  timeLeft = 120;
  score = 0;
  guessedCountries = [];
  resultsElement.innerHTML = "";
  countryInput.disabled = false;
  submitButton.disabled = false;
  playAgainButton.style.display = "none";
  timerElement.textContent = `Time left: ${timeLeft} seconds`;
  countryInput.value = "";
  countryInput.focus();
  startTimer();
}

// Add event listeners
submitButton.addEventListener("click", submitCountry);
countryInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    submitCountry();
  }
});
playAgainButton.addEventListener("click", resetGame);

// Start the game
startTimer();
