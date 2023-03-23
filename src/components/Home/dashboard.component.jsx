import { Filter, FilterList, Settings } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getListOfChampions } from "../../utils/api";
import HerosList from "../Heros List/herosList.component";
import Navbar from "../Navbar/navbar.component";
import BasicPopover from "../popover/popover.component";
import "./dashboard.styles.scss";
/**
 * Container component for application components
 */
const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  /**
   * Opens popover at  target element
   * @param {*} event - target element
   */
  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };
  /**
   * Close popover at target element
   */
  const closePopover = () => {
    setAnchorEl(null);
  };
  const [herosList, setHerosList] = useState([]);
  const [orderBy, setOrderBy] = useState("hp");
  const listOfChampions = useLoaderData();
  const [heroCount, setHeroCount] = useState(listOfChampions?.length);
  const [options, setOptions] = useState([]);
  const [filteredHeros, setFilteredHeros] = useState([]);
  /**
   * Creates a grouped list  champions based on alphabetical order
   */
  const groupHeros = () => {
    const options = herosList?.map((champion) => {
      const firstLetter = champion?.name[0].toUpperCase();
      const selectedAttribute = {
        name: champion?.name,
        power: champion[orderBy],
        image: champion?.image_url,
      };
      return {
        firstLetter,
        ...selectedAttribute,
      };
    });
    setOptions(options);
  };
  const filterHerosBasedOnSearch = (event, value) => {
    const filteredHeros = herosList.filter((hero) => hero?.name === value);
    setFilteredHeros(filteredHeros);
  };
  /**
   * Decides how many players to show
   * @param {*} event - number selected by user
   */
  const handleCountChange = async (event) => {
    if (event) {
      let heroList;
      setHeroCount(event?.target?.value);
      await getListOfChampions(event?.target?.value).then(
        async (data) => await (heroList = data)
      );
      setHerosList(heroList);
    }
  };
  /**
   * Sort players/ champions based on order selected by user i.e Hp,Armor,AttackDamage
   */
  useEffect(() => {
    const temp = herosList;
    temp.sort((a, b) => {
      if (a[orderBy] == b[orderBy]) {
        return 0;
      }
      return a[orderBy] < b[orderBy] ? -1 : 1;
    });
    setHerosList([...temp]);
  }, [orderBy]);
  /**
   * Creates and display new list of champions based on user selected count and order
   */
  useState(() => {
    setHerosList(listOfChampions);
  }, []);
  return (
    <Box>
      <Navbar />
      <Box display="flex" justifyContent="flex-end" sx={{paddingRight:"4rem"}}>
        <Autocomplete
          className="grouped_heros"
          options={options?.sort(
            (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
          )}
          groupBy={(option) => option?.firstLetter}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Search Heros" />
          )}
          onOpen={groupHeros}
          onInputChange={(event, value) =>
            filterHerosBasedOnSearch(event, value)
          }
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="30"
                src={option?.image}
                srcSet={option?.image}
                alt="hero"
              />
              {option.name} {option.power}
            </Box>
          )}
          isOptionEqualToValue={(option, value) => {
            return option?.name === value?.name ? true : false;
          }}
        />
        <IconButton
          className="settings_icon"
          onClick={(event) => openPopover(event)}
        >
          <FilterList />
        </IconButton>
      </Box>
      <BasicPopover
        anchorEl={anchorEl}
        openPopover={openPopover}
        closePopover={closePopover}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            padding: "1rem",
            background: "black",
            gap:"1rem"
          }}
        >
          <FormControl sx={{ paddingRight: "1rem" }}>
            <InputLabel id="heros_count">Count</InputLabel>
            <Select
              className="heros_dropdown"
              labelId="heros_count"
              label="Count"
              value={heroCount}
              onChange={(event) => handleCountChange(event)}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="heros_ordering">Order</InputLabel>
            <Select
              className="heros_dropdown"
              labelId="heros_ordering"
              label="Order By"
              value={orderBy}
              onChange={(event) => setOrderBy(event.target.value)}
            >
              <MenuItem value="hp">HP</MenuItem>
              <MenuItem value="armor">Armor</MenuItem>
              <MenuItem value="attackdamage">Attack damage</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </BasicPopover>
      <HerosList
        herosList={filteredHeros?.length > 0 ? filteredHeros : herosList}
        setHerosList={setHerosList}
        orderBy={orderBy}
      />
    </Box>
  );
};

export default Dashboard;
