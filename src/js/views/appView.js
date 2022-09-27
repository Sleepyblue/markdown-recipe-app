class AppView {
  _form = document.querySelector('.markdown__form');
  _app = document.querySelector('.app');
  _markdown = document.querySelector('.app__mode-markdown');
  _preview = document.querySelector('.app__mode-preview');
  _editBtn = document.querySelector('.btn__app-mode');
  _recipeImage;
  _recipeTitle;
  _ingList;
  _stepsList;
  _ckwList;

  extractData(string) {
    const typeRegex = /(Type:)\s(.*)/gi;
    const nutritionRegex = /(Calories:)\s(.*)/gi;
    const timeRegex = /(Time:)\s(.*)/gi;
    const servingsRegex = /(Servings:)\s(.*)/gi;
    const imagesRegex = /(Image:)\s(.*)/gi;
    const titleRegex = /^#{1,}.*$/im;
    const ingredientsRegex =
      /\@(\b[a-zA-Z\s\-]+_)\(\d+\/?\d?\&+\b\w*\)|\@(\b[a-zA-Z\s\-]*)_|\@\b[a-zA-Z\-]+/gim;
    const cookwareRegex = /\#\b[a-zA-Z0-9\-\s]+\_|\#\b[a-zA-Z0-9]+/gim;

    return {
      extractedString: string,
      extractedType: string.match(typeRegex),
      extractedNutrition: string.match(nutritionRegex),
      extractedTime: string.match(timeRegex),
      extractedServings: string.match(servingsRegex),
      extractedImages: string.match(imagesRegex),
      extractedTitle: string.match(titleRegex),
      extractedIngredients: string.match(ingredientsRegex),
      extractedCookware: string.match(cookwareRegex),
    };
  }

  renderMarkdownOriginalString(originalMarkdownString) {
    this._form.querySelector('.form-text').value = originalMarkdownString;
  }

  renderBaseMarkup() {
    const markup = `
    <div class="preview__title">  
      <div class="preview__title-image"></div>
      <div class="preview__title-details">
        <h2 class="preview__title_recipe-type"></h2>
        <h2 class="preview__title_recipe-name"></h2>
        <h2 class="preview__title_recipe-nutrition"></h2>
        <h2 class="preview__title_recipe-time"></h2>
        <h2 class="preview__title_recipe-servings"></h2>
      </div>
    </div>
    <div class="preview__steps-container">  
      <ul class="preview__list-steps"></ul>
    </div>
    <div class="preview__ingredients">  
      <div class="preview__ingredients-container">
        <ul class="preview__list-ingredients"></ul>
        <ul class="preview__list-cookware"></ul>
      </div>
    </div>
  `;
    this._preview.innerHTML = '';
    this._preview.insertAdjacentHTML('beforeend', markup);

    this._recipeImage = document.querySelector('.preview__title-image');
    this._recipeType = document.querySelector('.preview__title_recipe-type');
    this._recipeTitle = document.querySelector('.preview__title_recipe-name');
    this._recipeNutrition = document.querySelector(
      '.preview__title_recipe-nutrition'
    );
    this._recipeTime = document.querySelector('.preview__title_recipe-time');
    this._recipeServings = document.querySelector(
      '.preview__title_recipe-servings'
    );
    this._ingList = document.querySelector('.preview__list-ingredients');
    this._stepsList = document.querySelector('.preview__list-steps');
    this._ckwList = document.querySelector('.preview__list-cookware');
  }

  renderRecipeImage(imageLink) {
    this._recipeImage.style.backgroundImage = `url(${imageLink})`;
  }

  renderRecipeType(recipeType) {
    this._recipeType.textContent = recipeType;
  }

  renderRecipeTitle(recipeTitle) {
    this._recipeTitle.textContent = recipeTitle;
  }

  renderRecipeNutrition(recipeNutrition) {
    this._recipeNutrition.textContent = `Calories: ${recipeNutrition}`;
  }
  renderRecipeTime(recipeTime) {
    this._recipeTime.textContent = `Time: ${recipeTime}`;
  }
  renderRecipeServings(recipeServings) {
    this._recipeServings.textContent = `Servings: ${recipeServings}`;
  }

  renderIngredientsList(ingredientsArr) {
    ingredientsArr.forEach((data) => {
      const markupItem = `
      <li>${data.qt ? data.qt : ''} ${
        data.unit !== '' ? data.unit + ' of' : ''
      } ${data.ing}</li>
      `;

      this._ingList.insertAdjacentHTML('beforeend', markupItem);
    });
  }

  renderStepsList(stepsArr) {
    stepsArr.forEach((data) => {
      const markupItem = `
      <li>${data}</li>
      `;

      this._stepsList.insertAdjacentHTML('beforeend', markupItem);
    });
  }

  renderCookwareList(ckwArr) {
    ckwArr.forEach((data) => {
      const markupItem = `
      <li>${data}</li>
      `;

      this._ckwList.insertAdjacentHTML('beforeend', markupItem);
    });
  }

  renderAppMode(previousMode, nextMode, updateBtnText) {
    document.querySelector(`.app__mode-${previousMode}`).style.display = 'none';
    document
      .querySelector(`.app__mode-${nextMode}`)
      .style.removeProperty('display');
    document.querySelector('.app__mode').dataset.mode = nextMode;
    this._editBtn.textContent = updateBtnText;
  }

  renderToPreview() {
    document.querySelector(`.app__mode-markdown`).style.display = 'none';
    document
      .querySelector(`.app__mode-preview`)
      .style.removeProperty('display');
    document.querySelector('.app__mode').dataset.mode = 'preview';
    this._editBtn.textContent = 'Edit';
  }

  renderError(message) {
    const markupError = `
    <div class="app__mode-error">
     <div class="error__icon-container">
       <ion-icon class="error__icon" name="bug-outline"></ion-icon>
      </div> 
      <div class="error__message-container"/>
        <p class="error__message">${message}</p> 
      </div> 
    </div>`;

    this.cleanError();
    this._app.insertAdjacentHTML('afterbegin', markupError);
  }

  cleanMarkdown() {
    this._form.reset();
  }

  cleanError() {
    if (this._app.querySelector('.app__mode-error'))
      this._app.querySelector('.app__mode-error').remove();
  }

  addHandlerRender(handler) {
    this._form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formValue = e.target.querySelector('.form-text').value;
      handler(formValue);
    });
  }

  addHandlerAppView(handler) {
    this._editBtn.addEventListener('click', function (e) {
      e.preventDefault();

      const appMode = document.querySelector('.app__mode').dataset.mode;
      handler(appMode);
    });
  }

  // addHandlerError(handler) {
  //   if (this._app.querySelector('.app__mode-error')) {
  //     const errorWarning = this._app.querySelector('.app__mode-error');
  //     errorWarning.addEventListener('click', function (e) {
  //       e.preventDefault();
  //       handler(e);
  //     });
  //   }
  // }
}

export default new AppView();
