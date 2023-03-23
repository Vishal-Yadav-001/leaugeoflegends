import {
  BookmarkAddOutlined,
  BookmarkRemove,
  BookmarkRemoveOutlined,
  Close,
  EmojiPeople,
  Fastfood,
  LocationCity,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Fade,
  Grid,
  IconButton,
  Modal,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { HerosContext } from "../../context/heroscontext";
import { getChampion } from "../../utils/api";
import Loader from "../Loader/loader.component";
import "./heroDetails.styles.scss";
/**
 * Displays details on individual hero selected by the user
 * @param {string} selectedHero - name of the selected hero
 * @param {boolean} open - to open modal
 *
 */
const HeroDetails = ({ selectedHero, open, setOpen }) => {
  const [heroDetails, setHeroDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setOpen(false);
  const {
    addHero,
    setIsHeroPresent,
    isHeroPresent,
    checkIsHeroPresent,
    handleRemoveRecord,
  } = useContext(HerosContext);

  /**
   * Method for conversion of custom values (numbers) to scale of 0 to 100 for progress bar/circle.
   * @param {number} value - number
   * @returns {number}
   */
  const normalize = (value) => {
    let max = 0;
    let min = 0;
    switch (true) {
      case value < 10:
        max = 10;

        break;
      case value > 10 && value < 101:
        max = 100;
        break;
      case value > 100:
        max = 1000;
        break;
      default:
        break;
    }
    return ((value - min) * 100) / (max - min);
  };
  useEffect(() => {
    if (selectedHero) {
      setLoading(true);
      setHeroDetails(null);
      getChampion(selectedHero).then((data) => {
        setLoading(false);
        setHeroDetails(data);
      });
    }
  }, [selectedHero]);

  // const constructDetails = (object,propertyName)=>{
  //   for(const key in object){
  //     if(key === propertyName){
  //       return key.toUpperCase()
  //     }
  //   }
  // }

  return (
    <Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
        }}
      >
        <Fade in={open}>
          <Box className="box">
            {loading ? (
              <Box>
                <Typography
                  variant="h5"
                  textAlign="center"
                  sx={{ color: "#fff" }}
                >
                  Loading...{" "}
                </Typography>
                <Skeleton data-testid="heading" className="heading"></Skeleton>
              </Box>
            ) : (
              heroDetails?.map((data) => {
                return (
                  <div key={data?.id} style={{ width: "60vh" }}>
                    <div>
                      <Card
                        className="hero_container"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          maxWidth: "700px",
                        }}
                      >
                        <CardHeader
                          variant="h4"
                          title={
                            <Fragment>
                              <Box sx={{ display: "flex", color: "#FFB100" }}>
                                <Typography variant="h4">
                                  {" "}
                                  {data?.name}
                                </Typography>
                                {checkIsHeroPresent(data?.id) ? (
                                  <Tooltip
                                    TransitionComponent={Zoom}
                                    title="Remove from watchlist"
                                    placement="top"
                                  >
                                    <IconButton
                                      className="icon"
                                      onClick={() =>
                                        handleRemoveRecord(data?.id)
                                      }
                                      data-testid="remove hero"
                                    >
                                      <BookmarkRemove  />
                                    </IconButton>
                                  </Tooltip>
                                ) : (
                                  <Tooltip
                                    TransitionComponent={Zoom}
                                    title="Add to watchlist"
                                    placement="right-start"
                                  >
                                    <IconButton
                                      className="icon"
                                      onClick={() => addHero(data)}
                                      data-testid="add hero"
                                    >
                                      <BookmarkAddOutlined />
                                    </IconButton>
                                  </Tooltip>
                                )}
                                <Box >
                                  {data?.class?.map((heroClass) => {
                                    return (
                                      <Tooltip
                                        TransitionComponent={Zoom}
                                        title={heroClass?.description}
                                        placement="top"
                                      >
                                        <img
                                          style={{ width: "35px",borderRadius:"50%"  }}
                                          alt={heroClass?.description}
                                          src={heroClass?.image}
                                        />
                                      </Tooltip>
                                    );
                                  })}
                                </Box>
                                <Tooltip
                                  TransitionComponent={Zoom}
                                  title="Close"
                                  placement="top"
                                >
                                    <Close sx={{color:"##FFB100",position:"absolute",right:"1rem",top:".5rem"}} onClick={handleClose}/>
                                </Tooltip>
                              </Box>
                              <Divider />
                            </Fragment>
                          }
                        />
                        <Box sx={{ display: "flex" }}>
                          <CardContent>
                            <img
                              className="hero_full_image"
                              alt={data?.name}
                              src={data?.big_image_url}
                              style={{ height: "100%" }}
                            ></img>
                          </CardContent>

                          <CardContent className="description">
                            <Typography variant="span">
                              {data?.description || "No info available"}
                            </Typography>

                            <Divider
                              sx={{
                                paddingTop: ".5rem",
                                paddingBottom: ".5rem",
                              }}
                            />
                            <Box minWidth="10.5rem">
                              <Typography fontWeight="500" align="center">
                                Stats
                              </Typography>

                              <Box className="specs_container">
                                <Box className="specs">
                                  <Typography>HP</Typography>
                                  <Typography>{data?.hp}</Typography>
                                </Box>

                                <Loader
                                  variant="determinate"
                                  value={normalize(data?.hp)}
                                ></Loader>
                              </Box>
                              <Box className="specs_container">
                                <Box className="specs">
                                  <Typography>ARMOR</Typography>
                                  <Typography>{data?.armor}</Typography>
                                </Box>
                                <Loader
                                  variant="determinate"
                                  value={normalize(data?.armor)}
                                ></Loader>
                              </Box>
                              <Box className="specs_container">
                                <Box className="specs">
                                  <Typography>ATTACK DAMAGE</Typography>
                                  <Typography>{data?.attackdamage}</Typography>
                                </Box>
                                <Loader
                                  variant="determinate"
                                  value={normalize(data?.attackdamage)}
                                ></Loader>
                              </Box>
                              <Box className="specs_container">
                                <Box className="specs">
                                  <Typography>ATTACK RANGE</Typography>
                                  <Typography>{data?.attackrange}</Typography>
                                </Box>

                                <Loader
                                  variant="determinate"
                                  value={normalize(data?.attackrange)}
                                ></Loader>
                              </Box>
                              <Box className="specs_container">
                                <Box className="specs">
                                  <Typography>MOVE SPEED</Typography>
                                  <Typography>{data?.movespeed}</Typography>
                                </Box>
                                <Loader
                                  variant="determinate"
                                  value={normalize(data?.movespeed)}
                                ></Loader>
                              </Box>
                            </Box>
                          </CardContent>
                        </Box>
                      </Card>
                    </div>
                  </div>
                );
              })
            )}
          </Box>
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default HeroDetails;
