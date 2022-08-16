class DeviceView {
  _button = document.querySelectorAll('.views__button');
  _app = document.querySelector('.app');

  renderDeviceView(previousClass, currentClass) {
    this._app.classList.remove(previousClass);
    this._app.classList.add(currentClass);
  }

  addHandlerChangeView(handler) {
    this._button.forEach((button) => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        let buttonName = button.querySelector('.views__icon').name;
        handler(buttonName);
      });
    });
  }
}

export default new DeviceView();
