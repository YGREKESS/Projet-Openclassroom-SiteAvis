class myMap {

  constructor(){
    this.map = "";
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
  }

  geolocalisation(){
    let geolocationButton = $("#geolocation")[0];
      geolocationButton.addEventListener("click", geolocalizeMe.bind(this));

    function geolocalizeMe(){
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
              }
        var latlng = new google.maps.LatLng(pos);

        this.map.zoom = 15;
        this.map.setCenter(pos)
        this.places(pos, this.map)
      }.bind(this));
    }
  }

  // RECHERCHE DU LIEU SAISI DANS L'INPUT
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

  // AFFICHAGE DE LA VILLE
  searchLocalisation(response) {
    let search = new google.maps.LatLng(response.data.results[0].geometry.location.lat,response.data.results[0].geometry.location.lng);
    this.map.zoom = 15;
    this.map.setCenter(search);

    this.places(search, this.map);
  }

  ///////////////////////////////////////
  // AFFICHAGE DU LIEU DE RECHERCHE
  ///////////////////////////////////////
  places(search, map){
    let request = {
      location: search,
        radius: '150',
        query: "restaurant"
      };
      let service = new google.maps.places.PlacesService(map);
      service.textSearch(request, callback);

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
      let lat1 = results.geometry.viewport.Za.i;
      let lng1 = results.geometry.viewport.Ua.i;
      let name = results.name;
      let address = results.formatted_address;

      let description = "<br>" + name + "<br>" + address;
        let marker = new google.maps.Marker({
            position: {lat: lat1, lng: lng1},
            map: map
        });
      let infoWindow = new google.maps.InfoWindow({
          content: description
      });
      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });
    }
  }
}

let map_1 = new myMap();

function initMap(){
  map_1.initMap_1();
}