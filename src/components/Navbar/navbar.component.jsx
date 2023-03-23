import {
  AppBar,
  Badge,
  IconButton,
  List,
  ListItem,
  Menu,
  Toolbar,
  Tooltip,
  Zoom,
} from "@mui/material";
import React, { Fragment, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HerosContext } from "../../context/heroscontext";
import "./navbar.styles.scss";
const Navbar = () => {
    /** to navigate between routes  */
  const navigate = useNavigate();
    /** fetch router location object keys {pathname, search}  */
  const location = useLocation();
  const {favoriteHero} = useContext(HerosContext);
  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          <List className="list_container">
            <ListItem className="list_item_1">
            <Tooltip TransitionComponent={Zoom} title="Home" placeholder="bottom">
              <IconButton className="home" onClick={()=> { location?.pathname !=="/" && navigate("/")}}>
                <img
                  className="logo"
                  alt="logo"
                  src={require("../../assets/swords.png")}
                ></img>
              </IconButton>
              </Tooltip>
              <h3>Game Store</h3>
            </ListItem>
            <ListItem className="list_item_2">
              <Tooltip TransitionComponent={Zoom} title="Watchlist" placeholder="bottom">
              <IconButton className="watchlist" onClick={()=> { location?.pathname !=="/favorite" && navigate("/favorite")}} >
                <Badge className="badge" badgeContent={favoriteHero?.length} color="primary">

                <img
                  alt="watch list"
                  className="logo"
                  src={require("../../assets/bookmark.png")}
                  ></img>
                  </Badge>
              </IconButton>
              </Tooltip>
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Navbar;
