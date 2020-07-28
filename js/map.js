class myMap {

  constructor(){
    this.map = "";
    this.markers = [];
  }
  //////////////////////////////
  // INITIALISATION DE LA MAP //
  //////////////////////////////
  initMap_1() {

    let searchlocalisation = $("#searchlocalisation")[0];
    let searchbar = $("#searchbar")[0];
        searchbar.addEventListener("submit", this.geocode.bind(this));

    let france = {
      lat : 46.485873,
        lng : 2.640097
    }

    this.map = new google.maps.Map(document.getElementById("map"), {
    center: france,
    zoom: 7
    });

    let options = {
      types: ['(country)'],
      componentRestrictions: {country: 'fr'}
    };
    
    let autocomplete = new google.maps.places.SearchBox(searchlocalisation, options);
    this.geolocalisation();
    this.addMyRestaurant(this.map);
    this.actualisation();
  }

  ////////////////////////////////////////////
  // MISE A JOUR DES RESTAURANTS DE LA ZONE //
  ////////////////////////////////////////////
  actualisation(){
    let actualisation = $("#actualisation")[0];
        actualisation.addEventListener("click", actualisation_1.bind(this));

    function actualisation_1(){
      let search = new google.maps.LatLng(this.map.center.lat(),this.map.center.lng());
        this.map.zoom = 14;
        this.map.setCenter(search);
        this.clearMarkers();
        this.places(search, this.map);
    }
  }

  ///////////////////////////
  // AJOUT D'UN RESTAURANT //
  ///////////////////////////
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
            let modal_AddMarker_RestaurantName = $("#modal_AddMarker_RestaurantName")[0].value;
            let modal_AddMarker_RestaurantAddress = $("#modal_AddMarker_RestaurantAddress")[0].value;
            let modal_AddMarker_RestaurantRating = $("#modal_AddMarker_RestaurantRating")[0].value;
            let description = {
                name : modal_AddMarker_RestaurantName,
                address : modal_AddMarker_RestaurantAddress,
                rate : modal_AddMarker_RestaurantRating
              };

            if((description.name != "") & (description.address != "") & (description.rate != "")) {
              description = new RestaurantItem(   
                  description.name,
                  null,
                  description.address,
                  description.rate,
                  undefined,
                  'url(https://maps.googleapis.com/maps/api/streetview?size=300x200&location=' + e.latLng.lat() + ',' + e.latLng.lng() + '&heading=151.78&pitch=-0.76&key=AIzaSyC9qQyiKfow1J6Cgnk_02d10II9O2ik3NU)',
                  placeMarkerAndPanTo(createMarkerButtonActive,e.latLng,map)
                )
              description.createItem();
              let restaurantItemsContent = $("#restaurantItemsContent")[0];
                  restaurantItemsContent.style.display = "block";           
            }  else {
              alert("Merci de compléter l'ensemble des champs pour ajouter un nouveau restaurant.")
            }
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

    function placeMarkerAndPanTo(createMarkerButtonActive, latLng, map) {
      let marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
      map.panTo(latLng);

      createMarkerButtonActive = false;
      createMarkerButton.style.backgroundColor = "";
      dblClick(createMarkerButtonActive);

      return marker;
    } 
  }

  /////////////////////
  // GEOLOCALISATION //
  /////////////////////
  geolocalisation(){
    let geolocationButton = $("#geolocation")[0];
        geolocationButton.addEventListener("click", geolocalisation_1.bind(this));

    function geolocalisation_1(){
      navigator.geolocation.getCurrentPosition(function(position) {
        let pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
              }
        let latlng = new google.maps.LatLng(pos);

        this.map.zoom = 15;
        this.map.setCenter(pos);
        this.clearMarkers();
        this.places(pos, this.map);
      }.bind(this));
    }
  }

  ////////////////////////////////////////////////////////
  // AFFICHAGE DU LIEU SAISI DANS LA BARRE DE RECHERCHE //
  ////////////////////////////////////////////////////////
  geocode(e){
    e.preventDefault();
    let location = searchlocalisation.value; // Valeur de l'input
    axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params:{
        address: location,
        key: "AIzaSyC9qQyiKfow1J6Cgnk_02d10II9O2ik3NU"
      }
    })
    .then(function(response){ // SI OK
      this.searchLocalisation(response);
    }.bind(this))
    .catch(function(error){ // SI KO
      console.log(error);
    });
  }

  searchLocalisation(response) {
    let search = new google.maps.LatLng(response.data.results[0].geometry.location.lat,response.data.results[0].geometry.location.lng);
    this.map.zoom = 15;
    this.map.setCenter(search);
    this.clearMarkers();
    this.places(search, this.map);
  }

  ///////////////////////////////////////////
  // AFFICHAGE DES RESTAURANTS A PROXIMITE //
  ///////////////////////////////////////////
  places(search, map){
    let request = {
      location: search,
        radius: '150',
        query: "restaurant"
      };

      let service = new google.maps.places.PlacesService(map);
      service.textSearch(request, callback.bind(this));

    function callback(results, status) {
      let restaurantItemsContent = $("#restaurantItemsContent")[0];
          restaurantItemsContent.style.display = "block";
      let restaurantItem = $(".restaurantItem");

        if (status == google.maps.places.PlacesServiceStatus.OK) {
          //Boucle "for" qui me permet de supprimer l'ancienne recherche.
          for (let i = 0; i < restaurantItem.length; i++) {
            let supprRestaurantItemsContent = restaurantItemsContent.removeChild(restaurantItem[i]);
          }
          //Boucle "for" qui me permet de générer la nouvelle recherche.  
          for (let i = 0; i < results.length; i++) { 
            let restaurant = new RestaurantItem (
              results[i].name,
              results[i].place_id,
              results[i].formatted_address,
              results[i].rating,
              results[i].photos,
              'url(https://maps.googleapis.com/maps/api/streetview?size=300x200&location=' + results[i].geometry.location.lat() + ',' + results[i].geometry.location.lng() + '&heading=151.78&pitch=-0.76&key=AIzaSyC9qQyiKfow1J6Cgnk_02d10II9O2ik3NU)',
              this.createMarkerInfos(results[i], map)
            ) 
          restaurant.createItem();        
          }
        }
    }
  }

  ///////////////////////////
  // GESTION DES MARQUEURS //
  ///////////////////////////
  setMapOnAll(map) {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  clearMarkers() {
    this.setMapOnAll(null);
    this.markers = [];
  }
  createMarkerInfos(result, map) {
    let lat1 = result.geometry.location.lat();
    let lng1 = result.geometry.location.lng();
      
    let marker = new google.maps.Marker({
        position: {lat: lat1, lng: lng1},
        map: map
    });
    this.markers.push(marker);
    this.setMapOnAll(map);
    return marker;
  }
}

let map_1 = new myMap();

function initMap(){
  map_1.initMap_1();
}