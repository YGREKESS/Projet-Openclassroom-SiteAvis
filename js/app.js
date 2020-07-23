class App {

	launchApp(){
	    let infoBulle_actualisation = "Ce bouton vous permet d'actualiser les restaurants lorsque vous vous déplacez manuelle sur la map.";
	    let infoBulle_createMarkerButton = "Ce bouton vous permet d'ajouter un nouveau restaurant. Une fois activé, double-cliquez sur la map à l'emplacement souhaité.";
	    let infoBulle_geolocationButton = "Ce bouton permet d'activer la géolocalisation.";

	    let actualisation = $("#actualisation")[0];
	        actualisation.addEventListener("mouseover", mouseOverButton);
	        actualisation.addEventListener("mouseout", mouseOutButton);
	    let createMarkerButton = $("#createMarker")[0];
	        createMarkerButton.addEventListener("mouseover", mouseOverButton);
	        createMarkerButton.addEventListener("mouseout", mouseOutButton);
	    let geolocationButton = $("#geolocation")[0];
	        geolocationButton.addEventListener("mouseover", mouseOverButton);
	        geolocationButton.addEventListener("mouseout", mouseOutButton);

	    function mouseOverButton(e){   
	      let div = $("#explication")[0];
	          div.style.display = "block";
	          div.style.zIndex = "10";
	        if ((e.target == actualisation) || (e.target == actualisation.childNodes[0])) {
	          div.innerHTML = infoBulle_actualisation;
	        } 
	        else if ((e.target == createMarkerButton) || (e.target == createMarkerButton.childNodes[0])){
	          div.innerHTML = infoBulle_createMarkerButton;
	        }
	        else {
	          div.innerHTML = infoBulle_geolocationButton;
	        }
	    }

	    function mouseOutButton(text){
	      let div = $("#explication")[0];
	          div.style.display = "none";
	          div.innerHTML = "";
	    }

		this.filterListener();
	}

	filterListener() {
		let filterButton = $("#filterId")[0];
		    filterButton.addEventListener('change', function () {
		    var selectedStars = filterButton.value;
		    this.filter(selectedStars);
		    }.bind(this));
	}

	filter(maxStars){
		let restaurantItem = $(".restaurantItem");

		for (var i = 0; i < restaurantItem.length; i++) {
			let restaurantRate = $(".restaurantRate")[i];
			let itemStars = restaurantRate.innerHTML;
			let x = Math.round(itemStars);
			let parentElm = restaurantRate.parentNode;

	        if (itemStars >= maxStars || maxStars === 'noFilter') {
	            // show item
	            parentElm.style.display = 'block';
	        } else {
	            // hidde item
	            parentElm.style.display = 'none';
	        }
		}
	}

	addMyRestaurant(map){
		let createMarkerButtonActive = false;
		let createMarkerButton = $("#createMarker")[0];
			createMarkerButton.addEventListener("click", activeMarker);

		function activeMarker() {
			createMarkerButtonActive = true;
			createMarkerButton.style.backgroundColor = "black";
			dblClick(createMarkerButtonActive);
		}

		function dblClick(createMarkerButtonActive){
			if (createMarkerButtonActive == true) {
				map.addListener('dblclick', function(e) {
					$('#modal_AddMarker').modal('toggle');

					function click_ButtonAddRestaurant(){
						let modal_AddMarker_RestaurantName = $("#modal_AddMarker_RestaurantName")[0];
						let modal_AddMarker_RestaurantAddress = $("#modal_AddMarker_RestaurantAddress")[0];
						let modal_AddMarker_RestaurantRating = $("#modal_AddMarker_RestaurantRating")[0];
						let description = {
								name : modal_AddMarker_RestaurantName.value,
								address : modal_AddMarker_RestaurantAddress.value,
								rate : modal_AddMarker_RestaurantRating.value
							};

						description = new RestaurantItem(		
								description.name,
								null,
								description.address,
								description.rate,
								//'url(https://maps.googleapis.com/maps/api/streetview?size=300x200&location=' + e.latLng.lat() + ',' + e.latLng.lng() + '&heading=151.78&pitch=-0.76&key=AIzaSyC9qQyiKfow1J6Cgnk_02d10II9O2ik3NU)',
							)
						let restaurantItemsContent = $("#restaurantItemsContent")[0];
							restaurantItemsContent.style.display = "block";
						
						description.createItem();

						placeMarkerAndPanTo(
							createMarkerButtonActive, 
							e.latLng, 
							map, 
							description
						);
					};

					let modal_AddMarker_ButtonAddRestaurant = $("#modal_AddMarker_ButtonAddRestaurant")[0];
						modal_AddMarker_ButtonAddRestaurant.addEventListener("click", click_ButtonAddRestaurant);

					$("#modal_AddMarker").on('hide.bs.modal', function () {
						modal_AddMarker_ButtonAddRestaurant.removeEventListener("click", click_ButtonAddRestaurant);
						createMarkerButtonActive = false;
						createMarkerButton.style.backgroundColor = "";
						dblClick(createMarkerButtonActive);
						$("#modal_AddMarker_RestaurantName").val("");
						$("#modal_AddMarker_RestaurantAddress").val("");
						$("#modal_AddMarker_RestaurantRating").val("");
					});
				});
			} else {	
				google.maps.event.clearListeners(map, 'dblclick');
			}
		}

		function placeMarkerAndPanTo(createMarkerButtonActive, latLng, map, description) {
			var marker = new google.maps.Marker({
				position: latLng,
				map: map
			});
			map.panTo(latLng);

			var infoWindow = new google.maps.InfoWindow({
				content: description.name + " " + description.address + " " + description.description
			});
			marker.addListener('click', function() {
				infoWindow.open(map, marker);
			});
			createMarkerButtonActive = false;
			createMarkerButton.style.backgroundColor = "";
			dblClick(createMarkerButtonActive);
		}	
	}
}