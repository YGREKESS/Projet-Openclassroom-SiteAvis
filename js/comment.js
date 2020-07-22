class Comment {

	constructor(name, rating, comment, htmlNode){
    this.name = name;
    this.rating = rating;
    this.comment = comment;
    this.htmlNode = htmlNode;
    }

	displayComment() {
        let modal_commentNameClass = document.createElement("div");
        	modal_commentNameClass.className = "modal_commentNameClass";
        let modal_commentRatingClass = document.createElement("div");
        	modal_commentRatingClass.className = "modal_commentRatingClass";
        let modal_commentCommentImg = document.createElement("div");
        	modal_commentCommentImg.className = "modal_commentCommentImg";
        let modal_commentCommentClass = document.createElement("div");
        	modal_commentCommentClass.className = "modal_commentCommentClass";
        let modal_RestaurantDescription_CommentContentClass = document.createElement("div");
            modal_RestaurantDescription_CommentContentClass.className = "modal_RestaurantDescription_CommentContentClass";  
	        modal_RestaurantDescription_CommentContentClass.appendChild(modal_commentNameClass);
	        modal_RestaurantDescription_CommentContentClass.appendChild(modal_commentRatingClass); 
	        modal_RestaurantDescription_CommentContentClass.appendChild(modal_commentCommentImg); 
	        modal_RestaurantDescription_CommentContentClass.appendChild(modal_commentCommentClass);

        modal_commentNameClass.textContent = "Pseudo : " + this.name;

        let x = Math.floor(this.rating);
        modal_commentRatingClass.textContent = "Note : " + x;
 
        modal_commentCommentClass.textContent = "Commentaire : " + this.comment;
        this.htmlNode.appendChild(modal_RestaurantDescription_CommentContentClass);

	}
}