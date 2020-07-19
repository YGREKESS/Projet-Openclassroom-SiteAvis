//////////////////////////////
// BOUTON D'AJOUT D'UN AVIS
//////////////////////////////
let modal_WriteReview = $("#modal_WriteReview")[0]; // Bouton "Ecrire un avis"	
	modal_WriteReview.addEventListener("click", displayAddModal);

function displayAddModal(){
	let restaurantModal = $("#restaurantModal")[0];
	let addModal = $("#addModal")[0];

	restaurantModal.style.display = "none";
}
/////////////////////////
// VALIDATION D'UN AVIS
/////////////////////////
let modal_ButtonAddReview = $("#modal_ButtonAddReview")[0]; //Bouton "Ajouter" après avoir rempli l'input (name, rating, comment)//
	modal_ButtonAddReview.addEventListener("click", function(){
	let restaurantModal = $("#restaurantModal")[0];
	let addModal = $("#addModal")[0];
	let pseudo = $("#pseudoId")[0].value;
	let rating = $("#ratingId")[0].value;
	let comment = $("#commentId")[0].value;

	let myComment = new Comment(pseudo, rating, comment);
	myComment.displayComment();

	restaurantModal.style.display = "block";
	addModal.style.display = "none";
});
//////////////////////////////////////////////////
// FERMETURE DU MODAL EN CLIQUANT SUR LA CROIX
//////////////////////////////////////////////////
let addModal_CrossClose = $("#addModal_CrossClose")[0];
	addModal_CrossClose.addEventListener("click", function(){
		let restaurantModal = $("#restaurantModal")[0];
			restaurantModal.style.display = "block";
});
/////////////////////////
// GEOLOCALISATION
/////////////////////////
let geolocationButton = $("#geolocation")[0];
	geolocationButton.addEventListener("click", function(){
	// LOCALISATION DE MA POSITION
	navigator.geolocation.getCurrentPosition(function(position) {
	  var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	  console.log(position)
	  var myOptions = {
	    zoom: 15,
	    center: latlng,
	    mapTypeId: google.maps.MapTypeId.TERRAIN,
	    disableDefaultUI: true
	  }
	  var map = new google.maps.Map(document.getElementById("map"), myOptions);
	  places(latlng, map);
	});
	// AUTOCOMPLETE
	var options = {
	  types: ['(cities)'],
	  componentRestrictions: {country: 'fr'}
	};
	autocomplete = new google.maps.places.SearchBox(searchlocalisation, options);
	});

/*
/////////////////////////
// BOUTON CREATION MARKER
/////////////////////////
function createMyMarker(){
	let map = $("#map")[0];
	let createMarkerButtonActive = false;
	let createMarkerButton = $("#createMarker")[0];
		createMarkerButton.addEventListener("click", function(){
			createMarkerButtonActive = true;
			createMarkerButton.style.backgroundColor = "black";
			dblClick(createMarkerButtonActive);
		});

	function dblClick(createMarkerButtonActive){
		if (createMarkerButtonActive = true) {
				map.addEventListener('dblclick', function(e) {
				console.log(e.latLng);
				placeMarkerAndPanTo(e.latLng, map);
			});
		}
	}
		function placeMarkerAndPanTo(latLng, map) {
		  var marker = new google.maps.Marker({
		    position: latLng,
		    map: map
		  });
		  map.panTo(latLng);
		}
}

createMyMarker();
*/