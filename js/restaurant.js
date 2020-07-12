

class Mmap {

    //CREATION DE LA MAP CENTREE SUR LA FRANCE
    initMap() {
      var map;
      var france = {
        lat : 46.485873,
          lng : 2.640097
      }

      map = new google.maps.Map(document.getElementById("map"), {
      center: france,
      zoom: 7
      });

      // AUTOCOMPLETE
      var options = {
        types: ['(cities)'],
        componentRestrictions: {country: 'fr'}
      };
      
      autocomplete = new google.maps.places.SearchBox(searchlocalisation, options);
    }

    // RECHERCHE DU LIEU SAISI
    geocode(e){
      e.preventDefault();

      var location = searchlocalisation.value;
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
    searchLocalisation(response) {
      var map;
      var search = new google.maps.LatLng(response.data.results[0].geometry.location.lat,response.data.results[0].geometry.location.lng);

      map = new google.maps.Map(document.getElementById("map"), {
      center: search,
      zoom: 15
      });

      places(search, map);
    }

    // AFFICHAGE DU LIEU DE RECHERCHE
    places(search, map){

      var request = {
        location: search,
          radius: '1500',
          query: searchlocalisation.value
        };

        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
        
      function createMarkerInfos(latlng, photo, name, address) {
        var description = photo + "<br>" + name + "<br>" + address;
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
            console.log(results[0].photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200}));
            createMarkerInfos(latLng, results[i].photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}), results[i].name, results[i].formatted_address);
          
          }
          console.log(results);
          list.createRestaurant(results);
        }
      }
    }
}

let myMap = new Mmap();
// LANCEMENT DE FONCTION GEOCODE UNE FOIS LA LOCALISATION RENTREE
let searchBar = $("#searchbar")[0];
searchBar.addEventListener("submit", myMap.geocode);
let searchlocalisation = $("#searchlocalisation")[0];
