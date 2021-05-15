import {elements} from './base';

 const renderLikeItem = (item) => {
    const markup = `

<div class="recipe-list-item" id="${item.id}">
<a href="#" class="recipe-list-link">
    <div class="recipe-img-box">
        <img src="${item.recipeImage}" alt="recipe-1" class="recipe-img">
    </div>
    <div class="recipe-details">
        <div class="recipe-name">
        ${item.recipeName}
        </div>
        <div class="recipe-from">
        ${item.source}
        </div>
    </div>
</a>
</div>
    `;

    elements.likesList.insertAdjacentHTML('beforeend',markup); 
};

export const renderLikeItems = (items) => {
    items.forEach(el => {
        renderLikeItem(el);
    });
};