import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import TableHeader from "./TableHeader.component";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
describe("should display table header", () => {
  test("should display table headers", async() => {
    // const tableHeader = render(<TableHeader headerCells={headerCells} />);
    // expect(tableHeader.getAllByTestId("ArrowDownwardIcon")).toBeTruthy();
    const tree = render(<TableHeader headerCells={getColumnHeaders()} valueToOrderBy={getColumnHeaders()[0]?.label} orderDirection={"asc"} handleRequestSort={handleRequestSort} />);
    expect(screen.getByText("ID")).toBeInTheDocument();
  });
  test("snapshot", () => {
    const tableHeader = renderer.create(
      <TableHeader headerCells={getColumnHeaders()} valueToOrderBy={"ID"} orderDirection={"asc"} handleRequestSort={handleRequestSort} />
    ).toJSON();
    expect(tableHeader).toMatchSnapshot();
  })
});

const headerCells = [
  "id",
  "image_url",
  "name",
  "hp",
  "armor",
  "attackdamage",
  "attackrange",
  "hpregen",
  "spellblock",
];

const getColumnHeaders = ()=>{
  const columnHeaders =[];
  headerCells.forEach((data) => {
   columnHeaders.push(
     {
       key: data,
       label: data.toUpperCase(),
       disableSorting: data === "image_url" ? true : false,
     }
   )
 });
 return columnHeaders;
}

const  handleRequestSort = (event,property)=>{
  return null;
}