import React from "react";
import { render, screen } from "@testing-library/react";

import FavoriteProperty from "./FavoriteProperty";

describe("FavoriteProperty Component", () => {
  it("should render the FavoriteProperty component", () => {
    render(<FavoriteProperty isFavorite={false} onClick={() => {}} />);

    const iconButton = screen.getByTestId("iconButton");
    const favoriteIcon = screen.getByTestId("favicon");
    expect(iconButton).toBeInTheDocument();
    expect(favoriteIcon).toBeInTheDocument();
  });

  it("should change the fill color when clicked", () => {
    let isFavorite = false;
    const onClick = () => {
      isFavorite = !isFavorite;
    };
    render(<FavoriteProperty isFavorite={isFavorite} onClick={onClick} />);
    const favIcon = screen.getByTestId("favicon");
    expect(favIcon).toHaveStyle({ fill: "white" });
  });
});
