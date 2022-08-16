const submit = document.querySelector('.form-submit');
console.log(submit);

const form = document.querySelector('.mode-edit__form');
console.log(form);

const preview = document.querySelector('.mode-preview');
console.log(preview);

// REFACTORING ///////////////////
/////////////////////////////////

// State variable (maybe need to place this on the local storage)
let recipeState = [[], []];

// Ingredient Class Prototype
class Ingredient {
  constructor(ingredient, quantity, unit) {
    this.ing = ingredient;
    this.qt = quantity;
    this.unit = unit;
  }
}

// Function to extract ingredients from source string into an array, maintaining their symbols syntax.
const extractIngredients = function (string) {
  const ingredientsRegex =
    /\@(\b[a-zA-Z\-]+_)\(\d+\&?\b\w*\)|\@(\b[a-zA-Z\-]*)_|\@\b[a-zA-Z\-]+/gim;

  return string.match(ingredientsRegex);
};

// Function to extract cookware from source string into an array, maintaining their symbols syntax.
const extractCookware = function (string) {
  const cookwareRegex = /\#\b[a-zA-Z0-9\-\s]+\_|\#\b[a-zA-Z0-9]+/gim;

  return string.match(cookwareRegex);
};

// Function to slice each ingredient, trimed for their symbols syntax, into an array
const sliceIngredients = function (ing) {
  return ing.slice(1, ing.includes('_') ? ing.indexOf('_') : ing.length);
};

// Function to slice each quantity into an array
const sliceQuantity = function (ing) {
  if (!ing.includes('_(')) return `SKIP`;
  return ing.slice(ing.indexOf('(') + 1, ing.indexOf('&'));
};

// Function to slice each unit into an array
const sliceUnit = function (ing) {
  if (!ing.includes('&')) return `SKIP`;
  return ing.slice(ing.indexOf('&') + 1, ing.indexOf(')'));
};

const sliceCookware = function (ckw) {
  return ckw.slice(1, ckw.includes('_') ? ckw.indexOf('_') : ckw.length);
};

// Function to create the ingredient object pushing it into the state
const ingredientObject = function (ing, qt, unit) {
  const ingObj = new Ingredient();

  ingObj.ing = ing;
  ingObj.qt = qt;
  ingObj.unit = unit;

  recipeState[0].push(ingObj);
};

/////////////////////////////////
/////////////////////////////////

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Create Unordered List
  const markup = `
    <div class="preview__container-ingredients">  
      <ul class="preview__list-ingredients"></ul>
    </div>
    <div class="preview__container-cookware">  
      <ul class="preview__list-cookware"></ul>
    </div>
  `;
  preview.innerHTML = '';
  preview.insertAdjacentHTML('beforeend', markup);

  // Capturing the input string, as a value, into a variable
  const formValue = document.querySelector('.form-text').value;

  // Extracting Ingredients into an array
  const ingredients = extractIngredients(formValue);

  // Extracting cookware into an array & Logging the resulting array to the console
  const cookware = extractCookware(formValue);

  ingredients.forEach((ing) => {
    // Slicing Ingredients
    const slicedIngredient = sliceIngredients(ing);

    // Slicing Quantity
    const slicedQuantity = sliceQuantity(ing);

    // Slicing Quantity
    const slicedUnit = sliceUnit(ing);

    // Creating ingredients objects array
    ingredientObject(slicedIngredient, slicedQuantity, slicedUnit);
  });

  // Creating cookware array
  cookware.forEach((ckw) => {
    const cookware = sliceCookware(ckw);

    recipeState[1].push(cookware);
  });

  // Insert ingredients into unordered List
  const ingList = document.querySelector('.preview__list-ingredients');

  recipeState[0].forEach((data) => {
    const markupItem = `
    <li>${+data.qt ? data.qt : ''} ${
      data.unit !== 'SKIP' ? data.unit + ' of' : ''
    } ${data.ing}</li>
    `;

    ingList.insertAdjacentHTML('beforeend', markupItem);
  });

  // Insert cookware into unordered List
  const cookList = document.querySelector('.preview__list-cookware');

  recipeState[1].forEach((data) => {
    const markupItem = `
    <li>${data}</li>
    `;

    cookList.insertAdjacentHTML('beforeend', markupItem);
  });

  console.log(recipeState);
});
