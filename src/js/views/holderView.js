class HolderView {
  _holder = document.querySelector('.recipes__holder');
  _form = document.querySelector('.markdown__form');

  renderHolder(recipeTitle) {
    const markup = `
        <div class="recipes__holder-recipe">
            <div class="recipes__holder-recipe--title">${recipeTitle}</div> 
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
}

export default new HolderView();
