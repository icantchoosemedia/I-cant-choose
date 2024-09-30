## Movie Details API

At "I Can't Choose," we use an API to fetch detailed information about movies to help you make the best choices. This API plays a crucial role in providing up-to-date movie details, ensuring you have all the information you need when browsing through our recommendations.

### **How the Movie Details API Works**

The Movie Details API allows us to retrieve information such as:
- **Title**: The name of the movie
- **Release Year**: The year the movie was released
- **Genres**: Categories that the movie belongs to, such as Action, Comedy, Drama, etc.
- **Synopsis**: A brief description of the movie's plot
- **Director and Cast**: The director and key actors involved in the movie
- **Ratings**: The overall rating from popular sources (e.g., IMDb, Rotten Tomatoes)
- **Runtime**: The length of the movie in minutes
- **Trailers and Images**: Links to trailers and images associated with the movie

### **Why We Use This API**

The Movie Details API enables us to:
- Provide a comprehensive overview of each movie
- Ensure our movie recommendations are accurate and informative
- Offer users an engaging experience by displaying key details like ratings, cast, and trailers

### **How We Integrate the API**

We have written JavaScript code that interacts with the API to:
1. Send requests based on user searches or selections.
2. Retrieve data in JSON format from the API endpoint.
3. Display the movie details dynamically on our website.

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Movie Recommendation App</title>
  <style>
    /* CSS Styles */
    .preference-container {
      display: flex;
      flex-direction: column;
	align-items: center; /* Center items horizontally */
      gap: 10px;
    }
	
	  .streaming-options-container {
    background-color: #1f1f1f; /* Darker color complimenting #282828 */
    border-radius: 0 0 0 7px; /* Rounded corners at the bottom left and right */
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Box shadow at the bottom */
    border: 2px solid #333; /* Top thick border */
	 padding: 10px 5px 10px 5px; /* top right bottom left */
	 width: -webkit-fill-available;
	  }
	  
	  @media (min-width: 768px) {
    .streaming-options-container {
	border-radius: 0 0 10px 10px; /* Rounded corners at the bottom left and right */
	box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
}
	
	#plotContainer {
    background-color: #1f1f1f; /* Darker color complimenting #282828 */
    padding: 10px;
    border-radius: 0 0 7px 5px; /* Rounded corners at the bottom left and right */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Box shadow at the bottom */
    border: 2px solid #333; /* Top thick border */
  }
  
    .preference-container button {
      padding: 10px 20px;
      font-size: 13px; /* Modified font size */
      font-weight: bold; /* Added font weight */
      background-color: #282828; /* Change background color to a darker grey */
      color: white; /* Changed text color to white */
      width: 180px;
	  height: 40px;
      transition: background-color 0.3s;
      border-radius: 10px; /* Modified border radius */
     /* box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);*/
    }

    /* Hover effect */
    .preference-container button:hover {
      background-color: lightgray; /* Change background color on hover */
    }
	
	/* Media query for mobile devices */
@media (max-width: 768px) {
  .preference-container button {
    padding: 8px 16px; /* Reduce padding by 30% */
    font-size: 9x; /* Reduce font size by 30% */
    width: 140px; /* Reduce button width by 30% */
  }
}

    #getRecommendationsBtn {
      padding: 10px 20px;
      font-size: 19px;
      font-weight: bold;
      background-color: #282828; /* Change background color to a darker grey */
      color: white;
      width: 200px;
      transition: background-color 0.3s;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }

    #getRecommendationsBtn:hover {
      background-color: #444; /* Darken the background color on hover */
    }

    #findAnotherMovieBtn {
      padding: 10px 20px;
      font-size: 19px;
      font-weight: bold;
      background-color: #282828; /* Change background color to a darker grey */
      color: white;
      width: 200px;
      transition: background-color 0.3s;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }

    #findAnotherMovieBtn:hover {
      background-color: #444; /* Darken the background color on hover */
    }
	
	        .modal {
            display: none; /* Hide modal by default */
            position: fixed;
            top: 0;
            left: 0;
            /*width: 100%;
            height: 100%;*/
            background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
            z-index: 1000; /* Ensure modal appears above other content */
        }

        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
           transform: translate(-50%, -50%);
            background-color: #000; /* Black background for modal content */
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Shadow effect */
        }
		
		@media (max-width: 767px) {
    .modal-content {
        width: 80%; /* Adjust the width as needed */
        max-width: 400px; /* Set a maximum width for smaller screens */
    }
}


    #movieRecommendation {
      color: white; /* Change text color to white */
    }

#movieRecommendationApp {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%; /* Default to 100% width for mobile */
    margin: 0 auto; /* Center the app */
}
	
@media (min-width: 768px) {
    #movieRecommendationApp {
        width: 65%; /* Set width to 80% for desktop */
    }
}

    .preference-container.genre-container {
      text-align: center; /* Center the text */
    }

    #progressBarContainer {
      width: 200px;
      height: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-top: 20px;
      overflow: hidden;
    }

#progressBar { 
  width: 0%;
  height: 100%;
  background-color: red; /* Change color to red */
  transition: width 0.3s;
}

    #recommendations {
      display: none;
    }
  </style>
</head>
<body>
<div id="movieRecommendationApp">
    <h2 style="color: white; font-weight: bold; text-align: center; padding-bottom: 10px;">Find A Movie</h2>
    <div class="preference-container genre-container" id="genreOptions" style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
        <h3 style="color: white; font-weight: bold; text-align: center; font-size: 14px; margin-top: 10px; text-align: center; padding-left: 0px;">What are you in the mood for?</h3>
        <div style="display: flex ;max-width: 600px;">
            <div style="flex: 1; margin-right: 0px;">
                <button onclick="setGenre('Action'); nextPreference()" style="margin-bottom: 5px;">Action</button>
                <button onclick="setGenre('Adventure'); nextPreference()" style="margin-bottom: 5px;">Adventure</button>
                <button onclick="setGenre('Comedy'); nextPreference()" style="margin-bottom: 5px;">Comedy</button>
                <button onclick="setGenre('Drama'); nextPreference()" style="margin-bottom: 5px;">Drama</button>
                <button onclick="setGenre('Horror'); nextPreference()" style="margin-bottom: 5px;">Horror</button>
				<button onclick="setGenre('Crime'); nextPreference()" style="margin-bottom: 5px;">Crime</button>
            </div>
            <div style="flex: 1; margin-left: 0px;">
                <button onclick="setGenre('Fantasy'); nextPreference()" style="margin-bottom: 5px;">Fantasy</button>
                <button onclick="setGenre('Romance'); nextPreference()" style="margin-bottom: 5px;">Romance</button>
                <button onclick="setGenre('Sci-Fi'); nextPreference()" style="margin-bottom: 5px;">Sci-Fi</button>
                <button onclick="setGenre('Thriller'); nextPreference()" style="margin-bottom: 5px;">Thriller</button>
                <button onclick="setGenre('Musical'); nextPreference()" style="margin-bottom: 5px;">Musical</button>
				<button onclick="setGenre('Biography'); nextPreference()" style="margin-bottom: 5px;">Biography</button>
            </div>
        </div>
		<button onclick="setRandomGenre(); nextPreference()" style="margin-top: 10px;">Surprise me</button>
    </div>
  
  <div class="preference-container" id="actionSubGenreOptions" style="display: none;">
    <div style="text-align: center;">
        <h3 style="color: white; font-weight: bold; text-align: center; margin-top: 10px; margin-bottom: 10px;">Action Sub Genre:</h3>
    </div>
    <button onclick="setActionSubGenre('Dinosaurs'); nextPreference()">Dinosaurs</button>
    <button onclick="setActionSubGenre('Explosions'); nextPreference()">Explosions</button>
