'use strict';

import * as model from './model.js';
import appView from './views/appView.js';
import deviceView from './views/deviceView';

const controlExtractRecipe = async function (string) {
  try {
    // Extract recipe NAME, INGREDIENTS AND COOKWARE
    // Store each value into variables
    const recipeName = appView.extractRecipeName(string);
    const ingredientsData = appView.extractIngredients(string);
    const cookwareData = appView.extractCookware(string);

    // ERROR CATCHING - No recipe name or zero ingredients
    if (!recipeName) throw new Error(`Insert a recipe name! (## Example)`);
    if (!ingredientsData)
      throw new Error(`Insert at least one ingredient! (@Ingredient)`);

    // ERROR CLEANING
    appView.cleanError();

    // Slice recipe name for error catching
    // ERROR CATCHING - Recipe name already exists
    const slicedRecipeName = model.sliceRecipeName(recipeName);
    if (slicedRecipeName === model.recipeState.recipeName)
      throw new Error(`Recipe name already used. Please choose another one!`);

    // ERROR CLEANING
    appView.cleanError();

    // Save recipe input into 'recipeState'
    model.saveOriginalInput(string);
    model.saveRecipeName(recipeName);
    model.sliceIngredients(ingredientsData);
    model.sliceQuantity(ingredientsData);
    model.sliceUnit(ingredientsData);
    if (cookwareData !== null) model.sliceCookware(cookwareData);
    model.convertSteps(string, model.recipeState);

    model.pushToRecipeHolder(model.recipeState);

    // Create and render elements on preview based on markdown input
    appView.renderBaseMarkup();
    appView.renderStepsList(model.recipeState.steps);
    appView.renderIngredientsList(model.recipeState.ingredients);
    if (cookwareData !== null)
      appView.renderCookwareList(model.recipeState.cookware);

    // console.log(model.appState);
    console.log(model.recipeState);
    console.log(model.recipeHolder);
  } catch (err) {
    appView.renderError(err.message);
    // console.error(err);
  }
};

const controlDeviceView = function (string) {
  const [previousName, currentName] = model.sliceIconName(string);
  deviceView.renderDeviceView(previousName, currentName);
};

const controlAppView = function (string) {
  const currentAppMode = string;
  const [changeAppMode, btnText] = model.settingAppMode(string);

  appView.renderAppMode(currentAppMode, changeAppMode, btnText);
};

// const controlErrorView = function (element) {
//   console.log(element);
// };

const init = function () {
  appView.addHandlerRender(controlExtractRecipe);
  appView.addHandlerAppView(controlAppView);
  // appView.addHandlerError(controlErrorView);
  deviceView.addHandlerChangeView(controlDeviceView);
};

init();
