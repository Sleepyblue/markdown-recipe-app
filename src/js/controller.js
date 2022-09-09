'use strict';

import * as model from './model.js';
import AppView from './views/AppView.js';
import DeviceView from './views/DeviceView';
import HolderView from './views/holderView.js';

function updateRecipeState(recipeString, name, ingredients, cookware) {
  model.saveOriginalInput(recipeString);
  model.saveRecipeName(name);
  model.sliceIngredients(ingredients);
  model.sliceQuantity(ingredients);
  model.sliceUnit(ingredients);
  if (cookware !== null) model.sliceCookware(cookware);
  model.convertSteps(recipeString, model.recipeState);
}

function renderRecipeState(dataSource, cookware) {
  AppView.renderBaseMarkup();
  AppView.renderRecipeTitle(dataSource.recipeName);
  AppView.renderStepsList(dataSource.steps);
  AppView.renderIngredientsList(dataSource.ingredients);
  if (cookware !== null) AppView.renderCookwareList(dataSource.cookware);
}

function saveChangedRecipeDetails(recipeString, recipeName) {
  const storage = model.getLocalStorage();
  console.log(storage);

  storage.forEach((holder) => {
    if (
      holder.recipeName.toLowerCase().replace(/\s/g, '') ===
      recipeName.toLowerCase().replace(/\s/g, '')
    ) {
      holder.originalString = recipeString;
      holder.recipeName = recipeName;
      holder.ingredients = [...model.recipeState.ingredients];
      holder.cookware = [...model.recipeState.cookware];
      holder.steps = [...model.recipeState.steps];
    }
  });
  model.saveLocalStorage(storage);
  model.cleanState();
}

const controlRecipeInput = async function (string) {
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
    let usedRecipeName = false;
    let recipeDetailsChanged = false;
    let breaking = false;

    model.recipeHolder.forEach((holder) => {
      if (!holder) {
        console.log('There are no recipes saved!');
        return;
      } else if (
        holder.recipeName.toLowerCase().replace(/\s/g, '') ===
          slicedRecipeName.toLowerCase().replace(/\s/g, '') &&
        holder.originalString.toLowerCase().replace(/\s/g, '') ===
          string.toLowerCase().replace(/\s/g, '')
      )
        usedRecipeName = true;
      else if (
        holder.recipeName.toLowerCase().replace(/\s/g, '') ===
          slicedRecipeName.toLowerCase().replace(/\s/g, '') &&
        holder.originalString.toLowerCase().replace(/\s/g, '') !==
          string.toLowerCase().replace(/\s/g, '')
      ) {
        recipeDetailsChanged = true;
      }
    });

    if (usedRecipeName && !recipeDetailsChanged) {
      throw new Error(`Recipe name already used. Please choose another one!`);
    }

    if (!usedRecipeName && recipeDetailsChanged) {
      breaking = true;
      const modifyConfirmation = window.confirm(
        'Same Title but string has been modified, do you still want to save?'
      );

      if (!modifyConfirmation) {
        console.log('Cancelled. Returning...');
        return;
      } else {
        updateRecipeState(string, recipeName, ingredientsData, cookwareData);
        saveChangedRecipeDetails(string, slicedRecipeName);
        console.log('Read until modified stuff');

        return;
      }
    }

    // ERROR CLEANING
    AppView.cleanError();

    if (breaking) return;

    console.log('Running past the breaking point');
    // Save recipe input into 'recipeState'
    updateRecipeState(string, recipeName, ingredientsData, cookwareData);

    // Create and render elements on preview based on markdown input
    renderRecipeState(model.recipeState, cookwareData);

    // Clear Markdown Container and change view to Preview
    AppView.cleanMarkdown();
    AppView.renderToPreview();
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
    HolderView.renderHolder(model.recipeState.recipeName);
    model.cleanState();
  }
};

const controlLoadHolder = function () {
  model.getLocalStorage();
  const holders = model.getLocalStorage();
  if (!holders) return;

  model.recipeHolder.push(...holders);
  console.log(model.recipeState);

  holders.forEach((holder) => {
    HolderView.renderHolder(holder.recipeName);
  });
};

const controlHolderClick = function (element) {
  const elementTitle = element.textContent.trim();
  const test = model.getHolderClickingData(elementTitle);

  test.forEach((holder) => {
    if (holder.recipeName === elementTitle) {
      AppView.renderMarkdownOriginalString(holder.originalString);
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
  AppView.addHandlerRender(controlRecipeInput);
  AppView.addHandlerAppView(controlAppView);
  HolderView.addHandlerLoadHolder(controlLoadHolder);
  HolderView.addHandlerRenderHolder(controlHolderView);
  HolderView.addHandlerHolderClick(controlHolderClick);
  DeviceView.addHandlerChangeView(controlDeviceView);
};

init();