</div>
  
<!-- <div class="preference-container" id="classicOptions" style="display: none;">
    <div style="text-align: center;">
        <h3 style="color: white; font-weight: bold; text-align: center; font-size: 14px; margin-top: 10px; margin-bottom: 10px;">Want a classic or something new?</h3>
    </div>
    <button onclick="setIsClassic(true); nextPreference()">A classic!</button>
    <button onclick="setIsClassic(false); nextPreference()">Something new</button>
	<button onclick="setRandomIsClassic(); nextPreference()">Don't mind</button>
</div> -->

<div class="preference-container" id="timeOptions" style="display: none;">
    <div style="text-align: center;">
        <h3 style="color: white; font-weight: bold; text-align: center; font-size: 12px; margin-top: 10px; margin-bottom: 10px;">How much time do you want to spending watching the movie?</h3>
    </div>
    <button onclick="setTimePreference('short'); nextPreference()">Nice and short</button>
    <button onclick="setTimePreference('medium'); nextPreference()">Couple of hours</button>
    <button onclick="setTimePreference('long'); nextPreference()">Give me an epic</button>
</div>

<div class="preference-container" id="ratingOptions" style="display: none;">
    <div style="text-align: center;">
        <h3 style="color: white; font-weight: bold; text-align: center; font-size: 14px; margin-top: 10px; margin-bottom: 10px;">Who's watching?</h3>
    </div>
		<button onclick="setRatingPreference('Family Friendly'); nextPreference()">All the family</button>
    <button onclick="setRatingPreference('Suitable for Teens'); nextPreference()">Teenagers</button>
    <button onclick="setRatingPreference('Adults Only'); nextPreference()">Adults</button>
</div>

<div class="preference-container" id="yearOptions" style="display: none;">
    <div style="text-align: center;">
        <h3 style="color: white; font-weight: bold; text-align: center; font-size: 14px; margin-top: 10px; margin-bottom: 10px;">How recent?</h3>
    </div>
	    <button onclick="setYearPreference('modern'); nextPreference()">Modern</button>	
	    <button onclick="setYearPreference('retro'); nextPreference()">Retro</button>
	    <button onclick="setYearPreference('vintage'); nextPreference()">Vintage</button>
		<button onclick="randomYearPreference()">Don't Mind</button> <!-- New button for Don't Mind option -->		
</div>
	
	<div class="preference-container" id="languageOptions" style="display: none;">
    <div style="text-align: center;">
        <h3 style="color: white; font-weight: bold; text-align: center; font-size: 14px; margin-top: 10px; margin-bottom: 10px;">Do you mind what language the movie is in?</h3>
    </div>
    <button onclick="setLanguagePreference('English'); nextPreference()"> English only</button>
    <button onclick="setLanguagePreference('Non-English'); nextPreference()">Don't mind!</button>
</div>

<!-- <div class="preference-container" id="animationOptions" style="display: none;">
  <div style="text-align: center;">
    <h3 style="color: white; font-weight: bold; text-align: center; font-size: 14px; margin-top: 10px; margin-bottom: 10px;">Finally, are you ok with an animated movie?</h3>
  </div>
  <button onclick="setIsAnimated(true); nextPreference()">Yes!</button>
  <button onclick="setIsAnimated(false); nextPreference()">Not this time</button>
  <button onclick="setRandomIsAnimated(); nextPreference()">Don't mind</button>
</div> -->


<div class="preference-container" id="streamingServicesOptions" style="display: none;">
    <div style="text-align: center;">
        <h3 style="color: white; font-weight: bold; text-align: center; font-size: 14px; margin-top: 10px; margin-bottom: 10px;">Which streaming services do you use?</h3>
    </div>
    <select id="streamingServices" multiple>
        <option value="Netflix">Netflix</option>
        <option value="Amazon Video">Amazon Video</option>
        <option value="Amazon Prime Video">Amazon Prime Video</option>
        <option value="Apple TV">Apple TV</option>
        <option value="Google Play Movies">Google Play Movies</option>
        <option value="Paramount Plus">Paramount Plus</option>
        <option value="Paramount+ Amazon Channel">Paramount+ Amazon Channel</option>
        <option value="Sky Store">Sky Store</option>
        <option value="Sky Go">Sky Go</option>
        <option value="YouTube">YouTube</option>
        <option value="Disney Plus">Disney Plus</option>
        <option value="Now TV Cinema">Now TV Cinema</option>
        <option value="dontMind">Don't mind/happy to buy</option>
    </select>
    <button onclick="setStreamingServicesPreference(); nextPreference()">Next</button>
</div>


<button onclick="getRecommendations()" id="getRecommendationsBtn" style="display: none; font-size: 14px; text-align: center; margin-top: 20px;">Get my recommendation</button>

<div id="recommendations">
<h3 style="color: white; font-weight: bold; text-align: center; font-size: 20px;">Recommended Movie</h3>
    <p id="movieRecommendation"></p>
    <div id="movieImage" style="display: none;">
      <img src="" alt="">
      <div id="streamingOptions" style="display: block;"></div>
    </div>
<button onclick="resetSelection()" style="background-color: #282828; color: white; padding: 10px 60px; border: none; border-radius: 5px; cursor: pointer; margin: auto; display: block; font-weight: bold;">Try again (with new preferences)</button>

  </div>
  <div id="progressBarContainer" style="display: none;">
    <div id="progressBar"></div>
  </div>

</body>
</html>

