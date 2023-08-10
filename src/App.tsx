import { useState } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import RecipePreview from "./components/RecipePreview";
import SVGIcon from "./components/SVGIcon";
import Modal from "./components/Modal";

function App() {
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  function modalHandler() {
    setModalStatus(!modalStatus);
    console.log(modalStatus);
  }

  return (
    <>
      <header>
        <button className="icon-button" onClick={modalHandler}>
          <SVGIcon iconName="Cogwheel" size={36} />
        </button>
      </header>
      <nav></nav>
      <main></main>
      <article>
        <RecipePreview />
      </article>
      {modalStatus && createPortal(<Modal />, document.body)}
    </>
  );
}

export default App;
