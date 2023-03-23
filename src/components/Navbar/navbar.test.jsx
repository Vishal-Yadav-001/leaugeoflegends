import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HerosProvider } from "../../context/heroscontext";
import HerosList from "../Heros List/herosList.component";
import WatchList from "../Watchlist/watchlist.component";
import Navbar from "./navbar.component";
import renderer from "react-test-renderer";
describe("<Navbar/>", () => {
  test("snapshot", () => {
    const navbar = renderer
      .create(
        <BrowserRouter>
          <HerosProvider>
            <Navbar />
          </HerosProvider>
        </BrowserRouter>
      )
      .toJSON();
    expect(navbar).toMatchSnapshot();
  });
  test("should render the navigation bar and display app name", () => {
    const navbar = renderNavbar();
    const title = navbar.getAllByText("Game Store");
    const titleText = within(title[0]).getByText("Game Store");
    expect(titleText).toHaveTextContent("Game Store");
  });
  test("should render the navigation bar and test home button", () => {
    const navbar = renderNavbar();
    const homeIcon = screen.queryAllByRole("button")[0];
    act(() => {
      fireEvent.click(homeIcon);
      const layout = render(
        <HerosProvider>
          <HerosList />
        </HerosProvider>,
        { wrapper: BrowserRouter }
      );
      expect(layout).toBeTruthy();
    });
  });
  test("should render the navigation bar and test watchlist button", () => {
    const navbar = renderNavbar();
    const watchlistIcon = screen.queryAllByRole("button")[1];
    act(() => {
      fireEvent.click(watchlistIcon);
      const watchlist = render(
        <HerosProvider>
          <WatchList />
        </HerosProvider>,
        { wrapper: BrowserRouter }
      );
      expect(watchlist).toBeTruthy();
    });
  });
});

const renderNavbar = () => {
  return (
    render(
      <BrowserRouter>
        <HerosProvider>
          <Navbar />
        </HerosProvider>
      </BrowserRouter>
    )
  )
}