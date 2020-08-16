class Comment {

	constructor(name, rating, comment, htmlNode){
    this.name = name;
    this.rating = rating;
    this.comment = comment;
    this.htmlNode = htmlNode;
    }

    ////////////////////////////////
    // AFFICHAGE DES COMMENTAIRES //
    ////////////////////////////////
	displayComment() {
        let modal_commentNameClass = document.createElement("div");
        	modal_commentNameClass.className = "modal_commentNameClass";
        let modal_commentRatingClass = document.createElement("div");
        	modal_commentRatingClass.className = "modal_commentRatingClass";
        let modal_commentStarsClass = document.createElement("div");
            modal_commentStarsClass.className = "modal_commentStarsClass";
        let modal_commentCommentClass = document.createElement("div");
        	modal_commentCommentClass.className = "modal_commentCommentClass";
        let modal_RestaurantDescription_CommentContentClass = document.createElement("div");
            modal_RestaurantDescription_CommentContentClass.className = "modal_RestaurantDescription_CommentContentClass";  
	        modal_RestaurantDescription_CommentContentClass.appendChild(modal_commentNameClass);
	        modal_RestaurantDescription_CommentContentClass.appendChild(modal_commentRatingClass); 
            modal_RestaurantDescription_CommentContentClass.appendChild(modal_commentStarsClass); 
	        modal_RestaurantDescription_CommentContentClass.appendChild(modal_commentCommentClass);
            
        modal_commentNameClass.textContent = "Pseudo : " + this.name;
        modal_commentRatingClass.textContent = this.rating + " étoile(s)";

        let x = Math.floor(this.rating);

        if (x === 1) {modal_commentStarsClass.style.background = "url('img/1_star.png') no-repeat ";}
        else if (x === 2) {modal_commentStarsClass.style.background = "url('img/2_stars.png') no-repeat ";}
        else if (x === 3) {modal_commentStarsClass.style.background = "url('img/3_stars.png') no-repeat ";}
        else if (x === 4) {modal_commentStarsClass.style.background = "url('img/4_stars.png') no-repeat ";}
        else if (x === 5) {modal_commentStarsClass.style.background = "url('img/5_stars.png') no-repeat ";}
        else {modal_commentStarsClass.style.background = "url('img/0_star.png') no-repeat ";};
 
        modal_commentCommentClass.textContent = "Commentaire : " + this.comment;
        this.htmlNode.appendChild(modal_RestaurantDescription_CommentContentClass);
	}
}