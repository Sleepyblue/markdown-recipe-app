import "./Breadcrumbs.css";
import { useState } from "react";

type BreadcrumbsProps = {
  links: string[];
};

function Breadcrumbs({ links }: BreadcrumbsProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClickEllipsis = () => {
    setShowDropdown(!showDropdown);
  };

  const middleLinks = links.length > 2 ? links.slice(1, -1) : [];

  return (
    <>
      <ul className="bread">
        <li>
          <a href="#">{links[0]}</a>
        </li>
        {links.length > 2 && (
          <li>
            <button
              className="bread-button"
              onClick={handleClickEllipsis}
              aria-label="Expand middle breadcrumbs"
              aria-expanded={showDropdown}
            >
              •••
            </button>
            {links.length > 2 && showDropdown ? (
              <ul className="bread-drop">
                {middleLinks.map((link, index) => (
                  <li key={index}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        )}
        {links.length > 1 && (
          <li>
            <a href="#">{links[links.length - 1]}</a>
          </li>
        )}
      </ul>
    </>
  );
}

export default Breadcrumbs;
