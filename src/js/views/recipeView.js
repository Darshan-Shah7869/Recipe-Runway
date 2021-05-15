import {elements} from "./base";


export const clearRecipeSpace = () => {
    elements.mainBottom.innerHTML = '';
    elements.ingredientBox.innerHTML = '';
    elements.imageBox.innerHTML = '';
    elements.detailBox.innerHTML = '';
    
    if(document.querySelector('.shopping-list-btn')){
        document.querySelector('.shopping-list-btn').parentNode.removeChild(document.querySelector('.shopping-list-btn'));
    };
};

const insertImage = (image,name) => {
    const markup = `
        <img src="${image}" alt="" class="recipe-main-img">
        <h1 class="recipe-main-title-box">
            <span class="recipe-main-title">
                ${name}
            </span>
        </h1>
    `;

    elements.imageBox.insertAdjacentHTML('afterbegin',markup);
};

const insertDetail = (time,servings) => {
    const markup = `
        <div class="recipe-main-time">
        <img src="./img/iconSVG/SVG/stopwatch.svg" class="icon" alt=""> 
       ${time} minutes
    </div>
    <div class="recipe-main-servings">
        <img src="./img/iconSVG/SVG/man.svg" class="icon" alt=""> 
        <span class="servings">${servings} servings</span>
        <div class="inc-dec-box">
            <img src="./img/iconSVG4/SVG/circle-with-plus.svg" alt="" class="plus">
            <img src="./img/iconSVG4/SVG/circle-with-minus.svg" alt="" class="minus">
        </div>
    </div>
    <input type="checkbox" name="like" id="like-check" class="like-check">
    <label for="like-check" class="recipe-main-like-box">
        <img src="./img/iconSVG2/SVG/heart-outlined.svg" alt="" class="icon-1">
        <img src="./img/iconSVG2/SVG/heart-sec.svg" alt="" class="icon-2"> 
    </label> 
    `;  

    elements.detailBox.insertAdjacentHTML('afterbegin',markup);
};

const insertIngredients = (ingredients) => {
    ingredients.forEach(el => {
        const markup = `
        <li class="recipe-main-ingredients">
            <img src="./img/iconSVG/SVG/checkbox-checked.svg" alt="" class="icon">${el.measures.us.amount} ${el.measures.us.unitShort} ${el.name}
        </li>
        `;
        elements.ingredientBox.insertAdjacentHTML('beforeend',markup);
    });
};

const insertBottom = (sourceName,URL) => {
    const markup = `
        <h2 class="main-bottom-heading">
            How to cook it 
        </h2>
        <p class="main-bottom-text">
            The recipe was carefully designed and tested by <a href="${URL}" target="_blank" class="cite-name">${sourceName}</a>. Please checkout directions at their website.
        </p>
        <a href="${URL}" target="_blank" class="direction-link">
            <button class="main-bottom-btn">
                Direction <span class="arrow">&rarr;</span>
            </button>
        </a>    
    `;

    elements.mainBottom.insertAdjacentHTML('afterbegin',markup);
};

const insertShoppingButton = () => {
    const markup = `
         <button class="shopping-list-btn">
        <img src="./img/iconSVG/SVG/shopping-cart.svg" alt="" class="icon">    
        Add to shopping list
    </button> 
    `;
    elements.ingredientBox.insertAdjacentHTML('afterend',markup); 
};

export const renderRecipe = async  (recipe) => {
    clearRecipeSpace();
    console.log(recipe);
    await insertImage(recipe.image,recipe.title);
    await insertDetail(recipe.readyInMinutes,recipe.servings); 
    await insertIngredients(recipe.extendedIngredients);
    await insertShoppingButton(); 
    await insertBottom(recipe.sourceName,recipe.sourceUrl);
};

export const updateRecipeIngredients = (type, recipe) => {
    const old = recipe.servings;

    if(type === 'plus'){
        recipe.servings = recipe.servings + 1; 
       
    }else{
        if(recipe.servings > 1){
            recipe.servings = recipe.servings - 1;
        }; 
    };

    recipe.extendedIngredients.forEach(el => {
        el.measures.us.amount = (el.measures.us.amount / old )* recipe.servings;
    });
};

