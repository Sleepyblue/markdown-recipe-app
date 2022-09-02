class AppView {
  _form = document.querySelector('.markdown__form');
  _app = document.querySelector('.app');
  _markdown = document.querySelector('.app__mode-markdown');
  _preview = document.querySelector('.app__mode-preview');
  _editBtn = document.querySelector('.btn__app-mode');
  _recipeTitle;
  _ingList;
  _stepsList;
  _ckwList;

  extractRecipeName(string) {
    const recipeNameRegex = /^#{2}[\s\w\W].*?$/im;
    return string.match(recipeNameRegex);
  }

  extractIngredients(string) {
    const ingredientsRegex =
      /\@(\b[a-zA-Z\s\-]+_)\(\d+\/?\d?\&+\b\w*\)|\@(\b[a-zA-Z\s\-]*)_|\@\b[a-zA-Z\-]+/gim;

    return string.match(ingredientsRegex);
  }

  extractCookware(string) {
    const cookwareRegex = /\#\b[a-zA-Z0-9\-\s]+\_|\#\b[a-zA-Z0-9]+/gim;

    return string.match(cookwareRegex);
  }

  renderBaseMarkup() {
    const markup = `
    <div class="preview__container-title">  
      <h2 class="preview__recipe-name"></h2>
    </div>
    <div class="preview__container-steps">  
      <ul class="preview__list-steps"></ul>
    </div>
    <div class="preview__container-ingredients">  
      <ul class="preview__list-ingredients"></ul>
    </div>
    <div class="preview__container-cookware">  
      <ul class="preview__list-cookware"></ul>
    </div>
  `;
    this._preview.innerHTML = '';
    this._preview.insertAdjacentHTML('beforeend', markup);

    this._recipeTitle = document.querySelector('.preview__recipe-name');
    this._ingList = document.querySelector('.preview__list-ingredients');
    this._stepsList = document.querySelector('.preview__list-steps');
    this._ckwList = document.querySelector('.preview__list-cookware');
  }

  renderRecipeTitle(recipeTitle) {
    this._recipeTitle.textContent = recipeTitle;
  }

  renderIngredientsList(ingredientsArr) {
    ingredientsArr.forEach((data) => {
      const markupItem = `
      <li>${data.qt ? data.qt : ''} ${
        data.unit !== 'SKIP' ? data.unit + ' of' : ''
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
    this._markdown.querySelector('.form-text').reset();
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
}

export default new AppView();