<script src="https://www.youtube.com/iframe_api"></script>

  <script type="text/javascript">
    var movieData = [];
	
	          // Define the isMobile function
                    function isMobile() {
                        return window.innerWidth <= 768; // Adjust breakpoint as needed
                    }

    function loadMovieData() {
      var csvFile = 'https://icantchoose.com/wp-content/movie_preferences21.csv';

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          parseMovieData(xhr.responseText);
          //displayDatabaseFound();
        } else {
          displayDatabaseNotFound();
        }
      };
      xhr.open('GET', csvFile, true);
      xhr.send();
    }

    function parseMovieData(csvContent) {
      var lines = csvContent.split('\n');
      var headers = lines[0].split(',');

      for (var i = 1; i < lines.length; i++) {
        var values = lines[i].split(',');
        var movie = {};

        for (var j = 0; j < headers.length; j++) {
          movie[headers[j]] = values[j];
        }

        movieData.push(movie);
      }
    }

    var preferredGenre = '';
	var preferredActionSubGenre = '';
    var isAnimated = null;
    var isClassic = null;
    var yearPreference = '';
    var languagePreference = '';
    var timePreference = '';
    var ratingPreference = '';

// Define constants for the year ranges
const currentYear = new Date().getFullYear();
const modern = [currentYear, currentYear - 14]; // Represents movies from 2010 to 2024
const retro = [currentYear - 15, currentYear - 44]; // Represents movies from 1980 to 2009
const vintage = [currentYear - 45, 0]; // Represents movies from 1979 and older


    function setGenre(genre) {
      preferredGenre = genre;
      console.log('Genre set to: ' + genre);
	   // Hide the "Select your movie preferences" header
  document.querySelector('h2').style.display = 'none';
    }
	
function setRandomGenre() {
var genres = ['Crime', 'Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Fantasy', 'Romance', 'Sci-Fi', 'Thriller', 'Musical'];
    var randomGenre = genres[Math.floor(Math.random() * genres.length)];
    setGenre(randomGenre);
}	
	
function setActionSubGenre(actionSubGenre) {
  preferredActionSubGenre = actionSubGenre;
  console.log('ActionSubGenre set to: ' + actionSubGenre);
}

function showActionSubGenre() {
  document.getElementById('genreOptions').style.display = 'none';
  document.getElementById('actionSubGenreOptions').style.display = 'block';
}
	

    function setIsAnimated(animated) {
      isAnimated = animated;
      console.log('Animation set to: ' + animated);
    }
	
function setRandomIsAnimated() {
    setIsAnimated(Math.random() < 0.5); // Set randomly to true or false with 50% probability
}	

   function setIsClassic(classic) {
      isClassic = classic;
      console.log('Classic set to: ' + classic);
    }
	
	function setRandomIsClassic() {
    setIsClassic(Math.random() < 0.5); // Set randomly to true or false with 50% probability
}

function setYearPreference(button) {
    switch (button) {
        case 'modern':
            yearPreference = modern;
            break;
        case 'retro':
            yearPreference = retro;
            break;
        case 'vintage':
            yearPreference = vintage;
            break;
        default:
            console.error('Invalid year preference button:', button);
            break;
    }
}

// Updated isMovieWithinYearRange function
function isMovieWithinYearRange(movieYear, yearRange) {
    return movieYear >= yearRange[1] && movieYear <= yearRange[0];
}

    function setLanguagePreference(language) {
      languagePreference = language;
      console.log('Language set to: ' + language);
    }

function setTimePreference(time) {
    switch (time) {
        case 'short':
            timePreference = { min: 0, max: 100 };
            break;
        case 'medium':
            timePreference = { min: 101, max: 150 };
            break;
        case 'long':
            timePreference = { min: 151, max: Infinity };
            break;
        default:
            console.error('Invalid time preference:', time);
            return;
    }
    console.log('Time set to:', time);
}

// Function to check if a movie falls within the specified time range
function isMovieWithinTimeRange(movieTime, timeRange) {
    return movieTime >= timeRange.min && movieTime <= timeRange.max;
}

function randomYearPreference() {
    // List of year preferences
    var yearPreferences = ['modern', 'retro', 'vintage'];
    
    // Select a random index from the list
    var randomIndex = Math.floor(Math.random() * yearPreferences.length);
    
    // Set the year preference based on the randomly selected index
    setYearPreference(yearPreferences[randomIndex]);
    
    // Call nextPreference to proceed further
    nextPreference();
}


    function setRatingPreference(rating) {
      ratingPreference = rating;
      console.log('Rating set to: ' + rating);
    }
	
	var streamingServicesPreference = [];

function setStreamingServicesPreference() {
    var selectedOptions = document.getElementById('streamingServices').selectedOptions;
    streamingServicesPreference = Array.from(selectedOptions).map(option => option.value);
    console.log('Selected Streaming Services:', streamingServicesPreference);
}

function nextPreference(){
    //if (preferredGenre === 'Action') {
     //   document.getElementById('genreOptions').style.display = 'none';
     //   document.getElementById('actionSubGenreOptions').style.display = 'block';
     if (preferredGenre !== '') {
        document.getElementById('genreOptions').style.display = 'none';
        document.getElementById('timeOptions').style.display = 'flex';
    }

	//if (preferredActionSubGenre !== '') {
 // document.getElementById('actionSubGenreOptions').style.display = 'none';
 // document.getElementById('classicOptions').style.display = 'flex';
//	}
		
     if (isClassic !== null) {
        document.getElementById('classicOptions').style.display = 'none';
        document.getElementById('timeOptions').style.display = 'flex';
		
    } if (timePreference !== '') {
        document.getElementById('timeOptions').style.display = 'none';
        document.getElementById('ratingOptions').style.display = 'flex';
		
    } if (ratingPreference !== '') {
        document.getElementById('ratingOptions').style.display = 'none';
        document.getElementById('yearOptions').style.display = 'flex';
		
    } if (yearPreference !== '') {
        document.getElementById('yearOptions').style.display = 'none';
        document.getElementById('languageOptions').style.display = 'flex';
		
    if (languagePreference !== '') {
        document.getElementById('languageOptions').style.display = 'none';
        document.getElementById('streamingServicesOptions').style.display = 'flex';
    }
	
	    if (streamingServicesPreference.length > 0) {
        document.getElementById('streamingServicesOptions').style.display = 'none';
        document.getElementById('getRecommendationsBtn').style.display = 'flex';
    }
		
    } //if (isAnimated !== null) {
      // document.getElementById('animationOptions').style.display = 'none';
     //   document.getElementById('getRecommendationsBtn').style.display = 'block';
    //}
}

function formatRuntime(minutes) {
    const totalMinutes = parseInt(minutes);
    if (isNaN(totalMinutes)) return "Unknown";
    
    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    return `${hours}h ${remainingMinutes}m`;
}

