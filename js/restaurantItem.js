
class RestaurantItem {

	constructor(name, place_Id, address, rate, photos, location, marker){
		this.item;
		this.name = name;
		this.place_Id = place_Id;
		this.address = address;
		this.rate = rate;
		if(photos != undefined) {
	        this.photos = photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200});
	    } else {
	        this.photos = "https://www.pwm.ca/wp-content/uploads/2018/08/google-maps.png";
	    }
	    this.location = location;
	    this.marker = marker;
    	this.commentArray = [];
    	if (this.place_Id != null) {
			this.recupComments();
		};
	}

	createItem() {
		let restaurantItemsContent = $("#restaurantItemsContent")[0];

    	let restaurantItem = document.createElement("div");
    		restaurantItem.className = "restaurantItem";
    		this.item = restaurantItem;

		let restaurantPhoto = document.createElement("div");	
			restaurantPhoto.className = "restaurantPhoto";
			restaurantPhoto.style.background = "url(" + this.photos + ") no-repeat center";
			restaurantPhoto.style.backgroundSize = "cover";

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

			// Pour que le restaurant ajouté manuellement s'insère en haut de la liste //
			let restaurantItemList = $(".restaurantItem");
			if (restaurantItemList.length != 0) {
				if(this.place_Id == null){
				let parentDiv = this.item.parentNode;
					parentDiv.insertBefore(this.item, restaurantItemList[0]);
				}
			}

			this.display_modal_RestaurantDescription = this.display_modal_RestaurantDescription.bind(this);
			this.item.addEventListener("click", this.display_modal_RestaurantDescription);
			this.marker.addListener("click", this.display_modal_RestaurantDescription);
	}

	display_modal_RestaurantDescription(){
		$('#modal_RestaurantDescription').modal('toggle');
		let modal_title = $(".modal_RestaurantDescription_title")[0];
			modal_title.innerHTML = this.name;
		let modal_Photo = $(".modal_RestaurantDescription_photo")[0];
			modal_Photo.style.backgroundImage = this.location;
		let modal_Address = $(".modal_RestaurantDescription_address")[0];
			modal_Address.innerHTML = this.address;

		for (let i = 0; i < this.commentArray.length; i++){	
			let comment = new Comment (
				this.commentArray[i].author_name,
				this.commentArray[i].rating,
				this.commentArray[i].text,
				$(".modal_RestaurantDescription_CommentsContent")[0]
				)
			comment.displayComment();
		}

		// Bouton "Ecrire un avis" //
		this.display_modal_AddComment = this.display_modal_AddComment.bind(this);
		let modal_RestaurantDescription_WriteComment = $("#modal_RestaurantDescription_WriteComment")[0]; 
			modal_RestaurantDescription_WriteComment.addEventListener("click", this.display_modal_AddComment);

		// Bouton "Ajouter" //
		this.click_ButtonAddComment = this.click_ButtonAddComment.bind(this);
		let modal_AddComment_ButtonAddComment = $("#modal_AddComment_ButtonAddComment")[0];
			modal_AddComment_ButtonAddComment.addEventListener("click", this.click_ButtonAddComment);

		// Action à la fermeture du modal //
		$("#modal_RestaurantDescription").on('hide.bs.modal', function () {
			modal_AddComment_ButtonAddComment.removeEventListener("click", this.click_ButtonAddComment);
			modal_RestaurantDescription_WriteComment.removeEventListener("click", this.display_modal_AddComment);
			let modal_RestaurantDescription_CommentContentClass = $(".modal_RestaurantDescription_CommentContentClass");
			let modal_RestaurantDescription_CommentsContent = $(".modal_RestaurantDescription_CommentsContent")[0];
				for (var i = 0; i < modal_RestaurantDescription_CommentContentClass.length; i++) {	
					let supprReviews = modal_RestaurantDescription_CommentsContent.removeChild(modal_RestaurantDescription_CommentContentClass[i]);			
				}
		}.bind(this));
	}

	display_modal_AddComment(){
		let modal_RestaurantDescription = $("#modal_RestaurantDescription")[0];
			modal_RestaurantDescription.style.display = "none";

		// Action à la fermeture du modal //
		$("#modal_AddComment").on('hide.bs.modal', function () {
			modal_RestaurantDescription.style.display = "block";
				let author_name = $("#pseudoId")[0].value;
				let rating = $("#ratingId")[0].value;
				let text = $("#commentId")[0].value;
				$("#pseudoId").val("");
				$("#commentId").val("");
				$("#ratingId").val("");
		});
	}


	click_ButtonAddComment(){
		let modal_RestaurantDescription = $("#modal_RestaurantDescription")[0];
		let author_name = $("#pseudoId")[0].value;
		let rating = $("#ratingId")[0].value;
		let text = $("#commentId")[0].value;
		let myComment = {
			author_name,
			rating,
			text
		}

		let commentArray2 = this.commentArray.push(myComment);

		myComment = new Comment(
			myComment.author_name, 
			myComment.rating, 
			myComment.text,
			$(".modal_RestaurantDescription_CommentsContent")[0]
		);
		myComment.displayComment();
	}



	recupComments(){
		//Requete HTML pour récupérer les avis GOOGLE PLACES
		let reviewsUrl = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + this.place_Id + "&fields=review&key=AIzaSyC9qQyiKfow1J6Cgnk_02d10II9O2ik3NU";
		let request = new XMLHttpRequest();
			request.open('GET', reviewsUrl);
			request.responseType = 'json';
			request.send();
		request.onload = function () {
		  let data = request.response;
		  this.recupComments1(data);
		}.bind(this)
	}

	recupComments1(data) {
		this.commentArray = data.result.reviews;
	}
}