import "./Modal.css";
import ModalButton from "../../atoms/ModalButton";
import SVGIcon from "../../atoms/SVGIcon";
import { Route, Routes } from "react-router-dom";

type handlerFunctionType = {
  handleModal: VoidFunction;
};

export default function Modal({ handleModal }: handlerFunctionType) {
  return (
    /* WORKING ON HERE */
    <div className="modal">
      <div className="settings-menu">
        <ModalButton
          to="/settings/general"
          name="General"
          buttonClass="theme-button"
        />
        <ModalButton
          to="/settings/theme"
          name="Theme"
          buttonClass="theme-button"
        />
      </div>
      <button onClick={handleModal}>
        <SVGIcon iconName="Close" size={32} iconClass="icon" />
      </button>
      <div className="settings-options">
        <Routes>
          <Route
            path="/settings/general"
            element={
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                General Options
              </div>
            }
          />
          <Route
            path="/settings/theme"
            element={
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                Theme Options
              </div>
            }
          />
        </Routes>
      </div>
    </div>
    /* WORKING ON HERE */
  );
}
