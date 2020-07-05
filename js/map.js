//CREATION DE LA MAP CENTREE SUR LA FRANCE
function initMap() {
	var map;
	var france = {
		lat : 46.485873,
	    lng : 2.640097
	}

	map = new google.maps.Map(document.getElementById("map"), {
	center: france,
	zoom: 7
	});
}

// LANCEMENT DE FONCTION GEOCODE UNE FOIS LA LOCALISATION RENTREE
var searchBar = $("#searchbar")[0];
searchBar.addEventListener("submit", geocode);
var searchlocalisation = $("#searchlocalisation")[0];

function geocode(e){
	e.preventDefault();

	var location = searchlocalisation.value;
	axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
		params:{
			address: location,
			key: 
		}
	})
	.then(function(response){ // SI OK
		searchLocalisation(response);
	})
	.catch(function(error){ // SI KO
		console.log(error);
	});
}

// AFFICHAGE DES RESTAURANTS
function searchLocalisation(response) {
	var map;
	var search = new google.maps.LatLng(response.data.results[0].geometry.location.lat,response.data.results[0].geometry.location.lng);

	map = new google.maps.Map(document.getElementById("map"), {
	center: search,
	zoom: 15
	});
	
	// GOOGLE PLACES
	var request = {
	 	location: search,
	    radius: '1500',
	    query: 'restaurant'
	  };

	  service = new google.maps.places.PlacesService(map);
	  service.textSearch(request, callback);

	function createMarkerInfos(latlng, name, address) {
		var description = name + "<br>" + address;
	    var marker = new google.maps.Marker({
	        position: latlng,
	        map: map
	    });
		var infoWindow = new google.maps.InfoWindow({
		    content: description
		});
		marker.addListener('click', function() {
			infoWindow.open(map, marker);
		});
	}

	function callback(results, status) {

	  if (status == google.maps.places.PlacesServiceStatus.OK) {
	    for (var i = 0; i < results.length; i++) {
	      var place = results[i];
	      var latLng = {lat: results[i].geometry.viewport.Za.i,lng: results[i].geometry.viewport.Ua.i };

	      createMarkerInfos(latLng, results[i].name, results[i].formatted_address);

	      //console.log(results[i]);
	      //console.log({lat: results[i].geometry.viewport.Ua.i, lng: results[i].geometry.viewport.Za.i});
	    }
	    console.log(results.length);

	    list.createRestaurant(results);
	  }
	}
}


