import { Link } from "react-router-dom";
import "./ModalButton.css";

type modalButtonProps = {
  to: string;
  name: string;
  buttonClass: string;
};

function ModalButton({ to, name, buttonClass }: modalButtonProps) {
  return (
    <button className={buttonClass}>
      <Link to={to}>{name}</Link>
    </button>
  );
}

export default ModalButton;
