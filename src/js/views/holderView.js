class HolderView {
  _holder = document.querySelector('.recipes__holder-flex');
  _form = document.querySelector('.markdown__form');

  renderHolder(recipeTitle) {
    const markup = `
        <div class="recipes__holder-recipe">
          <div class="recipes__holder-recipe--container">
            <div class="recipes__holder-recipe--image"></div> 
            <div class="recipes__holder-recipe--info">
              <div class="recipes__holder-recipe--type">Breakfast (ph)</div>
              <div class="recipes__holder-recipe--title">${recipeTitle}</div>
              <div class="recipes__holder-recipe--details">587 Kcal, 10min (ph)</div>
            </div>
          </div> 
        </div>
       `;

    this._holder.insertAdjacentHTML('beforeend', markup);
  }

  addHandlerRenderHolder(handler) {
    this._form.addEventListener('submit', handler);
  }

  addHandlerLoadHolder(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerHolderClick(handler) {
    this._holder.addEventListener('click', function (e) {
      const holder = e.target.querySelector('.recipes__holder-recipe--title');

      handler(holder);
    });
  }
}

export default new HolderView();
