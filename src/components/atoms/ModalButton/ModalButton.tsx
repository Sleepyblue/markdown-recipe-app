import "./ModalButton.css";

type modalButtonProps = {
  name: string;
  buttonClass: string;
};

function ModalButton({ name, buttonClass }: modalButtonProps) {
  return (
    <button className={buttonClass}>
      <p>{name}</p>
    </button>
  );
}

export default ModalButton;
