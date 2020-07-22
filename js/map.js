// LANCEMENT DE FONCTION GEOCODE UNE FOIS LA LOCALISATION RENTREE
var searchBar = $("#searchbar")[0];
searchBar.addEventListener("submit", geocode);
var searchlocalisation = $("#searchlocalisation")[0];

///////////////////////////////
// INITIALISATION DE LA MAP
///////////////////////////////
function  initMap() {
      var map;
      var france = {
        lat : 46.485873,
          lng : 2.640097
      }

      map = new google.maps.Map(document.getElementById("map"), {
      center: france,
      zoom: 7
      });

	/////////////////////////
	// AUTOCOMPLETE
	/////////////////////////
      var options = {
        types: ['(country)'],
        componentRestrictions: {country: 'fr'}
      };
      
      autocomplete = new google.maps.places.SearchBox(searchlocalisation, options);
      app_1.addMyRestaurant(map);
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
	app_1.addMyRestaurant(map);
}

///////////////////////////////////////
// AFFICHAGE DU LIEU DE RECHERCHE
///////////////////////////////////////
function places(search, map){
	var request = {
	 	location: search,
	    radius: '150',
	    query: "restaurant"
	  };
	  service = new google.maps.places.PlacesService(map);
	  service.textSearch(request, callback);

	function callback(results, status) {
		let restaurantItemsContent = $("#restaurantItemsContent")[0];
			restaurantItemsContent.style.display = "block";
		let restaurantItem = $(".restaurantItem");
		  if (status == google.maps.places.PlacesServiceStatus.OK) {
		  	//Boucle "for" qui me permet de supprimer l'ancienne recherche.
		  	/*for (var i = 0; i < restaurantItem.length; i++) {
		  		let supprRestaurantItemsContent = restaurantItemsContent.removeChild(restaurantItem[i]);
		  	}*/
		  	//Boucle "for" qui me permet de générer la nouvelle recherche.	
		    for (var i = 0; i < results.length; i++) {
		      createMarkerInfos(results[i]);
		      let restaurant = new RestaurantItem (
		      		results[i].name,
		      		results[i].place_id,
		      		results[i].formatted_address,
		      		results[i].rating,
		      		'url(https://maps.googleapis.com/maps/api/streetview?size=300x200&location=' + results[i].geometry.viewport.Za.i+ ',' + results[i].geometry.viewport.Ua.i + '&heading=151.78&pitch=-0.76&key=AIzaSyC9qQyiKfow1J6Cgnk_02d10II9O2ik3NU)'
		      	) 
				restaurant.createItem();
				    
		    	
		    }
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
