import "./Modal.css";
import SVGIcon from "./../SVGIcon";

type handlerFunctionType = {
  handleModal: VoidFunction;
};

export default function Modal({ handleModal }: handlerFunctionType) {
  return (
    <div className="modal">
      <button onClick={handleModal}>
        <SVGIcon iconName="Close" size={32} iconClass="icon" />
      </button>
    </div>
  );
}
