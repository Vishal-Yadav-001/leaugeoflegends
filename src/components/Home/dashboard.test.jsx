import Dashboard  from './dashboard.component';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, MemoryRouter, Route, Router, RouterProvider } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Layout from '../Layout/layout.component';
import NotFound from '../404/notfound.component';
import WatchList from '../Watchlist/watchlist.component';

// test('renders correctly when there are no items', () => {
//     const tree = renderer.create(
//     <MemoryRouter initialEntries={["/"]} >
//     <Dashboard />
//     </MemoryRouter>
//     ).toJSON();
//     expect(tree).toMatchSnapshot();
//   });

  // test("Dashboard",()=>{
  //   const router = createBrowserRouter(
  //     createRoutesFromElements(
  //       <Route path="/" element={<Layout />} errorElement={<NotFound />}>
  //         <Route
  //           index
  //           element={
  //             <Dashboard
  //             />
  //           }
  //           loader={getListOfChampions}
  //         ></Route>
  //         <Route path="favorite" element={<WatchList />}></Route>
  //       </Route>
  //     )
  //   );
  //   <RouterProvider router={router} />
  //   const dashboard = render(
  //     <MemoryRouter initialEntries={["/"]}>

  //     </MemoryRouter>    ); // BrowserRoutwer need to see.
  //   screen.debug();
  // })

  // describe("Dashboard",()=>{
  //   test("Click on settings Icon to change page settings",async()=>{
  //     render(<BrowserRouter loader={loader}>
  //     <Dashboard />
  //     </BrowserRouter>)
  //   });
  //   screen.debug();
  // })

//  const getListOfChampions = ()=>{
//     return null;
//   }

//   const loader = ()=>{
//     getListOfChampions();
//   }