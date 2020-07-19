class App {

	constructor(){		
		
	    //this.refresh();
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
}