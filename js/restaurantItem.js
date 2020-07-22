
class RestaurantItem {

	constructor(name, place_Id, address, rate, photo){
		this.item;
		this.name = name;
		this.place_Id = place_Id;
		this.address = address;
		this.rate = rate;
		this.photo = photo;
    	this.reviewsArray = [];
		this.displayReviews();
		
	}

	createItem() {
		let restaurantItemsContent = $("#restaurantItemsContent")[0];

    	let restaurantItem = document.createElement("div");
    		restaurantItem.className = "restaurantItem";
    		this.item = restaurantItem;
	    	this.item.setAttribute("data-toggle", "modal");
	    	this.item.setAttribute("data-target", "#modal_RestaurantDescription");

		let restaurantPhoto = document.createElement("div");	
			restaurantPhoto.className = "restaurantPhoto";
			restaurantPhoto.style.backgroundImage = this.photo;

		let restaurantName = document.createElement("div");		
			restaurantName.className = "restaurantName";
			restaurantName.innerHTML = this.name;
		
		let restaurantAddress = document.createElement("div");
			restaurantAddress.className = "restaurantAddress";
			restaurantAddress.innerHTML = this.address;
		
		let restaurantRate = document.createElement("div");
			restaurantRate.className = "restaurantRate";
			restaurantRate.innerHTML = this.rate;

			restaurantItemsContent.appendChild(this.item);
			this.item.appendChild(restaurantPhoto);
			this.item.appendChild(restaurantName);
			this.item.appendChild(restaurantAddress);
			this.item.appendChild(restaurantRate);	

			this.displayModal = this.displayModal.bind(this);
			this.item.addEventListener("click", this.displayModal);
	}

	displayModal(){
		let modal_title = $(".modal_RestaurantDescription_title")[0];
			modal_title.innerHTML = this.name;
		let modal_Photo = $(".modal_RestaurantDescription_photo")[0];
			modal_Photo.style.backgroundImage = this.photo;
		let modal_Address = $(".modal_RestaurantDescription_address")[0];
			modal_Address.innerHTML = this.address;

		for (let i = 0; i < this.reviewsArray.length; i++){	
			let comment = new Comment (
				this.reviewsArray[i].author_name,
				this.reviewsArray[i].rating,
				this.reviewsArray[i].text,
				$(".modal_RestaurantDescription_ReviewsContent")[0]
				)
			comment.displayComment();
		}

		this.addMyReview = this.addMyReview.bind(this);
		let modal_AddComment_ButtonAddReview = $("#modal_AddComment_ButtonAddReview")[0]; //Bouton "Ajouter" après avoir rempli l'input (name, rating, comment)//		
			modal_AddComment_ButtonAddReview.addEventListener("click", this.addMyReview);
	
		$("#modal_RestaurantDescription").on('hide.bs.modal', function () {
			modal_AddComment_ButtonAddReview.removeEventListener("click", this.addMyReview);
			let modal_RestaurantDescription_CommentContentClass = $(".modal_RestaurantDescription_CommentContentClass");
			let modal_RestaurantDescription_ReviewsContent = $(".modal_RestaurantDescription_ReviewsContent")[0];
				for (var i = 0; i < modal_RestaurantDescription_CommentContentClass.length; i++) {	
					let supprReviews = modal_RestaurantDescription_ReviewsContent.removeChild(modal_RestaurantDescription_CommentContentClass[i]);			
				}
		}.bind(this));
	}

	/////////////////////////
	// VALIDATION D'UN AVIS
	/////////////////////////
	addMyReview(){
		let modal_RestaurantDescription = $("#modal_RestaurantDescription")[0];
		let modal_AddComment = $("#modal_AddComment")[0];
		let author_name = $("#pseudoId")[0].value;
		let rating = $("#ratingId")[0].value;
		let text = $("#commentId")[0].value;
		let myComment = {
			author_name,
			rating,
			text
		}

		let reviewsArray2 = this.reviewsArray.push(myComment);

		myComment = new Comment(
			myComment.author_name, 
			myComment.rating, 
			myComment.text,
			$(".modal_RestaurantDescription_ReviewsContent")[0]
		);
		console.log(this.reviewsArray);
		myComment.displayComment();
		
		modal_RestaurantDescription.style.display = "block";
		modal_AddComment.style.display = "none";
	}


	displayReviews(){
		//Requete HTML pour récupérer les avis GOOGLE PLACES
		let reviewsUrl = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + this.place_Id + "&fields=review&key=AIzaSyC9qQyiKfow1J6Cgnk_02d10II9O2ik3NU";
		//let self = this;
		let request = new XMLHttpRequest();
			request.open('GET', reviewsUrl);
			request.responseType = 'json';
			request.send();
		request.onload = function () {
		  let data = request.response;
		  this.displayReviews1(data);
		}.bind(this)
	}

	displayReviews1(data) {
		this.reviewsArray = data.result.reviews;
	}
}