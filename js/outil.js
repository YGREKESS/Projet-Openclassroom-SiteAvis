/*
/////////////////////////
// VALIDATION D'UN AVIS
/////////////////////////
let modal_AddComment_ButtonAddReview = $("#modal_AddComment_ButtonAddReview")[0]; //Bouton "Ajouter" après avoir rempli l'input (name, rating, comment)//
	modal_AddComment_ButtonAddReview.addEventListener("click", function(){
	let modal_RestaurantDescription = $("#modal_RestaurantDescription")[0];
	let modal_AddComment = $("#modal_AddComment")[0];
	let pseudo = $("#pseudoId")[0].value;
	let rating = $("#ratingId")[0].value;
	let comment = $("#commentId")[0].value;

	let myComment = new Comment(pseudo, rating, comment);
	myComment.displayComment();

	modal_RestaurantDescription.style.display = "block";
	modal_AddComment.style.display = "none";
});



//////////////////////////////////////////////////
// FERMETURE DU MODAL EN CLIQUANT SUR LA CROIX
//////////////////////////////////////////////////
let addModal_CrossClose = $("#addModal_CrossClose")[0];
	addModal_CrossClose.addEventListener("click", function(){
		let modal_RestaurantDescription = $("#modal_RestaurantDescription")[0];
			modal_RestaurantDescription.style.display = "block";
});

*/

			//////////////////////////////
			// BOUTON D'AJOUT D'UN AVIS
			//////////////////////////////
			let modal_RestaurantDescription_WriteReview = $("#modal_RestaurantDescription_WriteReview")[0]; // Bouton "Ecrire un avis"	
				modal_RestaurantDescription_WriteReview.addEventListener("click", displayAddModal, {once: true});

			function displayAddModal(){
				let modal_RestaurantDescription = $("#modal_RestaurantDescription")[0];
				let modal_AddComment = $("#modal_AddComment")[0];
				modal_RestaurantDescription.style.display = "none";
			}



			//////////////////////////////////////////////////
			// FERMETURE DU MODAL EN CLIQUANT SUR LA CROIX
			//////////////////////////////////////////////////
			let addModal_CrossClose = $("#addModal_CrossClose")[0];
				addModal_CrossClose.addEventListener("click", function(){
					let modal_RestaurantDescription = $("#modal_RestaurantDescription")[0];
						modal_RestaurantDescription.style.display = "block";
			});