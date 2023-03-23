import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Router, Routes } from "react-router-dom";
import renderer from "react-test-renderer";
import App from "../../App";
import Layout from "../Layout/layout.component";
import NotFound from "./notfound.component";

// describe("snapshot",()=>{
    // test("render App with navigation",()=>{
    //     const notFound = render(
    //  <Router navigator={["/badroute"]} location={["/badroute"]} >
    //   <NotFound/>
    //   </Router>
     
    //     )
    //     console.log(notFound)
    //     screen.debug();
    //   //  expect(notFound).toMatchSnapshot();
    // })
  //   test("render App with navigation",()=>{
  //     const notFound = renderer.create(<BrowserRouter>
  //    <NotFound/>
  //     </BrowserRouter>).toJSON();
  //     expect(notFound).toMatchSnapshot();
  // })
// })

// describe("Not Found", () => {
//   test("show error on mismatched routes", async() => {
//     const notFound = render(<App/>);
//     console.log(notFound);
//     console.log(screen.debug())
//   });
// });
