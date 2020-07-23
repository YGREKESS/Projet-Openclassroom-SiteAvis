class myMap {

  constructor(){
    this.map = "";
    this.markers = [];
  }
  ///////////////////////////////
  // INITIALISATION DE LA MAP
  ///////////////////////////////
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
    app_1.addMyRestaurant(this.map);
    this.actualisation();
  }

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

  ///////////////////////////////
  // GEOLOCALISATION
  ///////////////////////////////
  geolocalisation(){
    let geolocationButton = $("#geolocation")[0];
        geolocationButton.addEventListener("click", geolocalisation_1.bind(this));

    function geolocalisation_1(){
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
              }
        var latlng = new google.maps.LatLng(pos);

        this.map.zoom = 14;
        this.map.setCenter(pos);
        this.clearMarkers();
        this.places(pos, this.map);
      }.bind(this));
    }
  }

  ///////////////////////////////////////////////////////
  // AFFICHAGE DU LIEU SAISI DANS LA BARRE DE RECHERCHE
  ///////////////////////////////////////////////////////
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
    this.map.zoom = 14;
    this.map.setCenter(search);
    this.clearMarkers();
    this.places(search, this.map);
  }

  //////////////////////////////////////////
  // AFFICHAGE DES RESTAURANTS A PROXIMITE
  //////////////////////////////////////////
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