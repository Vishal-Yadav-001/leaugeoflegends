import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout.component";
import renderer from "react-test-renderer";
import { HerosProvider } from "../../context/heroscontext";



describe("Render Basic Layout of application", ()=>{
    test("<Layout/>",()=>{
        const layout = render( <HerosProvider>

          <Layout  />
        </HerosProvider>,{wrapper:BrowserRouter});
        expect(screen.getAllByTestId('layout')[0]).toBeInTheDocument();
    });

    test("<Layout/>Snapshot", () => {
        const layout = renderer
          .create(
            <BrowserRouter>
            <HerosProvider>

              <Layout  />
            </HerosProvider>
            </BrowserRouter>
          )
          .toJSON();
        expect(layout).toMatchSnapshot();
      });
})