class HolderView {
  _holder = document.querySelector('.recipes__holder-flex');
  _form = document.querySelector('.markdown__form');

  renderHolder(recipeTitle, recipeType, recipeNutrition, recipeTime) {
    const markup = `
        <div class="recipes__holder-recipe">
          <div class="recipes__holder-recipe--container">
            <div class="recipes__holder-recipe--image">
              <div class="recipes__holder-recipe--image-el"></div>
            </div> 
            <div class="recipes__holder-recipe--info">
              <div class="recipes__holder-recipe--type">${recipeType}</div>
              <div class="recipes__holder-recipe--title">${recipeTitle}</div>
              <div class="recipes__holder-recipe--details">Nutrition: ${recipeNutrition}, Time: ${recipeTime} min</div>
            </div>
          </div> 
        </div>
       `;

    this._holder.insertAdjacentHTML('beforeend', markup);
  }

  renderHolderRecipeImage(imageLink, index = undefined) {
    if (index === undefined) {
      const holders = document.querySelectorAll('.recipes__holder-recipe');
      const lastInsertedHolder = holders[holders.length - 1].querySelector(
        '.recipes__holder-recipe--image-el'
      );
      lastInsertedHolder.style.backgroundImage = `url(${imageLink})`;
    }

    if (index !== undefined) {
      const imageEl = document.querySelectorAll(
        '.recipes__holder-recipe--image-el'
      );
      imageEl[index].style.backgroundImage = `url(${imageLink})`;
    }
  }

  updateAndRerenderHolders(localStorageHolders) {
    if (!localStorageHolders) return;

    localStorageHolders.forEach((holder, i) => {
      this.renderHolderRecipeImage(holder.images, i);
    });
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
