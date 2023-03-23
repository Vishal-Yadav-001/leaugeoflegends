import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import { useContext } from "react";
import { HerosContext, HerosProvider } from "../../context/heroscontext";
import renderer from "react-test-renderer";
import TableContent from "./TableContent.component";
describe("Table Content", () => {
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

  test("display table content", () => {
    const tree = render(
      <HerosProvider>
        <TableContent headerCells={headerCells} records={favoriteHero} />
      </HerosProvider>
    );
    screen.debug();
    const heroNameElement = screen.getAllByText("Zilean");
    const heroNameText = within(heroNameElement[0]).getAllByText("Zilean");
    expect(heroNameText[0].innerHTML).toBe("Zilean");
  });
  test("remove  record on remove button click", () => {
    const tree = render(
      <HerosContext.Provider
        value={{
          handleRemoveRecord,
          addHero,
        }}
      >
        <TableContent headerCells={headerCells} records={favoriteHero} />
      </HerosContext.Provider>
    );
    const heroNameElement = screen.queryAllByTestId("removeButton");
    act(() => {
      fireEvent.click(heroNameElement[0]);
      waitFor(() => {
        expect(screen.queryAllByTestId("removeButton")).toBe(null);
      });
    });
  });
  test("snapshot", () => {
    const tableContent = renderer
      .create(
        <HerosProvider>
          <TableContent headerCells={headerCells} records={favoriteHero} />
        </HerosProvider>
      )
      .toJSON();
    expect(tableContent).toMatchSnapshot();
  });
});

const favoriteHero = [
  {
    armor: 24,
    armorperlevel: 5,
    attackdamage: 52,
    attackdamageperlevel: 3,
    attackrange: 550,
    attackspeedoffset: null,
    attackspeedperlevel: 2.13,
    big_image_url:
      "https://cdn.pandascore.co/images/lol/champion/big_image/8842e560-c719-4423-86a1-a47b042ce627.jpg",
    crit: 0,
    critperlevel: 0,
    hp: 574,
    hpperlevel: 96,
    hpregen: 5.5,
    hpregenperlevel: 0.5,
    id: 3238,
    image_url:
      "https://cdn.pandascore.co/images/lol/champion/image/0449c26e-f41d-4289-a2bc-32ddb8b3b911.png",
    movespeed: 335,
    mp: 452,
    mpperlevel: 50,
    mpregen: 11.35,
    mpregenperlevel: 0.8,
    name: "Zilean",
    spellblock: 30,
    spellblockperlevel: 1.3,
    videogame_versions: ["12.21.1"],
    description:
      "Zilean was once a powerful Icathian mage who has since become obsessed with time. After the destruction of his homeland he studied the passage of time, using magic to become immortal. Now he drifts through the past, present and future, trying to find a moment where he can turn back the destruction of Icathia.",
    image: {
      banner:
        "https://lolstorage02.blob.core.windows.net/lolstatic/dragontail-12.21.1/img/champion/splash/Zilean_0.jpg",
      tile: "https://lolstorage02.blob.core.windows.net/lolstatic/dragontail-12.21.1/img/champion/tiles/Zilean_0.jpg",
    },
  },
  {
    armor: 24,
    armorperlevel: 5,
    attackdamage: 52,
    attackdamageperlevel: 3,
    attackrange: 550,
    attackspeedoffset: null,
    attackspeedperlevel: 2.13,
    big_image_url:
      "https://cdn.pandascore.co/images/lol/champion/big_image/8842e560-c719-4423-86a1-a47b042ce627.jpg",
    crit: 0,
    critperlevel: 0,
    hp: 574,
    hpperlevel: 96,
    hpregen: 5.5,
    hpregenperlevel: 0.5,
    id: 3239,
    image_url:
      "https://cdn.pandascore.co/images/lol/champion/image/0449c26e-f41d-4289-a2bc-32ddb8b3b911.png",
    movespeed: 335,
    mp: 452,
    mpperlevel: 50,
    mpregen: 11.35,
    mpregenperlevel: 0.8,
    name: "Zil",
    spellblock: 30,
    spellblockperlevel: 1.3,
    videogame_versions: ["12.21.1"],
    description:
      "Zil was once a powerful Icathian mage who has since become obsessed with time. After the destruction of his homeland he studied the passage of time, using magic to become immortal. Now he drifts through the past, present and future, trying to find a moment where he can turn back the destruction of Icathia.",
    image: {
      banner:
        "https://lolstorage02.blob.core.windows.net/lolstatic/dragontail-12.21.1/img/champion/splash/Zilean_0.jpg",
      tile: "https://lolstorage02.blob.core.windows.net/lolstatic/dragontail-12.21.1/img/champion/tiles/Zilean_0.jpg",
    },
  },
];
const addHero = (val) => {
  return null;
};
const handleRemoveRecord = (val) => {
  return null;
};
