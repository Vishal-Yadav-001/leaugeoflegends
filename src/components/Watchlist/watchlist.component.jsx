import { Box } from "@mui/material";
import React, { useContext } from "react";
import { HerosContext } from "../../context/heroscontext";
import TableContent from "../Data Table/TableContent.component";
/**
 * Display heroDetails from users watchlist
 * 
 */
const WatchList = () => {
  const {favoriteHero} = useContext(HerosContext);
  const headerConstant = [
    "id",
    "image",
    "name",
    "hp",
    "armor",
    "attackdamage",
    "attackrange",
    "hpregen",
    "spellblock",
    "actions"
  ];
  const columnHeaders = headerConstant.map((data) => {
    return {
      key: data,
      label: data.toUpperCase(),
      disableSorting: data === "image" ? true : false,
    };
  });
  return <>
   <TableContent headerCells={columnHeaders} records={favoriteHero} />
   <Box
        className="footer"
        sx={{
          color: "#E8E9EB",
          background: "#313628",
          width: "100%",
          minHeight: "3rem",
          textAlign: "center",
          paddingTop: "1rem",
        }}
      >
        <span>Made in 2022 by Vishal Yadav</span>
      </Box>
  </>;
};

export default WatchList;
