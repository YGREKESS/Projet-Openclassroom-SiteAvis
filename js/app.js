class App {

    ////////////////////////////////
    // LANCEMENT DE L'APPLICATION //
    ////////////////////////////////
	launchApp(){
	    let infoBulle_actualisation = "Ce bouton vous permet d'actualiser les restaurants d'une zone lorsque vous vous déplacez manuellement sur la map.";
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
	}

	recupData(url, callback){
		let request = new XMLHttpRequest();
			request.open('GET', url);
			request.responseType = 'json';
			request.send();
		request.onload = function () {
		  let data = request.response;
		  callback(data); 
		}
	}
}