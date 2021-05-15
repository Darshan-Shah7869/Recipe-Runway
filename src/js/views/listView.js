import {elements} from './base'; 

export const renderListItem = (item) => {
    console.log(item); 
   const markup = `
    <li class="shopping-list-item" id="${item.id}">
                           <div class="shopping-list-count">
                                <input type="number" name="${item.unit}"  value="${item.count}" step="${item.count}" class="shopping-list-number">
                                <p class="shopping-list-unit">${item.unit}</p>
                           </div>
                           <p class="shopping-list-description">
                           ${item.ingredient}
                           </p>
                           <button class="shopping-list-btn">
                                <img src="./img/iconSVG2/SVG/circle-with-cross.svg" alt="" class="icon">
                           </button>
                        </li>
   `;

   elements.shoppingList.insertAdjacentHTML('beforeend',markup); 

}; 

export const deleteListItem = (id) => {
    const item = document.getElementById(id);
    item.parentNode.removeChild(item); 
};



