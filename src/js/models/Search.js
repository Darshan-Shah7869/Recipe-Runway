import Axios from "axios";
export default class Search {

    constructor(query){
        this.query = query;
    }

    async getRecipes(){
        const apiKey = 'd6c274d234994c188ce7a2461d2e6ac0';
        const number = 30;
        try {
            const result = await Axios(`https://api.spoonacular.com/recipes/complexSearch?query=${this.query}&apiKey=${apiKey}&number=${number}&addRecipeInformation=true`);
             this.recipes = result.data.results;
            // console.log(this.recipes);
        } catch (error) {
            alert(error);
        }
    }

};