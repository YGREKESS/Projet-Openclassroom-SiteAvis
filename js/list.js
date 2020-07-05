
class ListAddress{

	constructor(name, address, rate, opinion){
    	this.list = [];
		this.name = name;
		this.address = address;
		this.rate = rate;
		this.opinion = opinion;
	}

	generateList(results) {
		var restaurantList = $("#restaurantList")[0];

	    for (var i = 0; i <= results.length; i++) {
			var restaurant = document.createElement("div");
			restaurantList.appendChild(restaurant);
			restaurant.className = "restaurant";
			restaurant.style.height = "auto";
			restaurant.style.width = "100%";
			restaurant.style.backgroundColor = "yellow";
			restaurant.style.border = "1px solid";
			restaurant.style.boxSizing= "border-box";
			restaurant.style.textAlign = "center";    
			this.list.push(restaurant);
	    }
    }

	deleteList(){
		let supprArray = this.list.splice(0, this.list.length);
		this.generateList(supprArray);
	}

	createRestaurant(results){
		this.generateList(results);

	    for (var i = 0; i < results.length; i++) {
			var restaurant = $(".restaurant")[i];

			var restaurantName = document.createElement("div");
			restaurant.appendChild(restaurantName);
			restaurantName.className = "restaurantName";
			restaurantName.style.backgroundColor = "grey";
			restaurantName.innerHTML = results[i].name;	

			var restaurantAddress = document.createElement("div");
			restaurant.appendChild(restaurantAddress);
			restaurantAddress.className = "restaurantAddress";
			restaurantAddress.style.backgroundColor = "grey";
			restaurantAddress.innerHTML = results[i].formatted_address;

			var restaurantRate = document.createElement("div");
			restaurant.appendChild(restaurantRate);
			restaurantRate.className = "restaurantRate";
			restaurantRate.style.backgroundColor = "grey";
			restaurantRate.innerHTML = results[i].name;

			var restaurantOpinion = document.createElement("button");
			restaurant.appendChild(restaurantOpinion);
			restaurantOpinion.className = "restaurantOpinion";
			restaurantOpinion.textContent = "Avis";
		}
	}
}

let list = new ListAddress();

