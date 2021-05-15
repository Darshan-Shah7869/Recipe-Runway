export  default class Likes {

    constructor(){
        this.likesItems = [];
    }

    addItem(id,recipeName,source,recipeImage){
        const item = {
            id,
            recipeName,
            source,
            recipeImage
        };
        this.likesItems.push(item);

        // Save inside the local storage
        this.saveInLocalStorage(); 

    }

    deleteItem(id){
        const index = this.likesItems.findIndex(el => id === el.id);
        this.likesItems.splice(index, 1); 

        // Save inside the local storage
        this.saveInLocalStorage(); 
    }

    saveInLocalStorage(){
        localStorage.setItem('likes', JSON.stringify(this.likesItems));
    }

    readFromLocalStorage(){
        const storage = JSON.parse(localStorage.getItem('likes')); 
        if(storage){
            this.likesItems = storage; 
        }; 
    }

};