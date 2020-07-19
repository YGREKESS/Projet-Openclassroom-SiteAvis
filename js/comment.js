/**
 * Commentaires
 * @constructor
 * @param {string} (name )    Le nom de l' auteur du commentaire
 * @param {number} (rating)   La note du commentaire
 * @param {string} (comment)  Le contenu du commentaire
 * @param {object} (itemNode) Le noeud html
 */
class Comment {

	constructor(name, rating, comment){
    this.name = name;
    this.rating = rating;
    this.comment = comment;
    }

	displayComment() {
		let modal_ReviewsContent = $(".modal_ReviewsContent")[0]; // Div contenant tous les avis de chaque restaurant
        let modal_commentNameClass = document.createElement("div");
        	modal_commentNameClass.className = "modal_commentNameClass";
        let modal_commentRatingClass = document.createElement("div");
        	modal_commentRatingClass.className = "modal_commentRatingClass";
        let modal_commentCommentImg = document.createElement("div");
        	modal_commentCommentImg.className = "modal_commentCommentImg";
        let modal_commentCommentClass = document.createElement("div");
        	modal_commentCommentClass.className = "modal_commentCommentClass";
        let modal_CommentContentClass = document.createElement("div");
        	modal_CommentContentClass.className = "modal_CommentContentClass";
	        modal_CommentContentClass.appendChild(modal_commentNameClass);
	        modal_CommentContentClass.appendChild(modal_commentRatingClass); 
	        modal_CommentContentClass.appendChild(modal_commentCommentImg); 
	        modal_CommentContentClass.appendChild(modal_commentCommentClass);

        // pseudo
        modal_commentNameClass.textContent = "Pseudo : " + this.name;

        // note
        let x = Math.floor(this.rating);
        modal_commentRatingClass.textContent = "Note : " + x;
 
        

        /*if (x === 1) {starElm.src = "../img/1_star.png";}
        else if (x === 2) {starElm.src = "../img/2_stars.png";}
        else if (x === 3) {starElm.src = "../img/3_stars.png";}
        else if (x === 4) {starElm.src = "../img/4_stars.png";}
        else if (x === 5) {starElm.src = "../img/5_stars.png";}
        else {starElm.src = "../img/0_star.png";};
        var starElm = commentNode.insertBefore(starElm, commentNode.querySelector('.commentCommentClass'));*/
        // modal comment
        //this.itemNode.querySelector('#buttonModalAddCommentId').display = "none";
        // commentaire
        modal_commentCommentClass.textContent = "Commentaire : " + this.comment;
        // appendchild
        modal_ReviewsContent.appendChild(modal_CommentContentClass);
	}
}