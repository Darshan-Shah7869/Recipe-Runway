import Axios from "axios";
export default class {

    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        const apiKey = 'd6c274d234994c188ce7a2461d2e6ac0';
        try {
            const result = await Axios(`https://api.spoonacular.com/recipes/${this.id}/information?includeNutrition=false&apiKey=${apiKey}`); 
            this.image = result.data.image;
            this.readyInMinutes = result.data.readyInMinutes;
            this.servings = result.data.servings;
            this.title = result.data.title;
            this.sourceName = result.data.sourceName;
            this.sourceUrl = result.data.sourceUrl;
            this.extendedIngredients = result.data.extendedIngredients;    
        } catch (error) {
            alert(error);
        }
    }

}