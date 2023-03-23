import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Loader from "./loader.component";

describe("Render Loader", () => {
  test("<Loader/>", () => {
    const loader = render(<Loader variant="indeterminate" />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
  test("<Loader/>Snapshot", () => {
    const loader = renderer
      .create(
        <BrowserRouter>
          <Loader variant="indeterminate" />
        </BrowserRouter>
      )
      .toJSON();
    expect(loader).toMatchSnapshot();
  });
});
