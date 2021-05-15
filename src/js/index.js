import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./Models/List";
import Likes from "./Models/Likes";

import { elements } from "./views/base";

import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import * as likesView from "./views/likesView";

const state = {};
state.likes = new Likes();
// Restoring likes from the local storage when the page loads 

window.addEventListener('load', () => { 
  // Create the state.likes
  state.likes = new Likes();
  
  // Store all the data that is in the local storage in the state likes
  state.likes.readFromLocalStorage(); 

  // Check if there is data in the state likes and if there is then Render all the date to the screen
  if(state.likes.likesItems.length !==0){
    document.querySelector(".like-box").style.visibility = "visible";   
    likesView.renderLikeItems(state.likes.likesItems);
  };  
  
});

// Search Controller

const controlSearch = async () => {
  // 1. Get Query from view
  const query = searchView.getInput();

  if (query) {
    state.search = new Search(query);
  }
  // 2. Prepare UI for the result
  searchView.clearInput();
  searchView.clearResults();
  searchView.addSearchLoader();
  // 3. Search for the recipes

  await state.search.getRecipes();

  // 4. Render results on the UI
  searchView.removeSearchLoader();
  await searchView.renderRecipes(state.search.recipes, 1);
};

elements.SearchButton.addEventListener("click", controlSearch);

elements.recipeList.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.closest(".page-btn")) {
    const page = parseInt(e.target.closest(".page-btn").dataset.goto);
    searchView.clearInput();
    searchView.clearResults();
    searchView.renderRecipes(state.search.recipes, page);
  }
});

// Recipe Controller

const checkLike = () => {
  const id = state.recipe.id;
  const likeIds = state.likes.likesItems.map((el) => {
    return el.id;
  });

  const result = likeIds.findIndex((el) => el === id);

  if (result !== -1) {
    document.querySelector(".like-check").setAttribute("checked", "checked");
  } else {
    document.querySelector(".like-check").removeAttribute("checked");
  }
};

elements.recipeList.addEventListener("click", async (e) => {
  e.preventDefault();
  const item = e.target.closest(".recipe-list-item");
  if (item) {
    item.parentNode.querySelector(".active").classList.remove("active");
    const id = item.id;
    item.classList.add("active");
    try {
      state.recipe = new Recipe(id);
      await state.recipe.getRecipe();
      await recipeView.renderRecipe(state.recipe);
    } catch (error) {
      alert(error);
    }
  }

  checkLike();
});

// List Controller

const controlList = () => {
  // Create a new list IF there in none yet
  if (!state.list) state.list = new List();

  // Add each ingredient to the list and UI
  state.recipe.extendedIngredients.forEach((el) => {
    const item = state.list.addItem(
      el.measures.us.amount,
      el.measures.us.unitShort,
      el.name
    );
    listView.renderListItem(item);
  });

  console.log(state.list);
};

const controlLikes = () => {
  // 1. Create the likes object in the state object

  if (!state.likes) {
    state.likes = new Likes();
  }

  // 2. Check if the selected items is in the likes object or not
  const id = state.recipe.id;
  const likeIds = state.likes.likesItems.map((el) => {
    return el.id;
  });

  const result = likeIds.findIndex((el) => el === id);

  if (result !== -1) {
    // 1. Delete the item from the state likes
    state.likes.deleteItem(id);

    // 3. Delete the item from the likes UI
    elements.likesList.innerHTML = "";
    likesView.renderLikeItems(state.likes.likesItems);
  } else {
    // 1. Add the item to the state like
    state.likes.addItem(
      id,
      state.recipe.title,
      state.recipe.sourceName,
      state.recipe.image
    );

    // 3. Add the item to the likes UI
    elements.likesList.innerHTML = "";
    likesView.renderLikeItems(state.likes.likesItems);
  }
  // 3. Visible the Like List on the screen

  if (state.likes.likesItems.length === 0) {
    // elements.likesList.parentNode.parentNode.style.visibility = 'hidden';
    document.querySelector(".like-box").style.visibility = "hidden";
  } else {
    // elements.likesList.parentNode.parentNode.style.visibility = 'visible';
    document.querySelector(".like-box").style.visibility = "visible";
  }
};

// All the event listeners that are in the main recipe box

elements.recipeBox.addEventListener("click", (e) => {
  if (e.target.matches(".minus")) {
    recipeView.updateRecipeIngredients("minus", state.recipe);
    recipeView.clearRecipeSpace();
    recipeView.renderRecipe(state.recipe);
  } else if (e.target.matches(".plus")) {
    recipeView.updateRecipeIngredients("plus", state.recipe);
    recipeView.clearRecipeSpace();
    recipeView.renderRecipe(state.recipe);
  } else if (e.target.matches(".shopping-list-btn, .shopping-list-btn *")) {
    controlList();
  } else if (
    e.target.matches(".recipe-main-like-box,.recipe-main-like-box *")
  ) {
    controlLikes();
  }
});

// All the event listeners that are in the shopping List

elements.shoppingList.addEventListener("click", (e) => {
  if (e.target.closest(".shopping-list-btn")) {
    const item = e.target.closest(".shopping-list-btn");
    const itemId = item.parentNode.id;
    // Delete the list item form the state list
    state.list.items.forEach((el) => {
      if (el.id === itemId) {
        const index = state.list.items.indexOf(el);
        state.list.items.splice(index, 1);
      }
    });

    // Remove the list item from the shopping list UI
    listView.deleteListItem(itemId);
  }

  //  Update the List items
  if (e.target.matches(".shopping-list-number")) {
    const value = e.target.value;
    const id = e.target.parentNode.parentNode.id;
    state.list.updateItem(id, value);
  }
});

// All the event listeners that are in the likes list

if (state.likes.likesItems.length === 0) {
  // elements.likesList.parentNode.parentNode.style.visibility = 'hidden';
  document.querySelector(".like-box").style.visibility = "hidden";
}

elements.likesList.addEventListener("click", async (e) => {
  e.preventDefault();
  const item = e.target.closest(".recipe-list-item");
  if (item) {
    if (item.parentNode.querySelector(".active")) {
      item.parentNode.querySelector(".active").classList.remove("active");
    }
    const id = item.id;

    item.classList.add("active");
    try {
      state.recipe = new Recipe(id);
      await state.recipe.getRecipe();
      await recipeView.renderRecipe(state.recipe);
    } catch (error) {
      alert(error);
    }
    checkLike();
  }; 
});


