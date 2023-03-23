import { render, screen } from "@testing-library/react";
import { HerosProvider } from "../../context/heroscontext";
import WatchList from "./watchlist.component";
import  renderer from "react-test-renderer";
describe("Watchlist", () => {
  test("Should show favorite hero in table", () => {
    const watchList = render(
      <HerosProvider>
        <WatchList />
      </HerosProvider>
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  test("snapshot",()=>{
    const watchList = renderer.create( <HerosProvider>
      <WatchList />
    </HerosProvider>).toJSON();

    expect(watchList).toMatchSnapshot();
  })
});
