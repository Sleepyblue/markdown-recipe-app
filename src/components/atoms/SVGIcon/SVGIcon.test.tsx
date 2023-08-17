import { render, screen } from "@testing-library/react";

import SVGIcon from ".";

describe("SVGIcon", () => {
  it("Renders SVG", async () => {
    render(<SVGIcon iconName="Cogwheel" size={36} />);

    expect(
      await screen.findByText(
        (_, element) => element?.tagName.toLowerCase() === "svg",
        {},
        { timeout: 3000 }
      )
    );

    // TODO: Dynamic import not being properly rendered
    // screen.debug();
  });
});
