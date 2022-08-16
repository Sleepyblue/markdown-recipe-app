class HolderView {
  _holder = document.querySelector('.recipes__holder');

  renderHolder(recipeTitle) {
    const markup = `
        <div class="recipes__holder-recipe">
            <div>${recipeTitle}</div> 
        </div>
       `;

    this._holder.insertAdjacentHTML('beforeend', markup);
  }
}

export default new HolderView();
