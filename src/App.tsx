import "./App.css";
import RecipePreview from "./components/RecipePreview";
import SVGIcon from "./components/SVGIcon";

function App() {
  return (
    <>
      <header>
        <button
          className="icon-button"
          onClick={() => {
            console.log("Settings clicked");
          }}
        >
          <SVGIcon iconName="Cogwheel" size={36} />
        </button>
      </header>
      <nav></nav>
      <main></main>
      <article>
        <RecipePreview />
      </article>
    </>
  );
}

export default App;