function getRecommendations() {
    console.log('Preferred Genre:', preferredGenre);
    console.log('Preferred Action Sub Genre:', preferredActionSubGenre);
    console.log('Is Animated:', isAnimated);
    console.log('Is Classic:', isClassic);
    console.log('Year Released:', yearPreference);
    console.log('Language:', languagePreference);
    console.log('Time:', timePreference);
    console.log('Rating:', ratingPreference);
    console.log('Streaming Service:', streamingServicesPreference);

    var recommendationsElement = document.getElementById('recommendations');
    if (recommendationsElement) {
        recommendationsElement.style.display = 'none';
    } else {
        console.error("Recommendations element not found.");
    }

    var matchedMovies = movieData.filter(function(movie) {
        var movieYear = parseInt(movie.Year);
        var movieTime = parseInt(movie.Time);
        console.log('Checking Movie:', movie);

        var actionSubGenre = movie.ActionSubGenre ? movie.ActionSubGenre.toLowerCase() : '';

        return (
            movie.Genre === preferredGenre &&
            (preferredActionSubGenre === '' || preferredActionSubGenre === undefined || actionSubGenre === preferredActionSubGenre.toLowerCase()) &&
            isMovieWithinYearRange(movieYear, yearPreference) &&
            movie.Language === languagePreference &&
            isMovieWithinTimeRange(movieTime, timePreference) &&
            movie.Rating.toLowerCase() === ratingPreference.toLowerCase() &&
            (movie.StreamingServices && Array.isArray(movie.StreamingServices) && movie.StreamingServices.includes(streamingService))
        );
    });

    console.log('Matched Movies:', matchedMovies);

    if (matchedMovies.length > 0) {
        var randomIndex = Math.floor(Math.random() * matchedMovies.length);
        var matchedMovie = matchedMovies[randomIndex];

        console.log('Recommended movie:', matchedMovie.Recommendation);
        document.getElementById('movieRecommendation').textContent = matchedMovie.Recommendation;

        var movieImageElement = document.getElementById('movieImage');
        if (movieImageElement) {
            movieImageElement.style.display = 'block';
        } else {
            console.error("Element with ID 'movieImage' not found.");
        }

        var tmdbOptions = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjEzMzI2NTUzZTY4MTQ4NGU5NjVhNTcxMjQ4MjE5ZiIsInN1YiI6IjY1YmFiZTNhZmQ3YWE0MDE4NDhjMzcwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nsOiKzy236oeJ9F0TAB1RiOfUtNl_jHwge2jZJsjpFc'
            }
        };

        fetch('https://api.themoviedb.org/3/movie/' + matchedMovie.MovieID + '?append_to_response=images', tmdbOptions)
            .then(response => response.json())
            .then(data => {
                let backdropURL;
                let posterURL;

                const backdrops = data.images.backdrops;
                const posters = data.images.posters;

                if (backdrops && backdrops.length > 0) {
                    const englishBackdrop = backdrops.find(backdrop => backdrop.iso_639_1 === 'en');
                    if (englishBackdrop) {
                        backdropURL = 'https://image.tmdb.org/t/p/original' + englishBackdrop.file_path;
                    } else {
                        backdropURL = 'https://image.tmdb.org/t/p/original' + backdrops[0].file_path;
                    }
                } else {
                    console.error("No backdrops found.");
                }

                if (posters && posters.length > 0) {
                    const englishPoster = posters.find(poster => poster.iso_639_1 === 'en');
                    if (englishPoster) {
                        posterURL = 'https://image.tmdb.org/t/p/original' + englishPoster.file_path;
                    } else {
                        posterURL = 'https://image.tmdb.org/t/p/original' + posters[0].file_path;
                    }
                } else {
                    console.error("No posters found.");
                }

                if (backdropURL) {
                    const movieBackdropElement = document.getElementById('movieBackdrop');
                    if (movieBackdropElement) {
                        movieBackdropElement.style.backgroundImage = 'url(' + backdropURL + ')';
                    } else {
                        console.error("Element with ID 'movieBackdrop' not found.");
                    }
                }

                if (posterURL) {
                    const moviePosterElement = document.getElementById('moviePoster');
                    if (moviePosterElement) {
                        moviePosterElement.src = posterURL;
                    } else {
                        console.error("Element with ID 'moviePoster' not found.");
                    }
                }

                fetch('https://api.themoviedb.org/3/movie/' + matchedMovie.MovieID + '/watch/providers', tmdbOptions)
                    .then(response => response.json())
                    .then(response => {
                        if (isMobile()) {
                            displayStreamingOptions(response);
                        } else {
                            displayStreamingOptionsDesktop(response);
                        }
                        displaySpokenLanguages(data);
                    })
                    .catch(err => console.error(err));

                var omdbAPIKey = 'e5d83f02';
                var omdbURL = 'https://www.omdbapi.com/?i=' + matchedMovie.IMDBID + '&apikey=' + omdbAPIKey;
                console.log('OMDB API Request URL:', omdbURL);
                fetch(omdbURL)
                    .then(response => {
                        console.log('OMDB API Response:', response);
                        return response.json();
                    })
                    .then(data => {
                        console.log('OMDB API Data:', data);

                        var recommendationElement = document.getElementById('movieRecommendation');
                        recommendationElement.innerHTML = `
                            <div style="background-color: #282828; 
            ${isMobile() ? 'border-radius: 10px;' : 'border-radius: 10px 10px 0 0;'} 
            ${isMobile() ? 'box-shadow: none;' : 'box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);'} 
            ${isMobile() ? 'width: 100%; text-align: center;' : ''}; 
            padding-bottom: 0px;">
                                ${isMobile() ? `
                                    <div style="text-align: center;">
									<img src="${backdropURL}" alt="Movie Poster" style="width: 100%; height: auto; margin-bottom: 0px; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges; border-top-left-radius: 10px; border-top-right-radius: 10px;">
									</div>` : ''}
                                <div id="MovieDetailsMobile" style="display: flex; ${isMobile() ? 'flex-direction: column; align-items: center; border: 5px solid #333; border-radius: 0 0 12px 12px;' : ''}">
                                    <div style="flex-shrink: 0; ${isMobile() ? 'margin-bottom: 0px;' : ''}">
                                        ${!isMobile() ? `
                                           <img src="${posterURL}" alt="Movie Poster" style="max-width: 400px; border: none; border-radius: 10px; margin-bottom: 1px; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3); height: auto; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;">
                                        ` : ''}
                                    </div>
                                    <div style="padding: ${isMobile() ? '0' : '25px'}; padding-top: ${isMobile() ? '10px' : '10px'};">
                                        <h3 style="color: white; font-weight: bold; font-size: ${isMobile() ? '24px' : '22px'}; margin-bottom: ${isMobile() ? '5px' : '10px'};">${data.Title}</h3>
                                        <button id="watchTrailerBtn" style="background-color: #282828; color: white; padding: 10px 10px; border: 4px solid white; border-radius: 5px; cursor: pointer; margin: ${isMobile() ? 'auto' : '0'}; display: block; font-weight: bold; margin-top: 5px; margin-bottom: ${isMobile() ? '20px' : '16px'};">Watch Trailer</button>
                                        ${isMobile() ? `
                                            <div style="display: flex; align-items: center; justify-content: center; margin-top: ${isMobile() ? '10px' : '20px'};">
                                                <div style="display: flex; align-items: center; margin-right: 10px;">
                                                    <img src="https://icantchoose.com/wp-content/uploads/2024/01/imdb-logo.png" alt="IMDb Logo" style="width: ${isMobile() ? '15px' : 'auto'}; height: ${isMobile() ? '15px' : '30px'}; margin-right: 5px;">
                                                    <span>${data.imdbRating}</span>
                                                </div>
                                                <div style="display: flex; align-items: center; margin-left: 10px;">
                                                    <img src="https://icantchoose.com/wp-content/uploads/2024/02/tomato-reduced-size.png" alt="Rotten Tomatoes Logo" style="width: ${isMobile() ? '15px' : 'auto'}; height: ${isMobile() ? '15px' : '30px'}; margin-right: 5px;">
                                                    <span>${data.Ratings.find(rating => rating.Source === 'Rotten Tomatoes').Value}</span>
                                                    <span style="margin: 0 10px; color: white; font-weight: bold; font-size: 14px;">${data.Rated}</span>
                                                    <span style="margin: 0 5px; color: white; font-weight: bold; font-size: 14px;">
    ${formatRuntime(data.Runtime)}
</span>
                                                </div>
                                            </div>
                                            <br>
											                    <!-- Plot Container Starts -->
                    <div id="plotContainer" style="text-align: center;">
                        <div style="display: block;">
							<div style="display: flex;">
   <!-- <span style="color: white; font-weight: bold; font-size: 10px;">Plot:</span> -->
    <span style="color: white; text-align: left; font-weight: bold; font-size: 13px; padding-left: 1px; padding-bottom: 10px; line-height: 1.0;">${data.Plot}</span>
</div>
<div style="display: flex; justify-content: flex-start;">
    <span style="color: white; font-weight: bold; font-size: 12px; padding-right: 3px; padding-left: 0px; padding-bottom: 2px;">Cast</span>
<span style="color: white; text-align: left; font-size: 12px; padding-bottom: 0px;">${data.Actors}</span>
</div>
<div style="display: flex; justify-content: flex-start;">
    <span style="color: white; font-weight: bold; font-size: 12px; padding-top: 0px; padding-left: 0px; padding-bottom: 2px;">Director</span><br>
    <span style="color: white; font-size: 12px; padding-left: 3px; padding-top: 0px; padding-bottom: 0px;">${data.Director}</span>
</div>
<div style="display: flex; justify-content: flex-start;">
    <span style="color: white; font-weight: bold; font-size: 12px; padding-right: 3px; padding-left: 0px; padding-bottom: 2px;">Languages</span><br>
    <div id="spokenLanguages" style="color: white; text-align: left; font-size: 12px; padding-bottom: 0px;"></div>
</div>
<div style="display: flex; justify-content: flex-start;">
    <span style="color: white; font-weight: bold; font-size: 12px; padding-right: 3px; padding-left: 0px; padding-bottom: 2px;">Awards</span><br>
    <span style="color: white; text-align: left; font-size: 12px; padding-bottom: 0px;">${data.Awards}</span>
</div>
                    <!-- Plot Container Ends -->
                                               <!-- <span style="color: white; font-weight: bold; font-size: 10px; padding-left: 5px;">Director: </span>
                                              <span style="color: white; font-weight: bold; font-size: 10px; padding-left: 0px; padding-bottom: 5px">${data.Director}</span><br>
                                              <span style="color: white; font-weight: bold; font-size: 10px; padding-left: 5px;">Actors: </span>
                                              <span style="color: white; font-weight: bold; font-size: 10px; padding-left: 0px; padding-bottom: 5px">${data.Actors}</span><br> -->
                                            </div>
                                        ` : `
                                            <span style="color: white; font-weight: bold; font-size: ${isMobile() ? '10px' : '16px'}; margin-top: ${isMobile() ? '10px' : '20px'};">Plot: </span>
                                            <span style="font-size: ${isMobile() ? '10px' : '16px'};">${data.Plot}</span><br>
                                            <br>
                                            <span style="color: white; font-weight: bold; font-size: ${isMobile() ? '10px' : '16px'};">Length: </span>
                                            <span style="font-size: ${isMobile() ? '10px' : '16px'};">${data.Runtime}</span><br>
                                            <br>
                                            <span style="color: white; font-weight: bold; font-size: ${isMobile() ? '10px' : '16px'};">Rated: </span>
                                            <span style="font-size: ${isMobile() ? '10px' : '16px'};">${data.Rated}</span><br>
                                            <br>
                                            <span style="color: white; font-weight: bold; font-size: ${isMobile() ? '10px' : '16px'};">Director: </span>
                                            <span style="font-size: ${isMobile() ? '10px' : '16px'};">${data.Director}</span><br>
                                            <br>
                                            <span style="color: white; font-weight: bold; font-size: ${isMobile() ? '10px' : '16px'};">Actors: </span>
                                            <span style="font-size: ${isMobile() ? '10px' : '16px'};">${data.Actors}</span><br>
                                            <br>
                                        `}
                                        <!-- Check if it's not a mobile device -->
                                        ${!isMobile() ? `
                                            <div style="display: flex; align-items: center; margin-top: 20px;">
                                                <img src="https://icantchoose.com/wp-content/uploads/2024/01/imdb-logo.png" alt="IMDb Logo" style="width: auto; height: 30px; margin-right: 10px;">
                                                ${data.imdbRating}
                                            </div>
                                            <div style="display: flex; align-items: center; margin-bottom: 20px;">
                                                <img src="https://icantchoose.com/wp-content/uploads/2024/02/tomato-reduced-size.png" alt="Rotten Tomatoes Logo" style="width: auto; height: 30px; margin-right: 10px;">
                                                ${data.Ratings.find(rating => rating.Source === 'Rotten Tomatoes').Value}
                                            </div>
                                        ` : ''}
                                        ${!isMobile() ? `
                                            <span style="color: white; font-weight: bold; font-size: ${isMobile() ? '10px' : '16px'};">Awards: </span>
                                            <span style="font-size: ${isMobile() ? '10px' : '16px'}; padding-bottom: 10px;">${data.Awards}</span>
                                            <br>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        `;

// Event listener for "Watch Trailer" button
document.getElementById('watchTrailerBtn').addEventListener('click', function() {
    // Retrieve trailer URL from matchedMovie object
    const trailerURL = matchedMovie.filmTrailer;

                            // Open modal with embedded trailer video
                            openModalWithTrailer(matchedMovie.filmTrailer);
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching data from OMDB API:', error);
                    });
            })
            .catch(err => console.error('Error fetching movie details and images from TMDB API:', err));

document.getElementById('recommendations').style.display = 'none';
document.getElementById('getRecommendationsBtn').style.display = 'none';
document.getElementById('progressBarContainer').style.display = 'block';
document.getElementById('progressBar').style.width = '0%';

        var progress = 0;
        var intervalId = setInterval(function() {
            progress += 20;
            document.getElementById('progressBar').style.width = progress + '%';

            if (progress >= 100) {
                clearInterval(intervalId);
                document.getElementById('progressBarContainer').style.display = 'none';
                document.getElementById('recommendations').style.display = 'block';
				
				// Set the width based on the device type
				recommendationsElement.style.width = isMobile() ? '100%' : '90%';

                // Check if it's a mobile device, then scroll to the specified position
                if (isMobile()) {
                    window.scrollTo({
                        top: 155, // Adjust this value to your preference
                        behavior: 'auto' // Optional: smooth scrolling behavior
                    });
                }
            }
        }, 500);
    } else {
        console.log('No recommendation found.');
        document.getElementById('movieRecommendation').textContent = 'No recommendation found';
        document.getElementById('movieRecommendation').style.textAlign = 'center';
        //document.getElementById('movieRecommendation').style.padding = '20px 0';
        document.getElementById('movieRecommendation').style.fontSize = '18px';
																		 

        var movieImageElement = document.getElementById('movieImage');
        if (movieImageElement) {
            movieImageElement.style.display = 'none';
        } else {
            console.error("Element with ID 'movieImage' not found.");
			   
        }
        document.getElementById('recommendations').style.display = 'block';
        document.getElementById('getRecommendationsBtn').style.display = 'none';
        document.getElementById('progressBarContainer').style.display = 'none';
    }
// Adding code to find a new movie with the same preferences
var findNewButton = document.createElement('button');
findNewButton.textContent = "Try again (with same preferences)";
findNewButton.id = "findNewButton";
findNewButton.style.backgroundColor = "#282828";
findNewButton.style.color = "white";
findNewButton.style.padding = "10px 60px";
findNewButton.style.border = "none";
findNewButton.style.borderRadius = "5px";
findNewButton.style.cursor = "pointer";
findNewButton.style.margin = "10px auto"; // Adjusted margin for centering and spacing
findNewButton.style.display = "block"; // Ensuring it's a block-level element
findNewButton.style.fontWeight = "bold";
findNewButton.onclick = function() {
    // Clear current recommendation
    document.getElementById('movieRecommendation').textContent = '';
    // Remove the previous button
    document.getElementById('findNewButton').remove();
    // Display progress bar
    document.getElementById('progressBarContainer').style.display = 'block';
    document.getElementById('progressBar').style.width = '0%';
    // Scroll to the top of the web page immediately
    window.scrollTo({
        top: 0,
        behavior: 'auto' // Scroll immediately without animation
    });
    // Call the function again to find a new recommendation
    getRecommendations();
    // Clear the appended options HTML for streaming options
    var streamingOptionsContainer = document.querySelector('.streaming-options-container');
    if (streamingOptionsContainer) {
        streamingOptionsContainer.innerHTML = '';
        streamingOptionsContainer.style.display = 'none'; // Hide the container
    }
};
// Remove any existing button with the same ID
var existingFindNewButton = document.getElementById('findNewButton');
if (existingFindNewButton) {
    existingFindNewButton.remove();
}
document.getElementById('recommendations').appendChild(findNewButton);
	}
 
function findNewMovieWithSamePreferences() {
  // Scroll to the top of the web page
  setTimeout(function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: smooth scrolling behavior
    });
  }, 100); // Adjust the delay time as needed

    // Reset the movie recommendation and hide the button
    document.getElementById('movieRecommendation').textContent = '';
    document.getElementById('findNewButton').style.display = 'none';

    // Clear the appended options HTML for streaming options
    var streamingOptionsContainer = document.querySelector('.streaming-options-container');
    if (streamingOptionsContainer) {
        streamingOptionsContainer.innerHTML = '';
        streamingOptionsContainer.style.display = 'none'; // Hide the container
    }

    // Clear the streaming options container
    var movieRecommendationElement = document.getElementById('movieRecommendation');
    if (movieRecommendationElement) {
        movieRecommendationElement.textContent = '';
    }

    // Display the progress bar
    document.getElementById('progressBarContainer').style.display = 'block';

    // Call getRecommendations again to find a new movie with the same preferences
    getRecommendations();
}

function displaySpokenLanguages(data) {
    // Get the container where you want to display the spoken languages
    var spokenLanguagesContainer = document.getElementById('spokenLanguages');

    // Log the spokenLanguagesContainer to check if it's null
    console.log("spokenLanguagesContainer:", spokenLanguagesContainer);

    // Clear any existing content in the container
    spokenLanguagesContainer.innerHTML = '';

    // Check if there are no spoken languages provided
    if (data.spoken_languages.length === 0) {
        // Display "English"
        var languageElement = document.createElement('span');
        languageElement.textContent = 'English';
        spokenLanguagesContainer.appendChild(languageElement);
    } else {
        // Iterate over the spoken languages array
        data.spoken_languages.forEach((language, index) => {
            // Create a new span element for each language
            var languageElement = document.createElement('span');
            // Set the text content of the span to the language name
            languageElement.textContent = language.english_name;
            // Append a comma and space if it's not the last language
            if (index !== data.spoken_languages.length - 1) {
                languageElement.textContent += ', ';
            }
            // Append the span to the spoken languages container
            spokenLanguagesContainer.appendChild(languageElement);
        });
    }
}

function openModalWithTrailer(trailerURL) {
    // Logging the trailer URL
    console.log('Trailer URL:', trailerURL);

    // Check if the trailer URL starts with "https://www.youtube.com/" and extract the video ID
    const videoId = extractYouTubeVideoId(trailerURL);

    if (videoId) {
        // Calculate the width and height based on the viewport width
        const viewportWidth = window.innerWidth;
        let width, height;
        if (viewportWidth <= 560) {
            // For mobile devices, set a wider width
            width = viewportWidth - 40; // Adjust according to your layout
            height = (width / 560) * 315; // Maintain aspect ratio
        } else {
            // For larger screens, maintain the original width
            width = 800;
            height = (315 / 560) * width; // Maintain aspect ratio
        }

        // If it's a valid YouTube URL, create modal HTML with embedded video
        const modalHTML = `
            <div class="modal" style="display: flex; justify-content: center; align-items: center; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5);">
                <div class="modal-content" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                    <iframe width="${width}" height="${height}" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    <button style="position: absolute; top: 10px; right: 10px; border: 1px solid grey; border-radius: 5px; padding: 5px; color: red; font-weight: bold;" onclick="closeModal()">X</button>
                </div>
            </div>
        `;

        // Append modal HTML to the document body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        console.log('Modal added to the DOM');

        // Add event listener to close modal when clicking outside of it
        const modal = document.querySelector('.modal');
        modal.addEventListener('click', function (event) {
            if (event.target.classList.contains('modal')) {
                closeModal();
            }
        });
    } else {
        // If the URL is invalid, log an error message
        console.error('Invalid trailer URL:', trailerURL);
        // You can also display an error message to the user here
    }
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
        console.log('Modal removed from the DOM');
    }
}

function extractYouTubeVideoId(url) {
    const match = url.match(/[?&]v=([^#\&\?\/]+)/);
    if (match && match[1]) {
        console.log('Extracted video ID:', match[1]);
        return match[1];
    } else {
        console.error('Invalid YouTube URL:', url);
        return null;
    }
}

function resetSelection() {
  // Reset preference variables
  preferredGenre = '';
  isAnimated = null;
  isClassic = null;
  yearPreference = '';
  languagePreference = '';
  timePreference = '';
  ratingPreference = '';

  // Hide the <h2> element
  var h2Element = document.querySelector('h2');
  if (h2Element) {
    h2Element.style.display = 'none';
  }

  // Show the genre options
  var genreOptions = document.getElementById('genreOptions');
  if (genreOptions) {
    genreOptions.style.display = 'flex';
  }

  // Hide the recommendations and "Get Recommendations" button
  var recommendationsElement = document.getElementById('recommendations');
  if (recommendationsElement) {
    recommendationsElement.style.display = 'none';
  }
  var getRecommendationsBtn = document.getElementById('getRecommendationsBtn');
  if (getRecommendationsBtn) {
    getRecommendationsBtn.style.display = 'none';
  }

  // Reset all other preference containers
  var preferenceContainers = [
    'animationOptions',
    'classicOptions',
    'yearOptions',
    'languageOptions',
    'timeOptions',
    'ratingOptions'
  ];

  preferenceContainers.forEach(function(containerId) {
    var container = document.getElementById(containerId);
    if (container) {
      container.style.display = 'none';
    }
  });

  // Reset the progress bar
  var progressBar = document.getElementById('progressBar');
  if (progressBar) {
    progressBar.style.width = '0%';
  }

  // Clear the appended options HTML for streaming options
  var streamingOptionsContainer = document.querySelector('.streaming-options-container');
  if (streamingOptionsContainer) {
    streamingOptionsContainer.innerHTML = '';
    streamingOptionsContainer.style.display = 'none'; // Hide the container
  }

  // Clear the streaming options container
  var movieRecommendationElement = document.getElementById('movieRecommendation');
  if (movieRecommendationElement) {
    movieRecommendationElement.textContent = '';
  }

  // Clear the flatrate and rent options
  var flatrateRentOptionsContainer = document.getElementById('flatrateRentOptionsContainer');
  if (flatrateRentOptionsContainer) {
    flatrateRentOptionsContainer.innerHTML = '';
  }

  // Scroll to the top of the web page
  setTimeout(function() {
    window.scrollTo({
      top: 0,
      behavior: 'auto' // Optional: smooth scrolling behavior
    });
  }, 100); // Adjust the delay time as needed
}
  
  // function displayDatabaseFound() {
  //    var message = 'Movie recommendation engine ready to go!';
  //   var messageElement = document.createElement('p');
   //   messageElement.textContent = message;
  //    document.getElementById('movieRecommendationApp').appendChild(messageElement);
   // }

    function displayDatabaseNotFound() {
     var message = ' ';
      var messageElement = document.createElement('p');
     messageElement.textContent = message;
     document.getElementById('movieRecommendationApp').appendChild(messageElement);
    }

function excludeProvider(providerName) {
    const excludedProviders = ['Netflix basic with Ads', 'Microsoft Store','Paramount+ Amazon Channel','Paramount Plus Apple TV Channel ', 'Rakuten TV', 'Chili', 'Starz Play Amazon Channel', 'Starz Play Amazon Channel', 'MGM Amazon Channel', 'MGM Amazon Channel', 'Lionsgate Plus', 'Studiocanal Presents Amazon Channel','BFI Player','STUDIOCANAL PRESENTS Apple TV Channel','Paramount Plus Apple TV Channel','Curzon Home Cinema'];
    return excludedProviders.includes(providerName);
}
	
function createStreamingButton(providerName) {
    // Set image URL based on provider name
    let imageUrl;
    switch (providerName) {
        case 'Netflix':
            imageUrl = 'https://icantchoose.com/wp-content/uploads/2024/02/netflix.jpg'; 
            break;
        case 'Amazon Video':
        case 'Amazon Prime Video': // Handle both cases for Amazon Video
            imageUrl = 'https://icantchoose.com/wp-content/uploads/2024/02/amazonprime.jpg';
            break;
        case 'Apple TV':
            imageUrl = 'https://icantchoose.com/wp-content/uploads/2024/02/apple-tv.jpg';
            break;
        case 'Google Play Movies':
            imageUrl = 'https://icantchoose.com/wp-content/uploads/2024/02/google-play.jpg';
            break;
        case 'Paramount Plus':
        case 'Paramount+ Amazon Channel': // Handle both cases for Paramount Plus
            imageUrl = 'https://icantchoose.com/wp-content/uploads/2024/02/paramountplus.jpg';
            break;
        case 'Sky Store':
        case 'Sky Go': // Handle both cases for Sky
            imageUrl = 'https://icantchoose.com/wp-content/uploads/2024/02/skygo.jpg';
            break;
        case 'YouTube':
            imageUrl = 'https://icantchoose.com/wp-content/uploads/2024/02/youtube.jpg';
            break;
        case 'Disney Plus':
            imageUrl = 'https://icantchoose.com/wp-content/uploads/2024/02/disneyplus.jpg';
            break;
        case 'Now TV Cinema':
            imageUrl = 'https://icantchoose.com/wp-content/uploads/2024/02/nowtvcinema.jpg';
            break;
        default:
            // Use a default image URL if provider name is not recognized
            imageUrl = 'https://example.com/default-image.jpg';
            break;
    }

    // Create img element and set src attribute
    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.maxWidth = '25px'; // Reduce image width
    img.style.height = 'auto'; // Maintain aspect ratio
    img.style.backgroundColor = 'black'; // Set background color
    img.style.borderRadius = '10px'; // Add rounded corners
    img.style.border = '2px solid #555'; // Add border
    img.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.3)'; // Add box shadow
    img.style.marginRight = '10px'; // Add margin between image and label
    img.style.cursor = 'pointer'; // Change cursor to pointer

    // Add click event listener to open provider website
    img.addEventListener('click', function() {
        openProviderWebsite(providerName);
    });

    return img;
}

function openProviderWebsite(providerName) {
	    console.log('Opening provider website:', providerName); // Add this line
    // Define the URLs for each provider
    const providerUrls = {
        'Netflix': 'https://www.netflix.com/',
        'Amazon Video': 'https://www.amazon.com/gp/video/storefront/',
        'Amazon Prime Video': 'https://www.amazon.com/gp/video/storefront/',
        'Apple TV': 'https://www.apple.com/apple-tv/',
        'Google Play Movies': 'https://play.google.com/store/movies',
        'Paramount Plus': 'https://www.paramountplus.com/',
        'Paramount+ Amazon Channel': 'https://www.amazon.com/gp/video/storefront/',
        'Sky Store': 'https://www.sky.com/watch/channel/sky-cinema',
        'Sky Go': 'https://www.sky.com/watch/sky-go',
        'YouTube': 'https://www.youtube.com/',
        'Disney Plus': 'https://www.disneyplus.com/',
        'Now TV Cinema': 'https://www.nowtv.com/cinema',
    };

    // Check if the provider name has a corresponding URL
    if (providerUrls.hasOwnProperty(providerName)) {
        // Open the URL in a new tab
        window.open(providerUrls[providerName], '_blank');
    }
}

function waitForPlotContainer(callback) {
    const plotContainer = document.getElementById('plotContainer');
    if (plotContainer) {
        callback(plotContainer);
    } else {
        setTimeout(() => {
            waitForPlotContainer(callback);
        }, 100); // Adjust the interval as needed
    }
}

function displayStreamingOptions(response) {
    // Function to wait for plotContainer to exist
    function waitForPlotContainer(callback) {
        var interval = setInterval(function() {
            var plotContainer = document.getElementById('plotContainer');
            if (plotContainer) {
                clearInterval(interval);
                callback(plotContainer);
            }
        }, 100);
    }

    // Check if streaming options exist in the response
    if (!response.results || !response.results.GB) {
        console.error('No streaming options found in the response.');
        return;
    }

    var streamingOptions = response.results.GB;
    console.log('Streaming Options:', streamingOptions);

    // Extract flatrate and rent options
    var flatrateOptions = streamingOptions.flatrate || [];
    var rentOptions = streamingOptions.rent || [];

    // Filter out buy options and excluded providers for flatrate and rent options
    flatrateOptions = flatrateOptions.filter(option => !excludeProvider(option.provider_name) && option.option_type !== 'buy');
    rentOptions = rentOptions.filter(option => !excludeProvider(option.provider_name) && option.option_type !== 'buy');

    // Create HTML elements for streaming and rent/buy options only if not already created
    if (!document.getElementById('streamingcontainer')) {
        var optionsHTML = '<div id="streamingcontainer" class="streaming-options-container">';

        if ((flatrateOptions.length > 0 || rentOptions.length > 0)) {
            optionsHTML += '<h3 style="color: white; font-weight: bold; font-size: 16px;">Streaming</h3>';
            if (flatrateOptions.length > 0) {
                flatrateOptions.forEach(option => {
                    if (!excludeProvider(option.provider_name) && option.option_type !== 'buy') {
                        const img = createStreamingButton(option.provider_name);
                        optionsHTML += img.outerHTML;
                    }
                });
            } else {
                optionsHTML += '<p style="color: white; padding-bottom: 3px; margin: 0;">None found</p>'; // Aligned the "None found" text
            }

            if (rentOptions.length > 0) {
                optionsHTML += '<h3 style="color: white; font-weight: bold; padding-top: 3px; font-size: 16px;">Rent/Buy</h3>';
                rentOptions.forEach(option => {
                    if (!excludeProvider(option.provider_name) && option.option_type !== 'buy') {
                        const img = createStreamingButton(option.provider_name);
                        optionsHTML += img.outerHTML;
                    }
                });
            }
        }

        optionsHTML += '</div>';

        // Call the function to wait for plotContainer to exist
        waitForPlotContainer((plotContainer) => {
            // Now you have access to plotContainer, you can proceed with your code here

            // Create a parent container for both optionsHTML and plotContainer
            var parentContainer = document.createElement('div');
            parentContainer.style.display = 'flex';
            parentContainer.style.flexDirection = 'row';

            // Insert optionsHTML and plotContainer inside the parent container
            parentContainer.innerHTML = optionsHTML;
            parentContainer.appendChild(plotContainer.cloneNode(true));

            // Replace the plot container with the parent container
            plotContainer.parentNode.replaceChild(parentContainer, plotContainer);
        });
    }
}

function displayStreamingOptionsDesktop(response) {
    console.log('TMDB API Response:', response);

    // Check if results.GB exists
    if (!response.results || !response.results.GB) {
        console.error('No streaming options found in the response.');
        return;
    }

    var streamingOptions = response.results.GB;
    console.log('Streaming Options:', streamingOptions);

    // Extract and filter flatrate and rent options, ensuring they are defined
    var flatrateOptions = (streamingOptions.flatrate || []).filter(option => !excludeProvider(option.provider_name) && option.option_type !== 'buy');
    var rentOptions = (streamingOptions.rent || []).filter(option => !excludeProvider(option.provider_name) && option.option_type !== 'buy');

    // Create a container for streaming options
    var streamingOptionsContainer = document.createElement('div');
    streamingOptionsContainer.classList.add('streaming-options-container');

    // Create HTML elements for combined streaming and rent options
    var optionsHTML = `
        <div style="padding: 10px; ">
            <div style="display: inline-block; margin-right: 20px;">`;

    if (flatrateOptions.length > 0 || rentOptions.length > 0) {
        optionsHTML += '<h3 style="color: white; font-weight: bold; font-size: 18px;">Streaming</h3>';

        if (flatrateOptions.length > 0) {
            flatrateOptions.forEach(option => {
                const img = createStreamingButton(option.provider_name);
                optionsHTML += img.outerHTML;
            });
        } else {
            optionsHTML += '<p style="color: white; padding-top: 7px; font-size: 20px;">None found</p>'; // Aligned the "None found" text
        }
    }

    optionsHTML += `</div>
            <div style="display: inline-block;">
                <h3 style="color: white; font-weight: bold; font-size: 18px;">Rent/Buy</h3>`;
    
    rentOptions.forEach(option => {
        const img = createStreamingButton(option.provider_name);
        optionsHTML += img.outerHTML;
    });

    optionsHTML += `</div>
        </div>`;

    // Set inner HTML of streaming options container
    streamingOptionsContainer.innerHTML = optionsHTML;

    // Find the movie recommendation element by ID
    var movieRecommendationElement = document.getElementById('movieRecommendation');

    // Insert streaming options container after the movie recommendation
    movieRecommendationElement.insertAdjacentElement('afterend', streamingOptionsContainer);
}

window.addEventListener('load', loadMovieData);

		  
	   
  </script>
</div> 

We are continually working to enhance our API integration to ensure that the movie details remain as current and accurate as possible. In the future, we plan to:

Expand our data sources to provide more comprehensive movie insights
Include additional features, such as user reviews and similar movie suggestions
Check out our main website icantchoose.com/movies to see the Movie Details API in action!
