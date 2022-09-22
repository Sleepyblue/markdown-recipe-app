class Ingredient {
  constructor(ingredient, quantity, unit) {
    // this.name = recipeName;
    this.ing = ingredient;
    this.qt = quantity;
    this.unit = unit;
  }
}
export let appState = {
  deviceView: [],
  appView: '',
};

export let recipeState = {
  image: '',
  originalString: '',
  recipeName: '',
  ingredients: [],
  cookware: [],
  steps: [],
};

export let recipeHolder = [];

let i = 0;

export const saveOriginalInput = function (string) {
  recipeState.originalString = string;
};

export const sliceRecipeName = function (dataArr) {
  const slicedName = dataArr[0].slice(2, dataArr[0].length).trim();
  return slicedName;
};

export const saveRecipeName = function (dataArr) {
  const slicedName = dataArr[0].slice(2, dataArr[0].length).trim();
  recipeState.recipeName = slicedName;
};

export const sliceIngredients = function (dataArr) {
  dataArr.map((ing) => {
    const slicedIng = ing.slice(
      1,
      ing.includes('_') ? ing.indexOf('_') : ing.length
    );
    ingredientObject(slicedIng);
  });
};

export const sliceQuantity = function (dataArr) {
  dataArr.map((qt) => {
    let slicedQt;
    !qt.includes('_(')
      ? (slicedQt = `SKIP`)
      : (slicedQt = qt.slice(qt.indexOf('(') + 1, qt.indexOf('&')));
    ingredientObject(undefined, slicedQt);
  });
};

export const sliceUnit = function (dataArr) {
  dataArr.map((unit) => {
    let slicedUnit;
    !unit.includes('&')
      ? (slicedUnit = `SKIP`)
      : (slicedUnit = unit.slice(unit.indexOf('&') + 1, unit.indexOf(')')));
    ingredientObject(undefined, undefined, slicedUnit);
  });
};

export const sliceCookware = function (ckwArr) {
  ckwArr.forEach((item) => {
    let slicedItem = item.slice(
      1,
      item.includes('_') ? item.indexOf('_') : item.length
    );
    recipeState.cookware.push(slicedItem);
  });
};

export const sliceImage = function (images) {
  const slicedImage = images[0].trim().slice(7, -1);
  recipeState.image = slicedImage;
};

export const ingredientObject = function (
  ing = undefined,
  qt = undefined,
  unit = undefined
) {
  const ingObj = new Ingredient();

  if (ing !== undefined) {
    ingObj.ing = ing;
    recipeState.ingredients.push(ingObj);
  }

  if (qt !== undefined) {
    recipeState.ingredients[i].qt = qt;

    i === recipeState.ingredients.length - 1 ? (i = 0) : i++;
  }

  if (unit !== undefined) {
    recipeState.ingredients[i].unit = unit;
    i === recipeState.ingredients.length - 1 ? (i = 0) : i++;
  }
};

export const convertSteps = function (string, state) {
  const ingredientsRegex =
    /\@(\b[a-zA-Z\s\-]+_)\(\d+\/?\d?\&+\b\w*\)|\@(\b[a-zA-Z\s\-]*)_|\@\b[a-zA-Z\-]+/im;
  const cookwareRegex = /\#\b[a-zA-Z0-9\-\s]+\_|\#\b[a-zA-Z0-9]+/im;

  let i = 0;
  let c = 0;
  let stringArr = [];
  stringArr.push(string);

  const recursion = function () {
    if (ingredientsRegex.test(stringArr[0])) {
      stringArr[0] = stringArr[0].replace(
        ingredientsRegex,
        `${state.ingredients[i].qt === 'SKIP' ? '' : state.ingredients[i].qt}${
          state.ingredients[i].unit === 'SKIP' ? '' : state.ingredients[i].unit
        }${state.ingredients[i].unit === 'SKIP' ? '' : ' of'} ${
          state.ingredients[i].ing
        }`
      );
      i++;
      recursion(i);
    } else return;

    if (cookwareRegex.test(stringArr[0])) {
      stringArr[0] = stringArr[0].replace(
        cookwareRegex,
        `${state.cookware[c]}`
      );
      c++;
      recursion(i);
    } else return;
  };

  recursion(i);

  const newLineRegex = /\r?\n/;
  const metadataFilter = /\>/;
  const stepsArr = stringArr[0]
    .split(newLineRegex)
    .filter((element) => element);

  stepsArr.forEach((step) => {
    !step.includes('##') && !metadataFilter.test(step)
      ? recipeState.steps.push(step)
      : '';
  });

  console.log(recipeState.steps);
};

export const pushToRecipeHolder = function (state) {
  recipeHolder.push({
    images: state.image,
    originalString: state.originalString,
    recipeName: state.recipeName,
    ingredients: [...state.ingredients],
    cookware: [...state.cookware],
    steps: [...state.steps],
  });
};

export const saveLocalStorage = function (recipeHolder) {
  localStorage.setItem('recipeHolder', JSON.stringify(recipeHolder));
};

export const getLocalStorage = function () {
  const localStorageString = localStorage.getItem('recipeHolder');
  let holders;

  if (localStorageString) {
    holders = JSON.parse(localStorageString);
  }
  return holders;
};

export const getHolderClickingData = function (elementTitle) {
  const holders = getLocalStorage();
  console.log(holders);

  return holders;
};

export const cleanState = function () {
  recipeState = {
    image: '',
    originalString: '',
    recipeName: '',
    ingredients: [],
    cookware: [],
    steps: [],
  };
};

export const sliceIconName = function (string) {
  let slicedIconName = string.slice(0, string.indexOf('-out'));
  let previousName = appState.deviceView.pop();
  appState.deviceView.push(slicedIconName);
  let currentName = appState.deviceView[0];
  return [previousName, currentName];
};

export const settingAppMode = function (string) {
  let mode;
  let btnText;

  if (string === 'markdown') {
    mode = 'preview';
    btnText = 'Edit';
    return [mode, btnText];
  }
  if (string === 'preview') {
    mode = 'markdown';
    btnText = 'Preview';
    return [mode, btnText];
  }
};
