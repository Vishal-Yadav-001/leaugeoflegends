import {
  RemoveRedEye,
} from "@mui/icons-material";
import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useContext, useState } from "react";
import { HerosContext } from "../../context/heroscontext";
import HeroDetails from "../HeroDetails/heroDetails.component";
import "./herosList.styles.scss";
/**
 * Displays a list of Heros to user.
 * @param {Array.<Object>} heroList - list of hero records.
 *
 */
const HerosList = ({ herosList,orderBy }) => {
  const [selectedHero, setSelectedHero] = useState("");
  const [open, setOpen] = useState(false);
  const {addHero,checkIsHeroPresent, handleRemoveRecord,} = useContext(HerosContext);
  return (
    <Fragment>
      <Container className="herosList">
        <Box
          sx={{
            display: { lg: "flex", md: "flex", sm: "flex", xs: "flex" },
            flexWrap: "wrap",
          }}
        >
          {herosList?.map((data) => {
            return (
              <Card key={data?.id} className="hero_list">
                <CardActions  className="card_actions">
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={`Armor ${data?.armor}`}
                    placement="bottom"
                  >
                    <IconButton>
                      <img
                        alt="armor"
                        className="logo armor"
                        src={require("../../assets/armor.png")}
                      ></img>
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={`Damage ${data?.attackdamage}`}
                    placement="bottom"
                  >
                    <IconButton>
                      <img
                        alt="damage"
                        className="logo damage"
                        src={require("../../assets/bandage.png")}
                      ></img>
                    </IconButton>
                  </Tooltip>
                </CardActions>
                <CardContent className="hero_image">
                  <img
                    className="hero_image"
                    alt={data?.name}
                    src={data?.image_url}
                  ></img>
                </CardContent>
                <CardContent className="hero_name">
                  <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                    {data?.name}
                  </Typography>
                  <span style={{fontSize:".8rem"}}> {`${orderBy?.toLowerCase()} ${data[orderBy]}`}</span>
                </CardContent>
                <CardActions className="card_actions">
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="view player details"
                    placement="right-start"
                  >
                    <IconButton
                      onClick={() => {
                        setSelectedHero(data?.name);
                        setOpen(true);
                      }}
                      data-testid="view player details"
                      className="eye_icon"
                    >
                      <RemoveRedEye
                        className="icon"
                        sx={{ color: "#F84982" }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Typography   variant="span">
                    {checkIsHeroPresent(data?.id) ? 
                     <Button data-testid="remove" onClick={() => handleRemoveRecord(data?.id)} className="remove_from_watch" variant="outlined">
                     unwatch
                   </Button>
                    : 
                    <Button data-testid="add" onClick={() => addHero(data)} className="add_to_watch" variant="outlined">
                    watch
                  </Button>
                    }
                   
                  </Typography>
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={`Hp ${data?.hp}`}
                    placement="top"
                  >
                    <IconButton>
                      <img
                        alt="health"
                        className="logo health"
                        src={require("../../assets/heart.png")}
                      ></img>
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            );
          })}
        </Box>
      </Container>
      <HeroDetails selectedHero={selectedHero} open={open} setOpen={setOpen} />
      <Box className="footer">
        <span>Made in 2022 by Vishal Yadav</span>
      </Box>
    </Fragment>
  );
};

export default HerosList;
