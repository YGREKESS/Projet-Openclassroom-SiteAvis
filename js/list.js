
class ListAddress{

	constructor(name, address, rate, opinion){
    	this.list = [];
		this.name = name;
		this.address = address;
		this.rate = rate;
		this.opinion = opinion;
	}

	generateList(results) {
		let restaurantList = this.list.splice(0, this.list.length); // Pour que la liste se réinitialise à chaque recherche
		let restaurantItems = $("#restaurantItems")[0];

	    for (var i = 0; i < results.length; i++) {
			var restaurant = document.createElement("div");
			restaurantItems.appendChild(restaurant);
			restaurant.className = "restaurant";
			restaurant.style.height = "auto";
			restaurant.style.width = "100%";
			restaurant.style.backgroundColor = "white";
			restaurant.style.border = "1px solid";
			restaurant.style.boxSizing= "border-box";
			restaurant.style.textAlign = "center";    
			this.list.push(restaurant);

			var restaurantPhoto = document.createElement("div");
			restaurant.appendChild(restaurantPhoto);
			restaurantPhoto.className = "restaurantPhoto";

			var restaurantName = document.createElement("div");
			restaurant.appendChild(restaurantName);
			restaurantName.className = "restaurantName";

			var restaurantAddress = document.createElement("div");
			restaurant.appendChild(restaurantAddress);
			restaurantAddress.className = "restaurantAddress";

			var restaurantRate = document.createElement("div");
			restaurant.appendChild(restaurantRate);
			restaurantRate.className = "restaurantRate";			
	    }
    }

	createItem(results){
		this.generateList(results);
		    for (let i = 0; i < results.length; i++) {
				let restaurant = $(".restaurant")[i];

				let restaurantPhoto = $(".restaurantPhoto")[i];
				restaurantPhoto.style.height = "200px";
				restaurantPhoto.style.width = "100%";
				restaurantPhoto.style.backgroundImage = 'url(https://maps.googleapis.com/maps/api/streetview?size=300x200&location=' + results[i].geometry.viewport.Za.i+ ',' + results[i].geometry.viewport.Ua.i + '&heading=151.78&pitch=-0.76&key=AIzaSyC9qQyiKfow1J6Cgnk_02d10II9O2ik3NU)';

				let restaurantName = $(".restaurantName")[i];
				restaurantName.style.backgroundColor = "grey";
				restaurantName.innerHTML = results[i].name;

				let restaurantAddress = $(".restaurantAddress")[i];
				restaurantAddress.style.backgroundColor = "grey";
				restaurantAddress.innerHTML = results[i].formatted_address;

				let restaurantRate = $(".restaurantRate")[i];
				restaurantRate.style.backgroundColor = "grey";
				restaurantRate.innerHTML = results[i].rating;

				//Affichage d'une <div> descriptive pour chaque restaurant au click //
				restaurant.addEventListener("click", function(){
					let content = $("#content")[0];
					let div = document.createElement("div");
					content.appendChild(div);
					div.style.position = "absolute";
					div.style.top = "20%";
					div.style.right = "33%";
					div.style.backgroundColor = "white";
					div.style.height = "500px";
					div.style.width = "500px";
					
					//Récupération des avis//
					let place_Id = results[i].place_id;
					let reviewsUrl = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + place_Id + "&fields=review&key=AIzaSyC9qQyiKfow1J6Cgnk_02d10II9O2ik3NU";
					$.getJSON(reviewsUrl, function (data){
						var restaurantOpinions = document.createElement("div");
						div.appendChild(restaurantOpinions);
						restaurantOpinions.className = "restaurantOpinion";
						restaurantOpinions.style.backgroundColor = "grey";
						restaurantOpinions.style.height = "300px";
						restaurantOpinions.style.width = "300px";
						restaurantOpinions.style.overflow = "auto";
							for (let i = 0; i < data.result.reviews.length; i++) {
							var restaurantOpinion = document.createElement("div");
							restaurantOpinions.appendChild(restaurantOpinion);
							restaurantOpinion.innerHTML = data.result.reviews[i].text;
							}
					});
					/////////////////////////
				}.bind(results[i]));
				//////////////////////////////////////////////////////////////////////
			}
		this.inspectList();
	}
//https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=review&key=AIzaSyC9qQyiKfow1J6Cgnk_02d10II9O2ik3NU
	inspectList(){
		let restaurantItems = $("#restaurantItems")[0];
		let restaurant = $(".restaurant");
		let restaurantName = $(".restaurantName");

		for (var i = 0; i < restaurant.length; i++) {
			if (restaurantName[i].innerHTML == "") {
				let parentElt = restaurantName[i].parentElement;
				restaurantItems.removeChild(parentElt);
			}
		}
	}
}

let list = new ListAddress();

