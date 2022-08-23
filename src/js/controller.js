'use strict';

import * as model from './model.js';
import AppView from './views/AppView.js';
import DeviceView from './views/DeviceView';
import HolderView from './views/holderView.js';

const controlExtractRecipe = async function (string) {
  try {
    console.log(model.recipeState);

    // Extract recipe NAME, INGREDIENTS AND COOKWARE
    // Store each value into variables
    const recipeName = AppView.extractRecipeName(string);
    const ingredientsData = AppView.extractIngredients(string);
    const cookwareData = AppView.extractCookware(string);

    // ERROR CATCHING - No recipe name or zero ingredients
    if (!recipeName) throw new Error(`Insert a recipe name! (## Example)`);
    if (!ingredientsData)
      throw new Error(`Insert at least one ingredient! (@Ingredient)`);

    // ERROR CLEANING
    AppView.cleanError();

    // Slice recipe name for error catching
    // ERROR CATCHING - Recipe name already exists
    const slicedRecipeName = model.sliceRecipeName(recipeName);

    model.recipeHolder.forEach((holder) => {
      if (!holder) {
        console.log('There are no recipes saved!');
        return;
      } else if (holder.recipeName === slicedRecipeName)
        throw new Error(`Recipe name already used. Please choose another one!`);
    });

    // ERROR CLEANING
    AppView.cleanError();

    // Save recipe input into 'recipeState'
    model.saveOriginalInput(string);
    model.saveRecipeName(recipeName);
    model.sliceIngredients(ingredientsData);
    model.sliceQuantity(ingredientsData);
    model.sliceUnit(ingredientsData);
    if (cookwareData !== null) model.sliceCookware(cookwareData);
    model.convertSteps(string, model.recipeState);

    // Create and render elements on preview based on markdown input
    AppView.renderBaseMarkup();
    AppView.renderStepsList(model.recipeState.steps);
    AppView.renderIngredientsList(model.recipeState.ingredients);
    if (cookwareData !== null)
      AppView.renderCookwareList(model.recipeState.cookware);

    console.log(model.recipeState);
  } catch (err) {
    AppView.renderError(err.message);
  }
};

const controlHolderView = function () {
  let checker;
  if (model.recipeHolder.length === 0) checker = true;

  model.recipeHolder.forEach((holder) => {
    if (
      holder.recipeName === model.recipeState.recipeName ||
      !model.recipeState.recipeName
    ) {
      checker = false;
    } else {
      checker = true;
    }
  });

  if (checker) {
    model.pushToRecipeHolder(model.recipeState);
    console.log(model.recipeHolder);
    HolderView.renderHolder(model.recipeState.recipeName);
    model.cleanState();
  }
};

const controlDeviceView = function (string) {
  const [previousName, currentName] = model.sliceIconName(string);
  DeviceView.renderDeviceView(previousName, currentName);
};

const controlAppView = function (string) {
  const currentAppMode = string;
  const [changeAppMode, btnText] = model.settingAppMode(string);

  AppView.renderAppMode(currentAppMode, changeAppMode, btnText);
};

// const controlErrorView = function (element) {
//   console.log(element);
// };

const init = function () {
  AppView.addHandlerRender(controlExtractRecipe);
  AppView.addHandlerAppView(controlAppView);
  // AppView.addHandlerError(controlErrorView);
  HolderView.addHandlerRenderHolder(controlHolderView);
  DeviceView.addHandlerChangeView(controlDeviceView);
};

init();
