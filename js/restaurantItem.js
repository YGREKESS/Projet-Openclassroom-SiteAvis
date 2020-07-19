
class RestaurantItem {

	constructor(name, place_Id, address, rate, photo){
		this.name = name;
		this.place_Id = place_Id;
		this.address = address;
		this.rate = rate;
		this.photo = photo;
    	this.listReviews = [];
	}

	createItem() {
		//let restaurantList = this.list.splice(0, this.list.length); // Pour que la liste se réinitialise à chaque recherche
		let restaurantItemsContent = $("#restaurantItemsContent")[0];

	    	var restaurantItem = document.createElement("button");
		    	restaurantItem.className = "restaurantItem";
		    	restaurantItem.setAttribute("data-toggle", "modal");
		    	restaurantItem.setAttribute("data-target", "#restaurantModal");
				restaurantItem.style.height = "auto";
				restaurantItem.style.width = "100%";
				restaurantItem.style.backgroundColor = "white";
				restaurantItem.style.border = "1px solid";
				restaurantItem.style.boxSizing= "border-box";
				restaurantItem.style.textAlign = "center";    
			//this.list.push(restaurantItem);
			
			var restaurantPhoto = document.createElement("div");	
				restaurantPhoto.className = "restaurantPhoto";
				restaurantPhoto.style.height = "200px";
				restaurantPhoto.style.width = "100%";
				restaurantPhoto.style.backgroundImage = this.photo;
			var restaurantName = document.createElement("div");		
				restaurantName.className = "restaurantName";
				restaurantName.innerHTML = this.name;
			var restaurantAddress = document.createElement("div");
				restaurantAddress.className = "restaurantAddress";
				restaurantAddress.innerHTML = this.address;
			var restaurantRate = document.createElement("div");
				restaurantRate.className = "restaurantRate";
				restaurantRate.innerHTML = this.rate;

			restaurantItemsContent.appendChild(restaurantItem);
			restaurantItem.appendChild(restaurantPhoto);
			restaurantItem.appendChild(restaurantName);
			restaurantItem.appendChild(restaurantAddress);
			restaurantItem.appendChild(restaurantRate);
			// Affichage d'un modal au clic 
			restaurantItem.addEventListener("click", function(e){
			
				let body = $("body")[0];
				let restaurantModal = $("#restaurantModal")[0];
					restaurantModal.style.display = "block";
					restaurantModal.style.opacity = "1";
					restaurantModal.style.textAlign = "center";
					restaurantModal.style.height = "auto";
					body.appendChild(restaurantModal);

				let modal_title = $(".modal_title")[0];
					modal_title.innerHTML = this.name;

				let modal_Photo = $(".modal_photo")[0];
					modal_Photo.style.height = "200px";
					modal_Photo.style.width = "250px";
					modal_Photo.style.margin = "auto";
					modal_Photo.style.backgroundImage = this.photo;

				let modal_Address = $(".modal_address")[0];
					modal_Address.innerHTML = this.address;

				//Requete HTML pour récupérer les avis GOOGLE PLACES
				let reviewsUrl = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + this.place_Id + "&fields=review&key=AIzaSyC9qQyiKfow1J6Cgnk_02d10II9O2ik3NU";
				let request = new XMLHttpRequest();
					request.open('GET', reviewsUrl);
					request.responseType = 'json';
					request.send();
				request.onload = function() {
				  let data = request.response;
				  displayReviews(data);
				}
				//name, rating, comment
				function displayReviews(data) {
					for (let i = 1; i < data.result.reviews.length; i++){
						let comment = new Comment (
							data.result.reviews[i].author_name,
							data.result.reviews[i].rating,
							data.result.reviews[i].text,
							)
						comment.displayComment();
					}
				}

				//Evenement se déclenchant à la fermeture du modal//		
				$("#restaurantModal").on('hide.bs.modal', function () {
					let modal_CommentContentClass = $(".modal_CommentContentClass");
					let modal_ReviewsContent = $(".modal_ReviewsContent")[0];
					for (var i = 0; i < modal_CommentContentClass.length; i++) {
						let supprReviews = modal_ReviewsContent.removeChild(modal_CommentContentClass[i]);			
					}
				});
			}.bind(this));	
	}
}


