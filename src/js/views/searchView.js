import { elements,elementStrings } from "./base";

export const getInput = () => {
    const query = elements.SearchInput.value;
    return query;
};

const limitRecipeTitle = (title,limit = 17) => {
   
    let l = 0;
    const wl = title.length;
    if(title.length > limit){
        const pTitle = title.split(' ');
        const newTitle = [];
        pTitle.forEach(el => {
            l = l + el.length;
            if (l<limit) {
                newTitle.push(el);
            }else{
                title = newTitle.join(' ') + '...';
            };
        });
    }

    return title;
};

const renderRecipe = (recipe) => {
    const markup = 
        ` <div class="recipe-list-item" id="${recipe.id}">
            <a href="#" class="recipe-list-link">
                <div class="recipe-img-box">
                    <img src="${recipe.image}" alt="recipe-1" class="recipe-img">
                </div>
                <div class="recipe-details">
                    <div class="recipe-name">
                        ${limitRecipeTitle(recipe.title)}
                    </div>
                    <div class="recipe-from">
                        ${recipe.sourceName}
                    </div>
                </div>
            </a>
        </div>`;
        
    elements.recipeList.insertAdjacentHTML('beforeend',markup);
};


const renderRecipeActive = (recipe) => {
    const markup = 
        ` <div class="recipe-list-item active" id="${recipe.id}">
            <a href="#" class="recipe-list-link">
                <div class="recipe-img-box">
                    <img src="${recipe.image}" alt="recipe-1" class="recipe-img">
                </div>
                <div class="recipe-details">
                    <div class="recipe-name">
                        ${limitRecipeTitle(recipe.title)}
                    </div>
                    <div class="recipe-from">
                        ${recipe.sourceName}
                    </div>
                </div>
            </a>
        </div>`;
        
    elements.recipeList.insertAdjacentHTML('beforeend',markup);
};



const showButton = (pageNum,type) => {
    let button = '';
    if (type === 'prev') {
        button = `
        <div class="navigation-page">  
            <div class="previous page-btn" data-goto="${pageNum-1}">
                <a href="#" class="navigation-link">
                &larr; &nbsp; page-${pageNum-1} 
                </a>
            </div>
        </div>
        `;
    } else {
        button = `
        <div class="navigation-page">   
            <div class="next page-btn" data-goto="${pageNum+1}">
                <a href="#" class="navigation-link">
                    page-${pageNum+1} &nbsp; &rarr;
                </a>
            </div>
        </div>
        `;
    };

    elements.recipeList.insertAdjacentHTML('beforeend',button);
};

const showBothButton = (pageNum) => {
    const markup = `
        <div class="navigation-page">  
                        
            <div class="previous page-btn" data-goto="${pageNum-1}">
                <a href="#" class="navigation-link">
                    &larr; &nbsp; page-${pageNum-1} 
                </a>
            </div>

            <div class="next page-btn" data-goto="${pageNum+1}">
                <a href="#" class="navigation-link">
                    page-${pageNum+1} &nbsp; &rarr;
                </a>
            </div>
        
    </div>
    `;

    elements.recipeList.insertAdjacentHTML('beforeend',markup);
};

export const renderRecipes = (recipes,pageNum,recipePerPage = 10) => {

    const totalPages = Math.ceil(recipes.length / recipePerPage);
    const start = (pageNum-1)*10;
    const end = pageNum*10;

    const recipePart = recipes.slice(start,end);
    recipePart.forEach(el => {
        if (recipePart.indexOf(el)===0) {
            renderRecipeActive(el);
        } else {
            renderRecipe(el);
        }
    });

    

    if (pageNum === 1) {
        // Show only Next Button 
        showButton(pageNum,'next');
    } else if(pageNum === totalPages) {
        // Show only Prev Button
        showButton(pageNum,'prev');
    }else{
        // Show both next and prev button
        showBothButton(pageNum);
    }

};

export const clearInput = () => {
    elements.SearchInput.value = ' ';
};

export const clearResults = () => {
    elements.recipeList.innerHTML = '';
};

export const addSearchLoader = () => {
    const loader = 
    `<div class="loader-box">
        <img src="img/iconSVG3/SVG/ccw.svg" class="loader-img">
    </div>`;
    elements.recipeList.insertAdjacentHTML('afterbegin',loader);
};

export const removeSearchLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    elements.recipeList.removeChild(loader);
};


