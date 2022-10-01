class Ingredient {
  constructor(ingredient, quantity, unit) {
    this.ingredient = ingredient;
    this.quantity = quantity;
    this.unit = unit;
  }
}
export let appState = {
  deviceView: [],
  appView: '',
};

export let recipeState = {
  type: '',
  nutrition: '',
  time: '',
  servings: '',
  image: '',
  originalString: '',
  recipeName: '',
  ingredients: [],
  cookware: [],
  steps: [],
};

export let recipeHolder = [];

export const sliceData = function (object) {
  const slicedType = object.extractedType
    .slice(object.extractedType.indexOf(' '), object.extractedType.length)
    .trim();

  const slicedNutrition = object.extractedNutrition
    .slice(
      object.extractedNutrition.indexOf(' '),
      object.extractedNutrition.length
    )
    .trim();

  const slicedTime = object.extractedTime
    .slice(object.extractedTime.indexOf(' '), object.extractedTime.length)
    .trim();

  const slicedServings = object.extractedServings
    .slice(
      object.extractedServings.indexOf(' '),
      object.extractedServings.length
    )
    .trim();

  const slicedImages = object.extractedImages.trim().slice(7, -1);

  const slicedTitle = object.extractedTitle
    .slice(2, object.extractedTitle.length)
    .trim();

  const slicedIngredients = [];
  object.extractedIngredients.map((item) => {
    const ingredient = item.slice(
      1,
      item.includes('_') ? item.indexOf('_') : item.length
    );

    let quantity;
    item.includes('_(')
      ? (quantity = item.slice(item.indexOf('(') + 1, item.indexOf('&')))
      : (quantity = ``);

    let unit;
    !item.includes('&')
      ? (unit = ``)
      : (unit = item.slice(item.indexOf('&') + 1, item.indexOf(')')));

    const ingredientsObject = new Ingredient(ingredient, quantity, unit);
    slicedIngredients.push(ingredientsObject);
  });

  const slicedCookware = [];
  object.extractedCookware.forEach((item) => {
    let cookware = item.slice(
      1,
      item.includes('_') ? item.indexOf('_') : item.length
    );
    slicedCookware.push(cookware);
  });

  return {
    string: object.extractedString,
    type: slicedType,
    nutrition: slicedNutrition,
    time: slicedTime,
    servings: slicedServings,
    images: slicedImages,
    title: slicedTitle,
    ingredients: slicedIngredients,
    cookware: slicedCookware,
  };
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
        `${state.ingredients[i].qt === '' ? '' : state.ingredients[i].qt} ${
          state.ingredients[i].unit === '' ? '' : state.ingredients[i].unit
        }${state.ingredients[i].unit === '' ? '' : ' of'} ${
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
};

export const saveRecipeName = function (dataArr) {
  const slicedName = dataArr[0].slice(2, dataArr[0].length).trim();
  recipeState.recipeName = slicedName;
};

export const pushToRecipeHolder = function (state) {
  recipeHolder.push({
    type: state.type,
    nutrition: state.nutrition,
    time: state.time,
    servings: state.servings,
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

  return holders;
};

export const cleanState = function () {
  recipeState = {
    type: '',
    nutrition: '',
    time: '',
    servings: '',
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
