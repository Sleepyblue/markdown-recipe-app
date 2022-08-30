'use strict';

import * as model from './model.js';
import AppView from './views/AppView.js';
import DeviceView from './views/DeviceView';
import HolderView from './views/holderView.js';

const controlExtractRecipe = async function (string) {
  try {
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
    AppView.renderRecipeTitle(model.recipeState.recipeName);
    AppView.renderStepsList(model.recipeState.steps);
    AppView.renderIngredientsList(model.recipeState.ingredients);
    if (cookwareData !== null)
      AppView.renderCookwareList(model.recipeState.cookware);

    AppView.cleanMarkdown();
    console.log(model.recipeState);
  } catch (err) {
    AppView.renderError(err.message);
  }
};

const controlHolderView = function () {
  let checker;
  if (model.recipeState.recipeName) checker = true;

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
    model.saveLocalStorage(model.recipeHolder);
    console.log(model.recipeHolder);
    console.log(localStorage);
    HolderView.renderHolder(model.recipeState.recipeName);
    model.cleanState();
  }
};

const controlLoadHolder = function () {
  model.getLocalStorage();
  const holders = model.getLocalStorage();
  if (!holders) return;

  model.recipeHolder.push(...holders);
  console.log(model.recipeHolder);

  holders.forEach((holder) => {
    HolderView.renderHolder(holder.recipeName);
  });
};

const controlHolderClick = function (element) {
  const elementTitle = element.textContent.trim();
  const test = model.getHolderClickingData(elementTitle);

  test.forEach((holder) => {
    if (holder.recipeName === elementTitle) {
      AppView.renderBaseMarkup();
      AppView.renderRecipeTitle(holder.recipeName);
      AppView.renderStepsList(holder.steps);
      AppView.renderIngredientsList(holder.ingredients);
      AppView.renderCookwareList(holder.cookware);
    }
  });
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

const init = function () {
  AppView.addHandlerRender(controlExtractRecipe);
  AppView.addHandlerAppView(controlAppView);
  HolderView.addHandlerLoadHolder(controlLoadHolder);
  HolderView.addHandlerRenderHolder(controlHolderView);
  HolderView.addHandlerHolderClick(controlHolderClick);
  DeviceView.addHandlerChangeView(controlDeviceView);
};

init();
