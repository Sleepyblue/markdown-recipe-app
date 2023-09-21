import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import RecipePreview from "./components/organism/RecipePreview";
import SVGIcon from "./components/atoms/SVGIcon";
import Modal from "./components/molecules/Modal";
import handleTheme from "./utility/handleTheme";

function App() {
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  function handleModal() {
    setModalStatus(!modalStatus);
  }

  useEffect(() => {
    handleTheme();
  }, []);

  return (
    <>
      <header>
        <button className="icon-button" onClick={handleModal}>
          <SVGIcon iconName="Cogwheel" size={36} />
        </button>
      </header>
      <nav></nav>
      <main></main>
      <article>
        <RecipePreview />
      </article>
      {modalStatus &&
        createPortal(<Modal handleModal={handleModal} />, document.body)}
    </>
  );
}

export default App;
