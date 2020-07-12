// LANCEMENT DE FONCTION GEOCODE UNE FOIS LA LOCALISATION RENTREE
var searchBar = $("#searchbar")[0];
searchBar.addEventListener("submit", geocode);
var searchlocalisation = $("#searchlocalisation")[0];

//CREATION DE LA MAP CENTREE SUR LA FRANCE
function initMap() {

	// LOCALISATION DE MA POSITION
	navigator.geolocation.getCurrentPosition(function(position) {
	  var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	  var myOptions = {
	    zoom: 11,
	    center: latlng,
	    mapTypeId: google.maps.MapTypeId.TERRAIN,
	    disableDefaultUI: true
	  }
	  var map = new google.maps.Map(document.getElementById("map"), myOptions);
	});

	// AUTOCOMPLETE
	var options = {
	  types: ['(cities)'],
	  componentRestrictions: {country: 'fr'}
	};
	
	autocomplete = new google.maps.places.SearchBox(searchlocalisation, options);


}

// RECHERCHE DU LIEU SAISI DANS L'INPUT
function geocode(e){
	e.preventDefault();

	var location = searchlocalisation.value; // Valeur de l'input
	axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
		params:{
			address: location,
			key: "AIzaSyC9qQyiKfow1J6Cgnk_02d10II9O2ik3NU"
		}
	})
	.then(function(response){ // SI OK
		searchLocalisation(response);
	})
	.catch(function(error){ // SI KO
		console.log(error);
	});
}

// AFFICHAGE DE LA VILLE
function searchLocalisation(response) {
	var map;
	var search = new google.maps.LatLng(response.data.results[0].geometry.location.lat,response.data.results[0].geometry.location.lng);

	map = new google.maps.Map(document.getElementById("map"), {
	center: search,
	zoom: 15
	});

	places(search, map);

}

// AFFICHAGE DU LIEU DE RECHERCHE
function places(search, map){

	var request = {
	 	location: search,
	    radius: '150',
	    query: searchlocalisation.value
	  };
	  service = new google.maps.places.PlacesService(map);
	  service.textSearch(request, callback);

	function callback(results, status) {
		console.log(results);
	  if (status == google.maps.places.PlacesServiceStatus.OK) {
	    for (var i = 0; i < results.length; i++) {
	      createMarkerInfos(results[i]);
	    }
	    list.createItem(results);
	  }
	}
	function createMarkerInfos(results) {
		var lat1 = results.geometry.viewport.Za.i;
		var lng1 = results.geometry.viewport.Ua.i;
		var name = results.name;
		var address = results.formatted_address;

		var description = "<br>" + name + "<br>" + address;
	    var marker = new google.maps.Marker({
	        position: {lat: lat1, lng: lng1},
	        map: map
	    });
		var infoWindow = new google.maps.InfoWindow({
		    content: description
		});
		marker.addListener('click', function() {
			infoWindow.open(map, marker);
		});
	}
}

//"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="" "&key="YOUR_API_KEY
