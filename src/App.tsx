import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import RecipePreview from "./components/organism/RecipePreview";
import SVGIcon from "./components/atoms/SVGIcon";
import Modal from "./components/molecules/Modal";
import Breadcrumbs from "./components/atoms/Breadcrumbs";
import handleTheme from "./utility/handleTheme";

function App() {
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  function handleModal() {
    setModalStatus(!modalStatus);
  }

  useEffect(() => {
    handleTheme();
  }, []);

  const placeholderLinks = [
    "Bread-uno",
    "Bread-dos",
    "Bread-tres",
    "Bread-quatro",
  ];

  return (
    <>
      <header>
        <Breadcrumbs links={placeholderLinks} />
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
