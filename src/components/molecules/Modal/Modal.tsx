import "./Modal.css";
import ModalButton from "../../atoms/ModalButton";
import SVGIcon from "../../atoms/SVGIcon";

type handlerFunctionType = {
  handleModal: VoidFunction;
};

export default function Modal({ handleModal }: handlerFunctionType) {
  return (
    <div className="modal">
      <ModalButton name="Theme" buttonClass="theme-button"></ModalButton>
      <button onClick={handleModal}>
        <SVGIcon iconName="Close" size={32} iconClass="icon" />
      </button>
    </div>
  );
}
